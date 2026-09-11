import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { servicesService, validateServiceSlug, changeServiceSlug } from "../services/services";
import { slugify } from "../../lib/slugify";
import ImagePicker from "../components/ImagePicker";
import FixedSectionsEditor from "../components/FixedSectionsEditor";

function ServiceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [original, setOriginal] = useState(null); // { slug, published } as loaded
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    servicesService
      .getById(id)
      .then((row) => {
        if (!row) {
          navigate("/admin/services", { replace: true });
          return;
        }
        setForm({
          slug: row.slug,
          title: row.title ?? "",
          subtitle: row.subtitle ?? "",
          card_image_url: row.card_image_url ?? "",
          tier: row.tier,
          published: row.published,
          hero: { title: "", copy: "", image: "", imageAlt: "", centered: true, titleNoWrap: false, ...row.hero },
          sections: row.sections ?? [],
          cta: { heading: "", buttonLabel: "", ...row.cta },
          seo_title: row.seo_title ?? "",
          seo_description: row.seo_description ?? "",
          og_title: row.og_title ?? "",
          og_description: row.og_description ?? "",
          og_image_url: row.og_image_url ?? "",
          canonical_url: row.canonical_url ?? "",
          noindex: row.noindex ?? false,
        });
        setOriginal({ slug: row.slug, published: row.published });
      })
      .catch((err) => setStatus({ type: "error", message: err.message }));
  }, [id, navigate]);

  function updateHero(key, value) {
    setForm((f) => ({ ...f, hero: { ...f.hero, [key]: value } }));
  }
  function updateCta(key, value) {
    setForm((f) => ({ ...f, cta: { ...f.cta, [key]: value } }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const slug = slugify(form.slug);
    const slugChanged = slug !== original.slug;

    if (slugChanged) {
      const slugError = await validateServiceSlug(slug, { excludeId: id });
      if (slugError) {
        setStatus({ type: "error", message: slugError });
        return;
      }
      if (original.published) {
        const confirmed = confirm(
          `This page is published at /services/${original.slug}. Changing its URL to /services/${slug} can break ` +
            `existing links and search rankings pointing at the old address.\n\n` +
            `A permanent (301) redirect from the old URL to the new one will be created automatically, so visitors ` +
            `and search engines land on the right page either way.\n\nContinue?`,
        );
        if (!confirmed) return;
      }
    }

    setSaving(true);
    try {
      // Every field except slug is a normal update. The slug itself
      // (when changed) goes through change_service_slug — a single
      // database transaction that updates the slug AND records the
      // old->new redirect together, so a failure on either half
      // leaves nothing changed rather than a half-moved page.
      const { slug: _omitSlug, ...fieldsWithoutSlug } = form;
      await servicesService.update(id, fieldsWithoutSlug);
      if (slugChanged) {
        await changeServiceSlug(id, slug);
      }
      setForm((f) => ({ ...f, slug }));
      setOriginal({ slug, published: form.published });
      setStatus({ type: "success", message: slugChanged ? "Saved — old URL now redirects here." : "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (!form) return <p>Loading…</p>;

  return (
    <div>
      <Link className="admin-back-link" to="/admin/services">
        ← Back to Services
      </Link>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">{form.title}</h1>
          <p className="admin-page-subtitle">Content, images and SEO only — section layout and order are fixed.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <h2>URL</h2>
          <div className="field">
            <label className="field__label">Slug</label>
            <input className="input" required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            <p className="field__hint">
              Live at torontobuffing.com/services/{form.slug || "…"}.{" "}
              {original.published && (
                <strong>This page is published — changing the slug will automatically redirect the old URL.</strong>
              )}
            </p>
          </div>
        </div>

        <div className="admin-card">
          <h2>Card (homepage services grid)</h2>
          <div className="field-row">
            <div className="field">
              <label className="field__label">Title</label>
              <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="field">
              <label className="field__label">Subtitle</label>
              <input className="input" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
            </div>
          </div>
          <ImagePicker label="Card image" value={form.card_image_url} onChange={(v) => setForm((f) => ({ ...f, card_image_url: v }))} />
          <div className="field">
            <label className="field__label">Grid group</label>
            <select className="input" value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}>
              <option value="featured">Featured (large card)</option>
              <option value="supporting">Supporting (small card)</option>
              <option value="unlisted">Unlisted (page only, no homepage card)</option>
            </select>
          </div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published
          </label>
        </div>

        <div className="admin-card">
          <h2>Page Hero</h2>
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
          <FixedSectionsEditor sections={form.sections} onChange={(sections) => setForm((f) => ({ ...f, sections }))} />
        </div>

        <div className="admin-card">
          <h2>Call to Action</h2>
          <div className="field">
            <label className="field__label">Heading</label>
            <input className="input" value={form.cta.heading} onChange={(e) => updateCta("heading", e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Button label</label>
            <input className="input" value={form.cta.buttonLabel} onChange={(e) => updateCta("buttonLabel", e.target.value)} />
          </div>
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
          {status && <span className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</span>}
        </div>
      </form>
    </div>
  );
}

export default ServiceEditPage;
