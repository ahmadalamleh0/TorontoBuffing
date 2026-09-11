import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { seoPagesService } from "../services/seoPages";

function SeoPagesListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await seoPagesService.listAll());
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  function livePath(item) {
    return `/${item.path_prefix || "pages"}/${item.slug}`;
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${item.title}"? The page at ${livePath(item)} will stop working. This can't be undone.`)) return;
    try {
      await seoPagesService.remove(item.id);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">SEO Pages</h1>
          <p className="admin-page-subtitle">Standalone content pages at /pages/:slug, built from the same section blocks as the service pages.</p>
        </div>
        <Link className="btn btn--primary" to="/admin/seo-pages/new">
          + New Page
        </Link>
      </div>

      {status && <p className="field__error">{status.message}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <code>{livePath(item)}</code>
                </td>
                <td>
                  <span className={`badge ${item.published ? "badge--published" : "badge--draft"}`}>
                    {item.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <Link className="btn btn--xs" to={`/admin/seo-pages/${item.id}`}>
                      Edit
                    </Link>
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
                  No SEO pages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SeoPagesListPage;
