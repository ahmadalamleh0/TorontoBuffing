import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Fetches one published SEO page by slug, scoped to the route it's
 * actually meant to live under (`pathPrefix`, matching the seo_pages
 * `path_prefix` column — "pages" for /pages/:slug, "service-areas"
 * for /service-areas/:slug). Scoping the query this way, rather than
 * fetching by slug alone, is what keeps a page from rendering at two
 * different URLs: a row with path_prefix "service-areas" simply isn't
 * found by a request for /pages/:slug, even if the slug matches.
 * Returns null when not configured, not found, unpublished, or found
 * under a different prefix — the route then renders NotFoundPage,
 * same as any other unknown URL.
 */
export async function fetchSeoPageBySlug(slug, pathPrefix = "pages") {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("path_prefix", pathPrefix)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[cms/seoPages] fetchSeoPageBySlug failed:", error);
    return null;
  }

  return data;
}

/**
 * Every published Insight (path_prefix = 'insights'), ordered for
 * display — display_order first (lower first), then most recently
 * updated. Used by the /insights hub. Returns [] rather than throwing
 * when not configured or on error, since the hub falls back to the
 * bundled legacy posts either way (see BlogSection.jsx/InsightsHubPage.jsx).
 */
export async function fetchPublishedInsights() {
  if (!SUPABASE_CONFIGURED) return [];

  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("path_prefix", "insights")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[cms/seoPages] fetchPublishedInsights failed:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Up to `limit` Insights marked featured, for the homepage's "Latest
 * Insights" section. Same empty-array-on-failure contract as
 * fetchPublishedInsights.
 */
export async function fetchFeaturedInsights(limit = 3) {
  if (!SUPABASE_CONFIGURED) return [];

  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("path_prefix", "insights")
    .eq("published", true)
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[cms/seoPages] fetchFeaturedInsights failed:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Published Insights whose `related_service` matches the given
 * service slug (e.g. "ppf") — the entire "Related Insights" feature
 * is this one query, driven by the `related_service` field an admin
 * sets per Insight, not a hardcoded per-service article list. A
 * service with no matching Insight correctly gets an empty array back
 * (see RelatedInsightsSection, which renders nothing in that case)
 * rather than any kind of fallback content.
 */
export async function fetchRelatedInsights(serviceSlug, limit = 6) {
  if (!SUPABASE_CONFIGURED || !serviceSlug) return [];

  const { data, error } = await supabase
    .from("seo_pages")
    .select("slug, title, excerpt, seo_description, category, cover_image_url")
    .eq("path_prefix", "insights")
    .eq("published", true)
    .eq("related_service", serviceSlug)
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[cms/seoPages] fetchRelatedInsights failed:", error);
    return [];
  }

  return data ?? [];
}
