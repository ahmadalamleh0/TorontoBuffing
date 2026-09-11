import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Maps a `services` row onto the exact shape the (unmodified)
 * ServiceCard / ServiceHero / ServiceSection components already
 * expect (see src/data/servicesData.js + src/data/servicePages/*.js),
 * so those rendering components don't need to know CMS rows exist.
 */
function toServiceCardShape(row) {
  return {
    id: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    image: row.card_image_url || null,
    page: { hero: row.hero, sections: row.sections, cta: row.cta },
    seo: {
      title: row.seo_title,
      description: row.seo_description,
      ogTitle: row.og_title,
      ogDescription: row.og_description,
      ogImage: row.og_image_url,
      canonical: row.canonical_url,
      noindex: row.noindex,
    },
  };
}

/**
 * Fetches every published service, grouped the same way
 * src/data/servicesData.js's FEATURED_SERVICES/SUPPORTING_SERVICES
 * are today. Returns null on failure/not-configured so ServicesSection
 * falls back to that static file instead of rendering an empty grid.
 */
export async function fetchPublishedServices() {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[cms/services] fetchPublishedServices failed:", error);
    return null;
  }

  const mapped = data.map(toServiceCardShape);
  return {
    featured: mapped.filter((s, i) => data[i].tier === "featured"),
    supporting: mapped.filter((s, i) => data[i].tier === "supporting"),
  };
}

/**
 * Fetches one published service by its slug (the /services/:slug
 * route). Returns null on failure/not-found so ServicePage falls back
 * to src/data/servicesData.js's ALL_SERVICES lookup.
 */
export async function fetchServiceBySlug(slug) {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[cms/services] fetchServiceBySlug failed:", error);
    return null;
  }

  return data ? toServiceCardShape(data) : null;
}
