/**
 * Portable core — this whole `server/` directory has zero imports
 * from any hosting platform's SDK (no Netlify, no Deno-specific
 * globals, no Node-only APIs). Everything here runs on nothing but
 * the standard `fetch` API, which every modern JS runtime provides
 * (Deno/Netlify Edge Functions, Node 18+/Netlify Functions,
 * Cloudflare Workers, Vercel Edge/Node runtimes, Bun). A hosting
 * adapter's only job is to: read that platform's request shape, read
 * that platform's env vars, call a function in here, and translate
 * the plain-data result back into that platform's response shape.
 * See netlify/edge-functions/redirects.js and
 * netlify/functions/sitemap.js for the current (Netlify) adapters.
 */

/**
 * Minimal Supabase REST (PostgREST) fetch helper. Deliberately not
 * using @supabase/supabase-js here — plain `fetch` against the REST
 * API keeps this file dependency-free and usable in any runtime
 * without worrying whether that runtime's package registry/import
 * mechanism can resolve the Supabase SDK.
 *
 * @param {{ supabaseUrl: string, anonKey: string }} config
 * @param {string} table
 * @param {string} queryString - raw PostgREST query string, e.g. "select=a,b&active=eq.true"
 */
export async function fetchFromSupabase({ supabaseUrl, anonKey }, table, queryString) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}?${queryString}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  if (!res.ok) {
    throw new Error(`Supabase REST request to "${table}" failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
