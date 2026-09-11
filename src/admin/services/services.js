import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { createResourceService } from "./resource";
import { validateSlugFormat } from "../../lib/slugify";
import { isPathFreeOfActiveRedirect } from "./redirects";

const base = createResourceService("services");

const TIER_ORDER = { featured: 0, supporting: 1, unlisted: 2 };

export const servicesService = {
  ...base,
  async listAll() {
    const { data, error } = await supabaseAdmin.from("services").select("*");
    if (error) throw error;
    return data.sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.sort_order - b.sort_order);
  },
};

/**
 * Full slug validation for a service: format + reserved words, live
 * uniqueness against both `services` and `seo_pages`, and a check
 * that the slug isn't currently claimed as the source of an active
 * redirect (e.g. it *used* to be a different page's URL and now
 * 301s away — claiming it again would conflict with that redirect).
 *
 * @returns {Promise<string | null>} an error message, or null if valid.
 */
export async function validateServiceSlug(slug, { excludeId } = {}) {
  const formatError = validateSlugFormat(slug);
  if (formatError) return formatError;

  const [{ data: serviceMatches, error: serviceError }, { data: seoMatches, error: seoError }] = await Promise.all([
    supabaseAdmin.from("services").select("id").eq("slug", slug),
    supabaseAdmin.from("seo_pages").select("id").eq("slug", slug),
  ]);
  if (serviceError) throw serviceError;
  if (seoError) throw seoError;

  const collidesWithOtherService = serviceMatches.some((row) => row.id !== excludeId);
  if (collidesWithOtherService) return `"${slug}" is already used by another service.`;
  if (seoMatches.length > 0) return `"${slug}" is already used by an SEO page.`;

  const redirectFree = await isPathFreeOfActiveRedirect(`/services/${slug}`);
  if (!redirectFree) {
    return `"${slug}" is currently redirecting elsewhere (see Redirects) — deactivate that redirect first if you want to reuse it.`;
  }

  return null;
}

/**
 * Atomically changes a service's slug and (if it was published)
 * records the old->new redirect — both succeed or neither does. See
 * the `change_service_slug` function in supabase/schema.sql; this is
 * just the client-side call into it, never two separate writes.
 */
export async function changeServiceSlug(id, newSlug) {
  const { data, error } = await supabaseAdmin.rpc("change_service_slug", { p_id: id, p_new_slug: newSlug });
  if (error) throw error;
  return data;
}
