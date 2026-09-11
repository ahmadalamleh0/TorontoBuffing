import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Maps a `projects` row onto the exact shape
 * src/components/SelectedWorkSection/projectsData.js's PROJECTS array
 * already uses ({ id, vehicle, images }), so WorkCard.jsx needs zero
 * changes.
 */
function toProjectCardShape(row) {
  return {
    id: row.id,
    vehicle: row.vehicle,
    servicesPerformed: row.services_performed ?? [],
    description: row.description ?? "",
    images: row.image_urls ?? [],
  };
}

/**
 * Fetches every published project in display order. Returns null on
 * failure/not-configured so SelectedWorkSection falls back to the
 * bundled projectsData.js instead of rendering an empty carousel.
 */
export async function fetchPublishedProjects() {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[cms/projects] fetchPublishedProjects failed:", error);
    return null;
  }

  const withImages = data.filter((row) => (row.image_urls ?? []).length > 0);
  return withImages.map(toProjectCardShape);
}
