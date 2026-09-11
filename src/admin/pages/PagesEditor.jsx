import { useEffect, useState } from "react";
import ImagePicker from "../components/ImagePicker";
import { getHomePage, saveHomePage } from "../services/pages";

const EMPTY = {
  hero: { eyebrow: "", headline: [""], subline: "" },
  brand_statement: { headline: [""], copy: "" },
  stats: [],
  text_reveal: { eyebrow: "", title: "", bodyLead: "", bodyEmphasis: "" },
  image_banner: { imageUrl: "", alt: "" },
  seo_title: "",
  seo_description: "",
  og_title: "",
  og_description: "",
  og_image_url: "",
  canonical_url: "",
};

function linesToText(lines) {
  return Array.isArray(lines) ? lines.join("\n") : "";
}
function textToLines(text) {
  return text.split("\n");
}

function PagesEditor() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getHomePage()
      .then((row) => {
        if (row) {
          setForm({
            hero: { ...EMPTY.hero, ...row.hero },
            brand_statement: { ...EMPTY.brand_statement, ...row.brand_statement },
            stats: row.stats?.length ? row.stats : EMPTY.stats,
            text_reveal: { ...EMPTY.text_reveal, ...row.text_reveal },
            image_banner: { ...EMPTY.image_banner, ...row.image_banner },
            seo_title: row.seo_title ?? "",
            seo_description: row.seo_description ?? "",
            og_title: row.og_title ?? "",
            og_description: row.og_description ?? "",
            og_image_url: row.og_image_url ?? "",
            canonical_url: row.canonical_url ?? "",
          });
        }
      })
      .catch((err) => setStatus({ type: "error", message: err.message }))
      .finally(() => setLoading(false));
  }, []);

  function updateHero(key, value) {
    setForm((f) => ({ ...f, hero: { ...f.hero, [key]: value } }));
  }
  function updateBrand(key, value) {
    setForm((f) => ({ ...f, brand_statement: { ...f.brand_statement, [key]: value } }));
  }
  function updateTextReveal(key, value) {
    setForm((f) => ({ ...f, text_reveal: { ...f.text_reveal, [key]: value } }));
  }
  function updateImageBanner(key, value) {
    setForm((f) => ({ ...f, image_banner: { ...f.image_banner, [key]: value } }));
  }
  function updateStat(index, key, value) {
    setForm((f) => {
      const stats = [...f.stats];
      stats[index] = { ...stats[index], [key]: value };
      return { ...f, stats };
    });
  }
  function addStat() {
    setForm((f) => ({ ...f, stats: [...f.stats, { value: 0, suffix: "+", useLocaleString: false, label: "" }] }));
  }
  function removeStat(index) {
    setForm((f) => ({ ...f, stats: f.stats.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    try {
      await saveHomePage(form);
      setStatus({ type: "success", message: "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Pages</h1>
          <p className="admin-page-subtitle">Homepage copy, images and SEO. Layout and animations aren't editable here.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <h2>Hero</h2>
          <div className="field">
            <label className="field__label">Eyebrow</label>
            <input className="input" value={form.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Headline (one line per row)</label>
            <textarea
              className="input"
              rows={2}
              value={linesToText(form.hero.headline)}
              onChange={(e) => updateHero("headline", textToLines(e.target.value))}
            />
          </div>
          <div className="field">
            <label className="field__label">Subline</label>
            <input className="input" value={form.hero.subline} onChange={(e) => updateHero("subline", e.target.value)} />
          </div>
          <p className="field__hint">
            The hero background photo isn't editable here — it's a fixed asset the homepage preloads for fast loading.
          </p>
        </div>

        <div className="admin-card">
          <h2>Brand Statement</h2>
          <div className="field">
            <label className="field__label">Headline (one line per row)</label>
            <textarea
              className="input"
              rows={2}
              value={linesToText(form.brand_statement.headline)}
              onChange={(e) => updateBrand("headline", textToLines(e.target.value))}
            />
          </div>
          <div className="field">
            <label className="field__label">Copy</label>
            <textarea className="input" rows={2} value={form.brand_statement.copy} onChange={(e) => updateBrand("copy", e.target.value)} />
          </div>
        </div>

        <div className="admin-card">
          <h2>"Why Toronto Buffing" Section</h2>
          <div className="field">
            <label className="field__label">Eyebrow</label>
            <input className="input" value={form.text_reveal.eyebrow} onChange={(e) => updateTextReveal("eyebrow", e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Title</label>
            <input className="input" value={form.text_reveal.title} onChange={(e) => updateTextReveal("title", e.target.value)} />
          </div>
          <div className="field">
            <label className="field__label">Body</label>
            <textarea
              className="input"
              rows={3}
              value={form.text_reveal.bodyLead}
              onChange={(e) => updateTextReveal("bodyLead", e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field__label">Bolded ending phrase</label>
            <input
              className="input"
              value={form.text_reveal.bodyEmphasis}
              onChange={(e) => updateTextReveal("bodyEmphasis", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-card">
          <h2>Stats</h2>
          {form.stats.map((stat, i) => (
            <div className="field-group" key={i}>
              <div className="field-row">
                <div className="field">
                  <label className="field__label">Number</label>
                  <input
                    className="input"
                    type="number"
                    value={stat.value}
                    onChange={(e) => updateStat(i, "value", Number(e.target.value))}
                  />
                </div>
                <div className="field">
                  <label className="field__label">Suffix (e.g. "+" or "-YEAR")</label>
                  <input className="input" value={stat.suffix} onChange={(e) => updateStat(i, "suffix", e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="field__label">Label</label>
                <input className="input" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
              </div>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={stat.useLocaleString}
                  onChange={(e) => updateStat(i, "useLocaleString", e.target.checked)}
                />
                Use comma separators for large numbers (e.g. 1,000)
              </label>
              <button type="button" className="btn btn--sm btn--danger" onClick={() => removeStat(i)}>
                Remove stat
              </button>
            </div>
          ))}
          <button type="button" className="btn btn--sm" onClick={addStat}>
            + Add stat
          </button>
        </div>

        <div className="admin-card">
          <h2>Image Banner</h2>
          <ImagePicker label="Image" value={form.image_banner.imageUrl} onChange={(v) => updateImageBanner("imageUrl", v)} />
          <div className="field">
            <label className="field__label">Alt text</label>
            <input className="input" value={form.image_banner.alt} onChange={(e) => updateImageBanner("alt", e.target.value)} />
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
            <label className="field__label">Canonical URL (optional — almost never needed for the homepage)</label>
            <input
              className="input"
              placeholder="Leave blank to use https://www.torontobuffing.com/"
              value={form.canonical_url}
              onChange={(e) => setForm((f) => ({ ...f, canonical_url: e.target.value }))}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            Save
          </button>
          {status && <span className={status.type === "error" ? "field__error" : "field__hint"}>{status.message}</span>}
        </div>
      </form>
    </div>
  );
}

export default PagesEditor;
