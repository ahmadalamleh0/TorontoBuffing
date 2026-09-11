import { useState } from "react";
import { BLOCK_SCHEMAS, COMPOSABLE_BLOCK_TYPES, createEmptyBlock } from "./blockSchemas";
import BlockFieldsForm from "./BlockFieldsForm";

/**
 * Editor for a brand-new SEO page's `sections` — this is the
 * "reusable dynamic page template": the client composes a page from
 * the same section-block vocabulary the built-in service pages use
 * (src/pages/ServicePage/ServiceSections.jsx), add/remove/reorder
 * included, without any new layout code ever being written.
 */
function ComposableSectionsEditor({ sections, onChange }) {
  const [addType, setAddType] = useState(COMPOSABLE_BLOCK_TYPES[0]);

  function updateSection(index, updatedBlock) {
    const next = [...sections];
    next[index] = updatedBlock;
    onChange(next);
  }
  function removeSection(index) {
    onChange(sections.filter((_, i) => i !== index));
  }
  function moveSection(index, dir) {
    const j = index + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(next);
  }
  function addSection() {
    onChange([...sections, createEmptyBlock(addType)]);
  }

  return (
    <div className="sections-editor">
      {sections.map((section, i) => {
        const schema = BLOCK_SCHEMAS[section.type];
        return (
          <div className="section-block" key={i}>
            <div className="section-block__header">
              <span className="section-block__type">{schema?.label ?? section.type}</span>
              <div className="section-block__actions">
                <button type="button" className="btn btn--xs" onClick={() => moveSection(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button
                  type="button"
                  className="btn btn--xs"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === sections.length - 1}
                >
                  ↓
                </button>
                <button type="button" className="btn btn--xs btn--danger" onClick={() => removeSection(i)}>
                  Remove block
                </button>
              </div>
            </div>
            {schema ? (
              <BlockFieldsForm schema={schema} block={section} onChange={(b) => updateSection(i, b)} />
            ) : (
              <p className="section-block__locked">Unsupported block type — preserved as-is.</p>
            )}
          </div>
        );
      })}

      {sections.length === 0 && <p className="sections-editor__empty">No content blocks yet — add one below.</p>}

      <div className="sections-editor__add">
        <select className="input" value={addType} onChange={(e) => setAddType(e.target.value)}>
          {COMPOSABLE_BLOCK_TYPES.map((type) => (
            <option key={type} value={type}>
              {BLOCK_SCHEMAS[type].label}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn--sm btn--primary" onClick={addSection}>
          + Add block
        </button>
      </div>
    </div>
  );
}

export default ComposableSectionsEditor;
