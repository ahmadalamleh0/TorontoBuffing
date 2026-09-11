import { useEffect, useState } from "react";
import { projectsService } from "../services/projects";
import { moveItem } from "../services/reorder";
import ImagePicker from "../components/ImagePicker";

const EMPTY_FORM = {
  vehicle: "",
  services_performed: [""],
  description: "",
  image_urls: [],
  published: true,
  sort_order: 0,
};

function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | id
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await projectsService.listAll());
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setForm({ ...EMPTY_FORM, sort_order: items.length });
    setEditingId("new");
  }
  function startEdit(item) {
    setForm({
      vehicle: item.vehicle,
      services_performed: item.services_performed?.length ? item.services_performed : [""],
      description: item.description ?? "",
      image_urls: item.image_urls ?? [],
      published: item.published,
      sort_order: item.sort_order,
    });
    setEditingId(item.id);
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const values = {
      ...form,
      services_performed: form.services_performed.map((s) => s.trim()).filter(Boolean),
      image_urls: form.image_urls.filter(Boolean),
    };
    try {
      if (editingId === "new") {
        await projectsService.insert(values);
      } else {
        await projectsService.update(editingId, values);
      }
      cancelEdit();
      await load();
      setStatus({ type: "success", message: "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${item.vehicle}"? This can't be undone.`)) return;
    try {
      await projectsService.remove(item.id);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleMove(index, direction) {
    setItems(await moveItem(items, index, direction, projectsService));
  }

  function updateImage(index, url) {
    setForm((f) => {
      const images = [...f.image_urls];
      images[index] = url;
      return { ...f, image_urls: images };
    });
  }
  function addImage() {
    setForm((f) => ({ ...f, image_urls: [...f.image_urls, ""] }));
  }
  function removeImage(index) {
    setForm((f) => ({ ...f, image_urls: f.image_urls.filter((_, i) => i !== index) }));
  }
  function moveImage(index, dir) {
    setForm((f) => {
      const j = index + dir;
      if (j < 0 || j >= f.image_urls.length) return f;
      const images = [...f.image_urls];
      [images[index], images[j]] = [images[j], images[index]];
      return { ...f, image_urls: images };
    });
  }
  function updateServiceTag(index, value) {
    setForm((f) => {
      const tags = [...f.services_performed];
      tags[index] = value;
      return { ...f, services_performed: tags };
    });
  }
  function addServiceTag() {
    setForm((f) => ({ ...f, services_performed: [...f.services_performed, ""] }));
  }
  function removeServiceTag(index) {
    setForm((f) => ({ ...f, services_performed: f.services_performed.filter((_, i) => i !== index) }));
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Featured vehicles shown in the "Recent Projects" carousel.</p>
        </div>
        {editingId === null && (
          <button className="btn btn--primary" onClick={startCreate}>
            + Add project
          </button>
        )}
      </div>

      {status && <p className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</p>}

      {editingId !== null && (
        <form className="admin-card" onSubmit={handleSubmit}>
          <h2>{editingId === "new" ? "New Project" : "Edit Project"}</h2>
          <div className="field">
            <label className="field__label">Vehicle name</label>
            <input
              className="input"
              required
              value={form.vehicle}
              onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="field__label">Services performed</label>
            {form.services_performed.map((tag, i) => (
              <div className="list-row" key={i}>
                <input
                  className="input"
                  value={tag}
                  onChange={(e) => updateServiceTag(i, e.target.value)}
                  placeholder="e.g. Paint Correction"
                />
                <button type="button" className="btn btn--sm btn--ghost" onClick={() => removeServiceTag(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn--sm" onClick={addServiceTag}>
              + Add service
            </button>
          </div>
          <div className="field">
            <label className="field__label">Description</label>
            <textarea
              className="input"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="field">
            <label className="field__label">Image gallery (first image is the cover)</label>
            {form.image_urls.map((url, i) => (
              <div className="field-group" key={i}>
                <ImagePicker value={url} onChange={(v) => updateImage(i, v)} />
                <div className="admin-table__actions" style={{ justifyContent: "flex-start", marginTop: 8 }}>
                  <button type="button" className="btn btn--xs" onClick={() => moveImage(i, -1)} disabled={i === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn--xs"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === form.image_urls.length - 1}
                  >
                    ↓
                  </button>
                  <button type="button" className="btn btn--xs btn--danger" onClick={() => removeImage(i)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn--sm" onClick={addImage}>
              + Add image
            </button>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published (visible on the site)
          </label>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              Save
            </button>
            <button type="button" className="btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Vehicle</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>
                  {item.image_urls?.[0] ? <img className="admin-table__thumb" src={item.image_urls[0]} alt="" /> : null}
                </td>
                <td data-label="Vehicle">{item.vehicle}</td>
                <td data-label="Status">
                  <span className={`badge ${item.published ? "badge--published" : "badge--draft"}`}>
                    {item.published ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <button className="btn btn--xs" onClick={() => handleMove(i, -1)} disabled={i === 0}>
                      ↑
                    </button>
                    <button className="btn btn--xs" onClick={() => handleMove(i, 1)} disabled={i === items.length - 1}>
                      ↓
                    </button>
                    <button className="btn btn--xs" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button className="btn btn--xs btn--danger" onClick={() => handleDelete(item)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProjectsPage;
