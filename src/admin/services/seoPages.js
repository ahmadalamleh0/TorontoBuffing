import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { createResourceService } from "./resource";
import { RESERVED_SLUGS, validateSlugFormat } from "../../lib/slugify";
import { isPathFreeOfActiveRedirect } from "./redirects";

export const seoPagesService = createResourceService("seo_pages", { orderColumn: "updated_at", ascending: false });

/**
 * Full slug validation for a new/edited SEO page: format + reserved
 * words (client-side, instant) plus a live uniqueness check against
 * both `seo_pages` and `services` — a new page can't silently shadow
 * or be shadowed by an existing /services/:slug route.
 *
 * @returns {Promise<string | null>} an error message, or null if valid.
 */
export async function validateSeoPageSlug(slug, { excludeId } = {}) {
  const formatError = validateSlugFormat(slug);
  if (formatError) return formatError;

  const [{ data: seoMatches, error: seoError }, { data: serviceMatches, error: serviceError }] = await Promise.all([
    supabaseAdmin.from("seo_pages").select("id").eq("slug", slug),
    supabaseAdmin.from("services").select("id").eq("slug", slug),
  ]);
  if (seoError) throw seoError;
  if (serviceError) throw serviceError;

  if (serviceMatches.length > 0) {
    return `"${slug}" is already used by an existing service page.`;
  }
  const collidesWithOtherSeoPage = seoMatches.some((row) => row.id !== excludeId);
  if (collidesWithOtherSeoPage) {
    return `"${slug}" is already used by another SEO page.`;
  }

  const redirectFree = await isPathFreeOfActiveRedirect(`/pages/${slug}`);
  if (!redirectFree) {
    return `"${slug}" is currently redirecting elsewhere (see Redirects) — deactivate that redirect first if you want to reuse it.`;
  }

  return null;
}

/**
 * Atomically changes an SEO page's slug and (if it was published)
 * records the old->new redirect — both succeed or neither does. See
 * the `change_seo_page_slug` function in supabase/schema.sql; this is
 * just the client-side call into it, never two separate writes.
 */
export async function changeSeoPageSlug(id, newSlug) {
  const { data, error } = await supabaseAdmin.rpc("change_seo_page_slug", { p_id: id, p_new_slug: newSlug });
  if (error) throw error;
  return data;
}

export { RESERVED_SLUGS };
