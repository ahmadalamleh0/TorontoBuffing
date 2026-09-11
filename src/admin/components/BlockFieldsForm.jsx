import ImagePicker from "./ImagePicker";

function TextField({ label, value, onChange, optional }) {
  return (
    <div className="field">
      <label className="field__label">
        {label}
        {optional ? " (optional)" : ""}
      </label>
      <input className="input" type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextareaField({ label, value, onChange, optional }) {
  return (
    <div className="field">
      <label className="field__label">
        {label}
        {optional ? " (optional)" : ""}
      </label>
      <textarea className="input" rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      <p className="field__hint">
        Supports <code>**bold**</code> and <code>[link text](/services/ppf)</code> for an internal link, or a full{" "}
        <code>https://</code> URL for an external one.
      </p>
    </div>
  );
}

function TextLinesField({ label, value, onChange }) {
  const text = Array.isArray(value) ? value.join("\n") : (value ?? "");
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <textarea className="input" rows={2} value={text} onChange={(e) => onChange(e.target.value.split("\n"))} />
    </div>
  );
}

function StringListField({ label, value, onChange, optional }) {
  const items = value ?? [];

  function updateItem(i, v) {
    const next = [...items];
    next[i] = v;
    onChange(next);
  }
  function addItem() {
    onChange([...items, ""]);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="field">
      <label className="field__label">
        {label}
        {optional ? " (optional)" : ""}
      </label>
      {items.map((item, i) => (
        <div className="list-row" key={i}>
          <input className="input" type="text" value={item} onChange={(e) => updateItem(i, e.target.value)} />
          <button type="button" className="btn btn--sm btn--ghost" onClick={() => removeItem(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn btn--sm" onClick={addItem}>
        + Add item
      </button>
    </div>
  );
}

function ImageGroupField({ label, value, onChange }) {
  const v = value ?? { src: "", alt: "" };
  return (
    <div className="field-group">
      <span className="field__label">{label}</span>
      <ImagePicker label="Image" value={v.src} onChange={(src) => onChange({ ...v, src })} />
      <TextField label="Alt text" value={v.alt} onChange={(alt) => onChange({ ...v, alt })} />
    </div>
  );
}

function ItemListField({ field, value, onChange }) {
  const items = value ?? [];
  const itemLabel = field.itemLabel ?? "Item";

  function updateItem(i, key, v) {
    const next = [...items];
    next[i] = { ...next[i], [key]: v };
    onChange(next);
  }
  function addItem() {
    const empty = {};
    field.itemFields.forEach((f) => {
      empty[f.key] = f.kind === "stringList" ? [] : "";
    });
    onChange([...items, empty]);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="field">
      <label className="field__label">{field.label}</label>
      <div className="item-list">
        {items.map((item, i) => (
          <div className="item-list__item" key={i}>
            <div className="item-list__item-header">
              <span>
                {itemLabel} {i + 1}
              </span>
              <div className="item-list__item-actions">
                <button type="button" className="btn btn--xs" onClick={() => move(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button
                  type="button"
                  className="btn btn--xs"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                >
                  ↓
                </button>
                <button type="button" className="btn btn--xs btn--danger" onClick={() => removeItem(i)}>
                  Remove
                </button>
              </div>
            </div>
            {field.itemFields.map((subField) =>
              renderField(subField, item[subField.key], (v) => updateItem(i, subField.key, v)),
            )}
          </div>
        ))}
      </div>
      <button type="button" className="btn btn--sm" onClick={addItem}>
        + Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function renderField(field, value, onChange) {
  switch (field.kind) {
    case "text":
      return <TextField key={field.key} label={field.label} value={value} onChange={onChange} optional={field.optional} />;
    case "textarea":
      return (
        <TextareaField key={field.key} label={field.label} value={value} onChange={onChange} optional={field.optional} />
      );
    case "textLines":
      return <TextLinesField key={field.key} label={field.label} value={value} onChange={onChange} />;
    case "stringList":
      return (
        <StringListField key={field.key} label={field.label} value={value} onChange={onChange} optional={field.optional} />
      );
    case "image":
      return <ImagePicker key={field.key} label={field.label} value={value} onChange={onChange} />;
    case "imageGroup":
      return <ImageGroupField key={field.key} label={field.label} value={value} onChange={onChange} />;
    case "itemList":
      return <ItemListField key={field.key} field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

/** Renders every field in a block schema (see blockSchemas.js) for one section-block object, calling onChange with the whole updated block. */
function BlockFieldsForm({ schema, block, onChange }) {
  function updateField(key, value) {
    onChange({ ...block, [key]: value });
  }

  return (
    <div className="block-fields">
      {schema.fields.map((field) => renderField(field, block[field.key], (v) => updateField(field.key, v)))}
    </div>
  );
}

export default BlockFieldsForm;
