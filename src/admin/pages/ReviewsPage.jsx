import { useEffect, useState } from "react";
import { reviewsService } from "../services/reviews";
import { moveItem } from "../services/reorder";
import ImagePicker from "../components/ImagePicker";

const EMPTY_FORM = { reviewer_name: "", review_text: "", reviewer_image_url: "", published: true, sort_order: 0 };

function ReviewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await reviewsService.listAll());
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
      reviewer_name: item.reviewer_name,
      review_text: item.review_text,
      reviewer_image_url: item.reviewer_image_url ?? "",
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
    try {
      if (editingId === "new") {
        await reviewsService.insert(form);
      } else {
        await reviewsService.update(editingId, form);
      }
      cancelEdit();
      await load();
      setStatus({ type: "success", message: "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete this review from "${item.reviewer_name}"? This can't be undone.`)) return;
    try {
      await reviewsService.remove(item.id);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleMove(index, direction) {
    setItems(await moveItem(items, index, direction, reviewsService));
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Reviews</h1>
          <p className="admin-page-subtitle">Curated testimonials shown alongside live Google reviews.</p>
        </div>
        {editingId === null && (
          <button className="btn btn--primary" onClick={startCreate}>
            + Add review
          </button>
        )}
      </div>

      {status && <p className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</p>}

      {editingId !== null && (
        <form className="admin-card" onSubmit={handleSubmit}>
          <h2>{editingId === "new" ? "New Review" : "Edit Review"}</h2>
          <div className="field">
            <label className="field__label">Reviewer name</label>
            <input
              className="input"
              required
              value={form.reviewer_name}
              onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="field__label">Review text</label>
            <textarea
              className="input"
              rows={4}
              required
              value={form.review_text}
              onChange={(e) => setForm((f) => ({ ...f, review_text: e.target.value }))}
            />
          </div>
          <ImagePicker
            label="Photo (optional — only reviews with a photo appear in the featured grid)"
            value={form.reviewer_image_url}
            onChange={(v) => setForm((f) => ({ ...f, reviewer_image_url: v }))}
          />
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
              <th>Reviewer</th>
              <th>Review</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{item.reviewer_image_url ? <img className="admin-table__thumb" src={item.reviewer_image_url} alt="" /> : null}</td>
                <td>{item.reviewer_name}</td>
                <td style={{ maxWidth: 320 }}>{item.review_text.slice(0, 80)}…</td>
                <td>
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
                <td colSpan={5} className="empty-state">
                  No reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReviewsPage;
