import { fetchFromSupabase } from "./supabaseRest.js";

/**
 * Portable redirect resolution — the actual "should this request
 * redirect, and to where" decision, with no hosting-platform APIs.
 * A hosting adapter calls this with the incoming request's host and
 * pathname; everything else (env vars, turning the result into an
 * HTTP redirect response) is the adapter's job.
 *
 * Host-scoped rows (`from_host` set) win over host-agnostic rows
 * (`from_host` null) for the same pathname, so a redirect specific to
 * an old subdomain can override a catch-all rule for the same path
 * without conflicting with it (see supabase/schema.sql's
 * `redirects_active_from_host_path_key` index, which allows exactly
 * one active row per (host-or-any, path) pair).
 *
 * @param {{ supabaseUrl: string, anonKey: string }} config
 * @param {string} host - the request's hostname, e.g. "www.torontobuffing.com"
 * @param {string} pathname - the request's path, e.g. "/old-page"
 * @returns {Promise<{ to: string, type: 301 | 302 } | null>}
 */
export async function resolveRedirect({ supabaseUrl, anonKey }, host, pathname) {
  if (!supabaseUrl || !anonKey) return null;

  const query = `from_path=eq.${encodeURIComponent(pathname)}&active=eq.true&select=to_path,redirect_type,from_host`;
  const rows = await fetchFromSupabase({ supabaseUrl, anonKey }, "redirects", query);
  if (rows.length === 0) return null;

  const hostMatch = rows.find((row) => row.from_host && row.from_host === host);
  const globalMatch = rows.find((row) => !row.from_host);
  const match = hostMatch ?? globalMatch;
  if (!match) return null;

  return { to: match.to_path, type: match.redirect_type === 302 ? 302 : 301 };
}
