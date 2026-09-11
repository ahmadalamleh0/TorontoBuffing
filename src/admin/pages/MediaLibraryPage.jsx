import { useEffect, useState } from "react";
import { deleteMediaAsset, listMediaAssets, updateMediaAssetAltText, uploadMediaAsset } from "../services/media";

function MediaLibraryPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setAssets(await listMediaAssets());
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(event) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    setUploading(true);
    setStatus(null);
    try {
      for (const file of files) {
        await uploadMediaAsset(file);
      }
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(asset) {
    if (!confirm("Delete this image? If it's still used on a page, that image will stop loading there.")) return;
    try {
      await deleteMediaAsset(asset);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleAltTextBlur(asset, value) {
    if (value === (asset.alt_text ?? "")) return;
    try {
      await updateMediaAssetAltText(asset.id, value);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Media</h1>
          <p className="admin-page-subtitle">Every image uploaded anywhere in the admin ends up here for reuse.</p>
        </div>
        <label className="btn btn--primary">
          {uploading ? "Uploading…" : "+ Upload images"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} hidden />
        </label>
      </div>

      {status && <p className="field__error">{status.message}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : assets.length === 0 ? (
        <p className="empty-state">No uploads yet.</p>
      ) : (
        <div className="media-grid">
          {assets.map((asset) => (
            <div className="media-tile" key={asset.id}>
              <img src={asset.public_url} alt={asset.alt_text ?? ""} />
              <div className="media-tile__body">
                <input
                  className="input"
                  placeholder="Alt text"
                  defaultValue={asset.alt_text ?? ""}
                  onBlur={(e) => handleAltTextBlur(asset, e.target.value)}
                />
                <div className="media-tile__actions">
                  <button className="btn btn--xs btn--danger" onClick={() => handleDelete(asset)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaLibraryPage;
