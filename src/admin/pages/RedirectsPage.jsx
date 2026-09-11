import { useEffect, useState } from "react";
import { redirectsService, bulkInsertRedirects } from "../services/redirects";

const EMPTY_FORM = { from_host: "", from_path: "", to_path: "", redirect_type: 301 };

function normalizePath(value) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/** Parses "one per line" bulk paste: "/old-path -> /new-path". Always host-agnostic (any host) — use the CSV importer (scripts/import-redirects.mjs) for host-specific bulk entries. */
function parseBulkLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [from, to] = line.split("->").map((s) => s?.trim());
      return { from_path: normalizePath(from ?? ""), to_path: normalizePath(to ?? "") };
    })
    .filter((entry) => entry.from_path && entry.to_path);
}

function RedirectsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [bulkText, setBulkText] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await redirectsService.listAll());
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const from_host = form.from_host.trim() || null;
    const from_path = normalizePath(form.from_path);
    const to_path = normalizePath(form.to_path);

    if (!from_path || !to_path) {
      setStatus({ type: "error", message: "Both the old and new URL are required." });
      return;
    }
    if (!from_host && from_path === to_path) {
      setStatus({ type: "error", message: "Old and new URL can't be the same." });
      return;
    }
    if (from_host && (from_host.includes("/") || from_host.includes(" "))) {
      setStatus({ type: "error", message: 'Old Host should be a bare hostname only, e.g. "blog.torontobuffing.com" — no path, no spaces.' });
      return;
    }

    try {
      await redirectsService.insert({
        from_host,
        from_path,
        to_path,
        redirect_type: Number(form.redirect_type),
        source: "manual",
        active: true,
      });
      setForm(EMPTY_FORM);
      await load();
      setStatus({ type: "success", message: "Redirect added." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleBulkSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const entries = parseBulkLines(bulkText);
    if (entries.length === 0) {
      setStatus({ type: "error", message: 'Paste at least one line as "/old-path -> /new-path".' });
      return;
    }

    setBulkBusy(true);
    try {
      const result = await bulkInsertRedirects(entries);
      setBulkText("");
      await load();
      setStatus({
        type: result.errors.length > 0 ? "error" : "success",
        message: `Added ${result.inserted} of ${entries.length} redirect(s).${
          result.errors.length ? ` ${result.errors.length} failed — see browser console for details.` : ""
        }`,
      });
      if (result.errors.length > 0) console.error("[RedirectsPage] Bulk import errors:", result.errors);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setBulkBusy(false);
    }
  }

  async function toggleActive(item) {
    try {
      await redirectsService.update(item.id, { active: !item.active });
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete the redirect from "${item.from_path}"? This can't be undone.`)) return;
    try {
      await redirectsService.remove(item.id);
      await load();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Redirects</h1>
          <p className="admin-page-subtitle">
            Send visitors (and search engines) from an old URL to a new one — applies instantly, no rebuild needed.
          </p>
        </div>
      </div>

      {status && <p className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</p>}

      <form className="admin-card" onSubmit={handleSubmit}>
        <h2>Add Redirect</h2>
        <div className="field-row">
          <div className="field">
            <label className="field__label">Old URL</label>
            <input
              className="input"
              required
              placeholder="/old-page"
              value={form.from_path}
              onChange={(e) => setForm((f) => ({ ...f, from_path: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="field__label">New URL</label>
            <input
              className="input"
              required
              placeholder="/services/new-slug"
              value={form.to_path}
              onChange={(e) => setForm((f) => ({ ...f, to_path: e.target.value }))}
            />
          </div>
          <div className="field" style={{ maxWidth: 160 }}>
            <label className="field__label">Type</label>
            <select
              className="input"
              value={form.redirect_type}
              onChange={(e) => setForm((f) => ({ ...f, redirect_type: e.target.value }))}
            >
              <option value={301}>301 (Permanent)</option>
              <option value={302}>302 (Temporary)</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="field__label">Old Host (optional — only for a legacy subdomain already pointed at this site)</label>
          <input
            className="input"
            placeholder="Leave blank to match this path on any host"
            value={form.from_host}
            onChange={(e) => setForm((f) => ({ ...f, from_host: e.target.value }))}
          />
          <p className="field__hint">
            Setting this only takes effect once that host's DNS already points here — it can't redirect traffic that
            never reaches this site in the first place.
          </p>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            Add Redirect
          </button>
        </div>
      </form>

      <form className="admin-card" onSubmit={handleBulkSubmit}>
        <h2>Bulk Add</h2>
        <div className="field">
          <label className="field__label">One per line: old-path -&gt; new-path</label>
          <textarea
            className="input"
            rows={5}
            placeholder={"/old-page -> /new-page\n/paint-correction-toronto -> /services/paint-correction"}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
          />
          <p className="field__hint">
            Always permanent (301) and any-host. For host-specific or larger imports (a full crawl/migration map),
            use <code>npm run import:redirects -- path/to/file.csv</code> instead — see
            scripts/import-redirects.mjs for the exact format.
          </p>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={bulkBusy}>
            {bulkBusy ? "Adding…" : "Add All"}
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Old URL</th>
              <th>New URL</th>
              <th>Type</th>
              <th>Source</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td data-label="Old URL">
                  <code>
                    {item.from_host ? `${item.from_host} ` : ""}
                    {item.from_path}
                  </code>
                </td>
                <td data-label="New URL">
                  <code>{item.to_path}</code>
                </td>
                <td data-label="Type">{item.redirect_type}</td>
                <td data-label="Source" style={{ textTransform: "capitalize" }}>
                  {item.source}
                </td>
                <td data-label="Status">
                  <span className={`badge ${item.active ? "badge--published" : "badge--draft"}`}>
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <button className="btn btn--xs" onClick={() => toggleActive(item)}>
                      {item.active ? "Deactivate" : "Activate"}
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
                <td colSpan={6} className="empty-state">
                  No redirects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RedirectsPage;
