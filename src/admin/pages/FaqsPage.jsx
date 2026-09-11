import { useEffect, useMemo, useState } from "react";
import { faqsService } from "../services/faqs";
import { moveItem } from "../services/reorder";

const EMPTY_FORM = { category: "", question: "", answer: "", published: true, sort_order: 0 };

function FaqsPage() {
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
      setItems(await faqsService.listAll());
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    }
    return map;
  }, [items]);

  function startCreate() {
    setForm({ ...EMPTY_FORM, category: categories[0] ?? "", sort_order: items.length });
    setEditingId("new");
  }
  function startEdit(item) {
    setForm({
      category: item.category,
      question: item.question,
      answer: item.answer,
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
        await faqsService.insert(form);
      } else {
        await faqsService.update(editingId, form);
      }
      cancelEdit();
      await load();
      setStatus({ type: "success", message: "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${item.question}"? This can't be undone.`)) return;
    try {
      await faqsService.remove(item.id);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleMove(category, index, direction) {
    const categoryItems = grouped.get(category) ?? [];
    const reordered = await moveItem(categoryItems, index, direction, faqsService);
    setItems((current) => {
      const others = current.filter((i) => i.category !== category);
      return [...others, ...reordered].sort((a, b) => a.category.localeCompare(b.category) || a.sort_order - b.sort_order);
    });
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">FAQs</h1>
          <p className="admin-page-subtitle">Grouped by category — tab order on the site follows each category's first question.</p>
        </div>
        {editingId === null && (
          <button className="btn btn--primary" onClick={startCreate}>
            + Add FAQ
          </button>
        )}
      </div>

      {status && <p className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</p>}

      {editingId !== null && (
        <form className="admin-card" onSubmit={handleSubmit}>
          <h2>{editingId === "new" ? "New FAQ" : "Edit FAQ"}</h2>
          <div className="field">
            <label className="field__label">Category</label>
            <input
              className="input"
              list="faq-categories"
              required
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
            <datalist id="faq-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <p className="field__hint">Pick an existing category or type a new one.</p>
          </div>
          <div className="field">
            <label className="field__label">Question</label>
            <input
              className="input"
              required
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="field__label">Answer</label>
            <textarea
              className="input"
              rows={4}
              required
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            />
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
      ) : items.length === 0 ? (
        <p className="empty-state">No FAQs yet.</p>
      ) : (
        [...grouped.entries()].map(([category, categoryItems]) => (
          <div className="admin-card" key={category}>
            <h2>{category}</h2>
            <table className="admin-table">
              <tbody>
                {categoryItems.map((item, i) => (
                  <tr key={item.id}>
                    <td>{item.question}</td>
                    <td>
                      <span className={`badge ${item.published ? "badge--published" : "badge--draft"}`}>
                        {item.published ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="btn btn--xs" onClick={() => handleMove(category, i, -1)} disabled={i === 0}>
                          ↑
                        </button>
                        <button
                          className="btn btn--xs"
                          onClick={() => handleMove(category, i, 1)}
                          disabled={i === categoryItems.length - 1}
                        >
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
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default FaqsPage;
