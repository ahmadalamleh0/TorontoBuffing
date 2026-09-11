import { useState } from "react";
import { listMediaAssets, uploadMediaAsset } from "../services/media";

/**
 * One image field: shows the current image (if any), and an
 * expandable panel to either upload a new file or reuse anything
 * already in the Media Library. Calls onChange(publicUrl) once a
 * choice is made — the field itself just stores that URL string,
 * same as every other CMS image column.
 */
function ImagePicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function openPanel() {
    setOpen(true);
    setError("");
    if (assets === null) {
      try {
        setAssets(await listMediaAssets());
      } catch (err) {
        setError(err.message || "Failed to load Media Library.");
        setAssets([]);
      }
    }
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    setError("");
    try {
      const asset = await uploadMediaAsset(file, { altText: "" });
      setAssets((current) => [asset, ...(current ?? [])]);
      onChange(asset.public_url);
      setOpen(false);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="field">
      {label && <label className="field__label">{label}</label>}

      <div className="image-picker">
        {value ? (
          <img className="image-picker__preview" src={value} alt="" />
        ) : (
          <div className="image-picker__preview image-picker__preview--empty">No image</div>
        )}

        <div className="image-picker__actions">
          <button type="button" className="btn btn--sm" onClick={openPanel}>
            {value ? "Change image" : "Choose image"}
          </button>
          {value && (
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => onChange("")}>
              Remove
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="image-picker__panel">
          <div className="image-picker__panel-row">
            <label className="btn btn--sm btn--primary">
              {busy ? "Uploading…" : "Upload new image"}
              <input type="file" accept="image/*" onChange={handleUpload} disabled={busy} hidden />
            </label>
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>

          {error && <p className="field__error">{error}</p>}

          <p className="image-picker__panel-heading">Or reuse from the Media Library</p>
          <div className="image-picker__grid">
            {(assets ?? []).map((asset) => (
              <button
                type="button"
                key={asset.id}
                className="image-picker__grid-item"
                onClick={() => {
                  onChange(asset.public_url);
                  setOpen(false);
                }}
                title={asset.alt_text || asset.storage_path}
              >
                <img src={asset.public_url} alt="" />
              </button>
            ))}
            {assets?.length === 0 && <p className="image-picker__empty">No uploads yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePicker;
