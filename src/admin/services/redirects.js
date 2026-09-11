import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { createResourceService } from "./resource";

export const redirectsService = createResourceService("redirects", { orderColumn: "created_at", ascending: false });

/**
 * True if `path` (on the primary domain — from_host is null) isn't
 * currently claimed by an active redirect other than `excludeId`.
 * Host-specific redirects (for some other, not-yet-migrated domain)
 * are ignored here on purpose — they don't conflict with this app's
 * own /services/:slug or /pages/:slug routes.
 */
export async function isPathFreeOfActiveRedirect(path, { excludeId } = {}) {
  const { data, error } = await supabaseAdmin
    .from("redirects")
    .select("id")
    .eq("from_path", path)
    .eq("active", true)
    .is("from_host", null);
  if (error) throw error;
  return data.every((row) => row.id === excludeId);
}

/**
 * Inserts many redirect rows at once — used by the admin's "Bulk Add"
 * paste box. (scripts/import-redirects.mjs is the other bulk path,
 * for a real crawl/migration CSV — it runs as a plain Node script
 * with the service-role key, so it talks to Supabase directly rather
 * than importing this browser-side admin module.) Each entry here is
 * inserted independently (not a single all-or-nothing transaction) so
 * one bad row doesn't block the rest of a large paste; failures are
 * returned for the caller to show, not thrown.
 *
 * @param {{ from_host?: string|null, from_path: string, to_path: string, redirect_type?: 301|302 }[]} entries
 * @returns {Promise<{ inserted: number, errors: { entry: object, message: string }[] }>}
 */
export async function bulkInsertRedirects(entries) {
  const errors = [];
  let inserted = 0;

  for (const entry of entries) {
    const { error } = await supabaseAdmin.from("redirects").insert({
      from_host: entry.from_host || null,
      from_path: entry.from_path,
      to_path: entry.to_path,
      redirect_type: entry.redirect_type === 302 ? 302 : 301,
      source: "manual",
      active: true,
    });
    if (error) {
      errors.push({ entry, message: error.message });
    } else {
      inserted += 1;
    }
  }

  return { inserted, errors };
}
