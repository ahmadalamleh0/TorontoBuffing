import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { seoPagesService, validateSeoPageSlug, changeSeoPageSlug } from "../services/seoPages";
import { slugify } from "../../lib/slugify";
import ImagePicker from "../components/ImagePicker";
import ComposableSectionsEditor from "../components/ComposableSectionsEditor";

const PATH_PREFIXES = [
  { value: "pages", label: "Standard Page (/pages/:slug)" },
  { value: "service-areas", label: "Service Area (/service-areas/:slug)" },
  { value: "insights", label: "Insight (/insights/:slug)" },
];

const INSIGHT_CATEGORIES = ["Paint Correction", "Paint Protection Film", "Ceramic Coating", "Vehicle Care"];

const EMPTY_FORM = {
  title: "",
  slug: "",
  path_prefix: "pages",
  hero: { title: "", copy: "", image: "", imageAlt: "", centered: true },
  sections: [],
  seo_title: "",
  seo_description: "",
  og_title: "",
  og_description: "",
  og_image_url: "",
  canonical_url: "",
  noindex: false,
  published: false,
  category: "",
  excerpt: "",
  cover_image_url: "",
  related_service: "",
  featured: false,
  display_order: 0,
};

function SeoPageEditPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [original, setOriginal] = useState(null); // { slug, published, path_prefix } as loaded — null for a new page
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    seoPagesService
      .getById(id)
      .then((row) => {
        if (!row) {
          navigate("/admin/seo-pages", { replace: true });
          return;
        }
        setForm({
          title: row.title ?? "",
          slug: row.slug ?? "",
          path_prefix: row.path_prefix ?? "pages",
          hero: { title: "", copy: "", image: "", imageAlt: "", centered: true, ...row.hero },
          sections: row.sections ?? [],
          seo_title: row.seo_title ?? "",
          seo_description: row.seo_description ?? "",
          og_title: row.og_title ?? "",
          og_description: row.og_description ?? "",
          og_image_url: row.og_image_url ?? "",
          canonical_url: row.canonical_url ?? "",
          noindex: row.noindex ?? false,
          published: row.published,
          category: row.category ?? "",
          excerpt: row.excerpt ?? "",
          cover_image_url: row.cover_image_url ?? "",
          related_service: row.related_service ?? "",
          featured: row.featured ?? false,
          display_order: row.display_order ?? 0,
        });
        setOriginal({ slug: row.slug, published: row.published, path_prefix: row.path_prefix ?? "pages" });
        setSlugTouched(true);
      })
      .catch((err) => setStatus({ type: "error", message: err.message }))
      .finally(() => setLoading(false));
  }, [id, isNew, navigate]);

  function updateTitle(title) {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  }
  function updateSlug(rawSlug) {
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug: slugify(rawSlug) }));
  }
  function updateHero(key, value) {
    setForm((f) => ({ ...f, hero: { ...f.hero, [key]: value } }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const slugChanged = !isNew && form.slug !== original.slug;

    const slugError = await validateSeoPageSlug(form.slug, { excludeId: isNew ? undefined : id });
    if (slugError) {
      setStatus({ type: "error", message: slugError });
      return;
    }

    if (slugChanged && original.published) {
      const livePrefix = original.path_prefix || "pages";
      const confirmed = confirm(
        `This page is published at /${livePrefix}/${original.slug}. Changing its URL to /${livePrefix}/${form.slug} can break ` +
          `existing links and search rankings pointing at the old address.\n\n` +
          `A permanent (301) redirect from the old URL to the new one will be created automatically, so visitors ` +
          `and search engines land on the right page either way.\n\nContinue?`,
      );
      if (!confirmed) return;
    }

    setSaving(true);
    try {
      if (isNew) {
        const created = await seoPagesService.insert(form);
        navigate(`/admin/seo-pages/${created.id}`, { replace: true });
      } else {
        // Every field except slug is a normal update. The slug itself
        // (when changed) goes through change_seo_page_slug — a single
        // database transaction that updates the slug AND records the
        // old->new redirect together, so a failure on either half
        // leaves nothing changed rather than a half-moved page.
        // path_prefix is locked once a page exists (see the field
        // below) — the slug-change redirect machinery only accounts
        // for a slug changing within the SAME prefix, not the prefix
        // itself changing, so this form never sends a changed one.
        const { slug: _omitSlug, ...fieldsWithoutSlug } = form;
        await seoPagesService.update(id, fieldsWithoutSlug);
        if (slugChanged) {
          await changeSeoPageSlug(id, form.slug);
        }
        setOriginal({ slug: form.slug, published: form.published, path_prefix: form.path_prefix });
      }
      setStatus({ type: "success", message: slugChanged ? "Saved — old URL now redirects here." : "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${form.title}"? This can't be undone.`)) return;
    try {
      await seoPagesService.remove(id);
      navigate("/admin/seo-pages");
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  if (loading) return <p>Loading…</p>;

  const isInsight = form.path_prefix === "insights";

  return (
    <div>
      <Link className="admin-back-link" to="/admin/seo-pages">
        ← Back to SEO Pages
      </Link>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">{isNew ? "New SEO Page" : form.title}</h1>
          {!isNew && (
            <p className="admin-page-subtitle">
              Live at <code>/{form.path_prefix || "pages"}/{form.slug}</code>
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <h2>Page</h2>
          <div className="field">
            <label className="field__label">Page type</label>
            <select
              className="input"
              value={form.path_prefix}
              disabled={!isNew}
              onChange={(e) => setForm((f) => ({ ...f, path_prefix: e.target.value }))}
            >
              {PATH_PREFIXES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            {!isNew && (
              <p className="field__hint">
                Page type can't be changed once a page exists, since it changes the page's URL. Delete and recreate
                it under the new type if this page truly belongs somewhere else.
              </p>
            )}
          </div>
          <div className="field">
            <label className="field__label">Page title</label>
            <input className="input" required value={form.title} onChange={(e) => updateTitle(e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Slug</label>
            <input className="input" required value={form.slug} onChange={(e) => updateSlug(e.target.value)} />
            <p className="field__hint">
              Page will be live at torontobuffing.com/{form.path_prefix || "pages"}/{form.slug || "…"}. Lowercase
              letters, numbers and hyphens only.{" "}
              {!isNew && original?.published && (
                <strong>This page is published — changing the slug will automatically redirect the old URL.</strong>
              )}
            </p>
          </div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published (uncheck to save as a draft only you can preview via this admin)
          </label>
        </div>

        {isInsight && (
          <div className="admin-card">
            <h2>Insight Details</h2>
            <div className="field">
              <label className="field__label">Category</label>
              <select className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                <option value="">Select a category…</option>
                {INSIGHT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field__label">Excerpt (shown on Insight cards)</label>
              <textarea
                className="input"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              />
            </div>
            <ImagePicker label="Cover image" value={form.cover_image_url} onChange={(v) => setForm((f) => ({ ...f, cover_image_url: v }))} />
            <div className="field">
              <label className="field__label">Related service slug (optional, e.g. "ppf")</label>
              <input
                className="input"
                placeholder="ppf"
                value={form.related_service}
                onChange={(e) => setForm((f) => ({ ...f, related_service: e.target.value }))}
              />
            </div>
            <div className="field">
              <label className="field__label">Display order (lower shows first)</label>
              <input
                className="input"
                type="number"
                value={form.display_order}
                onChange={(e) => setForm((f) => ({ ...f, display_order: Number(e.target.value) || 0 }))}
              />
            </div>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured (shows in the homepage's Latest Insights section, up to 3 at a time)
            </label>
          </div>
        )}

        <div className="admin-card">
          <h2>Hero</h2>
          <div className="field">
            <label className="field__label">Title</label>
            <input className="input" value={form.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Copy</label>
            <textarea className="input" rows={3} value={form.hero.copy} onChange={(e) => updateHero("copy", e.target.value)} />
          </div>
          <ImagePicker label="Hero image" value={form.hero.image} onChange={(v) => updateHero("image", v)} />
          <div className="field">
            <label className="field__label">Hero image alt text</label>
            <input className="input" value={form.hero.imageAlt} onChange={(e) => updateHero("imageAlt", e.target.value)} />
          </div>
        </div>

        <div className="admin-card">
          <h2>Page Content</h2>
          <ComposableSectionsEditor sections={form.sections} onChange={(sections) => setForm((f) => ({ ...f, sections }))} />
        </div>

        <div className="admin-card">
          <h2>SEO</h2>
          <div className="field">
            <label className="field__label">Meta title</label>
            <input className="input" value={form.seo_title} onChange={(e) => setForm((f) => ({ ...f, seo_title: e.target.value }))} />
          </div>
          <div className="field">
            <label className="field__label">Meta description</label>
            <textarea
              className="input"
              rows={2}
              value={form.seo_description}
              onChange={(e) => setForm((f) => ({ ...f, seo_description: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="field__label">Open Graph title (optional — reuses meta title if blank)</label>
            <input className="input" value={form.og_title} onChange={(e) => setForm((f) => ({ ...f, og_title: e.target.value }))} />
          </div>
          <div className="field">
            <label className="field__label">Open Graph description (optional — reuses meta description if blank)</label>
            <textarea
              className="input"
              rows={2}
              value={form.og_description}
              onChange={(e) => setForm((f) => ({ ...f, og_description: e.target.value }))}
            />
          </div>
          <ImagePicker label="Open Graph image" value={form.og_image_url} onChange={(v) => setForm((f) => ({ ...f, og_image_url: v }))} />
          <div className="field">
            <label className="field__label">Canonical URL (optional — only set this if this page's content duplicates another page)</label>
            <input
              className="input"
              placeholder="Leave blank to use this page's own URL"
              value={form.canonical_url}
              onChange={(e) => setForm((f) => ({ ...f, canonical_url: e.target.value }))}
            />
          </div>
          <label className="checkbox-row">
            <input type="checkbox" checked={form.noindex} onChange={(e) => setForm((f) => ({ ...f, noindex: e.target.checked }))} />
            Hide from search engines (noindex) — the page stays live and linkable, just excluded from Google/Bing
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          {!isNew && (
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Delete page
            </button>
          )}
          {status && <span className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</span>}
        </div>
      </form>
    </div>
  );
}

export default SeoPageEditPage;
