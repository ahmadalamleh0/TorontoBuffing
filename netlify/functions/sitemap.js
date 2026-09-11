// Netlify Function adapter -> GET /sitemap.xml (rewritten from
// /.netlify/functions/sitemap via netlify.toml, force=true so it wins
// over the static public/sitemap.xml file). This file's only job is
// Netlify-specific glue: read Node's env vars, call the portable
// generator in server/buildSitemap.js, wrap the result in Netlify's
// Lambda-style response shape. No sitemap-building logic lives here —
// moving to a different host means rewriting this handful of lines in
// that host's idiom and NOTHING in server/.
import { buildSitemapXml } from "../../server/buildSitemap.js";

const SITE_URL = process.env.SITE_URL || "https://www.torontobuffing.com";

export async function handler() {
  const body = await buildSitemapXml({
    supabaseUrl: process.env.VITE_SUPABASE_URL,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY,
    siteUrl: SITE_URL,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=900, stale-while-revalidate=300",
    },
    body,
  };
}
