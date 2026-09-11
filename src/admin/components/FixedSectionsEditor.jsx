import { BLOCK_SCHEMAS } from "./blockSchemas";
import BlockFieldsForm from "./BlockFieldsForm";

/**
 * Editor for an EXISTING service page's `sections`. The block
 * sequence itself (which sections, how many, in what order) is the
 * page's design and is locked — only the text/images inside each
 * block can be changed, per the "don't touch structural/design-level
 * things" rule. Use ComposableSectionsEditor for brand-new SEO pages,
 * where composing the block sequence is exactly the point.
 */
function FixedSectionsEditor({ sections, onChange }) {
  function updateSection(index, updatedBlock) {
    const next = [...sections];
    next[index] = updatedBlock;
    onChange(next);
  }

  return (
    <div className="sections-editor">
      {sections.map((section, i) => {
        const schema = BLOCK_SCHEMAS[section.type];
        return (
          <div className="section-block" key={i}>
            <div className="section-block__header">
              <span className="section-block__type">{schema?.label ?? section.type}</span>
            </div>
            {schema ? (
              <BlockFieldsForm schema={schema} block={section} onChange={(b) => updateSection(i, b)} />
            ) : (
              <p className="section-block__locked">
                This section is part of the page's fixed design and isn't editable here. It will be saved exactly
                as-is.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FixedSectionsEditor;
