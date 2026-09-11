import { fetchFromSupabase } from "./supabaseRest.js";

// Routes that aren't CMS-managed (home, blog posts) — kept in sync by
// hand, same as the static public/sitemap.xml this replaced at the
// /sitemap.xml URL (that static file is still in the repo as a
// fallback/reference; see netlify.toml for how the live URL is routed
// to this generator instead).
const STATIC_URLS = [
  { loc: "/", lastmod: "2026-08-30", priority: "1.0" },
  { loc: "/insights/ppf-vs-ceramic-coating", lastmod: "2026-08-31", priority: "0.6" },
  { loc: "/insights/how-paint-correction-works", lastmod: "2026-08-31", priority: "0.6" },
  { loc: "/insights/how-to-protect-a-new-cars-paint", lastmod: "2026-08-31", priority: "0.6" },
];

function toDateStamp(isoString) {
  return (isoString ?? new Date().toISOString()).slice(0, 10);
}

function escapeXml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c],
  );
}

async function fetchDynamicUrls(config) {
  const [services, seoPages] = await Promise.all([
    fetchFromSupabase(config, "services", "published=eq.true&noindex=eq.false&select=slug,tier,updated_at"),
    fetchFromSupabase(config, "seo_pages", "published=eq.true&noindex=eq.false&select=slug,updated_at,path_prefix"),
  ]);

  return [
    ...services.map((s) => ({
      loc: `/services/${s.slug}`,
      lastmod: toDateStamp(s.updated_at),
      priority: s.tier === "featured" ? "0.9" : "0.8",
    })),
    ...seoPages.map((p) => ({
      loc: `/${p.path_prefix || "pages"}/${p.slug}`,
      lastmod: toDateStamp(p.updated_at),
      priority: "0.6",
    })),
  ];
}

function renderXml(siteUrl, urls) {
  const entries = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(siteUrl + u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

/**
 * Portable sitemap generation — builds the full sitemap.xml body from
 * Supabase (published, non-noindexed services + SEO pages) plus the
 * static routes above. Falls back to just the static routes if
 * Supabase is unreachable/misconfigured, so a hosting adapter never
 * has to handle that failure itself — this always resolves to a
 * valid, non-empty sitemap.
 *
 * @param {{ supabaseUrl: string, anonKey: string, siteUrl: string }} config
 * @returns {Promise<string>} the sitemap XML document
 */
export async function buildSitemapXml({ supabaseUrl, anonKey, siteUrl }) {
  let dynamicUrls = [];
  if (supabaseUrl && anonKey) {
    try {
      dynamicUrls = await fetchDynamicUrls({ supabaseUrl, anonKey });
    } catch (error) {
      console.error("[server/buildSitemap] Falling back to static routes only:", error);
    }
  }

  return renderXml(siteUrl, [...STATIC_URLS, ...dynamicUrls]);
}
