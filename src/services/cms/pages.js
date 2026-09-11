import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Fetches the singleton homepage content row (slug = 'home'). Returns
 * null when Supabase isn't configured, the row doesn't exist yet, or
 * the request fails — every caller (Hero, BrandStatement, StatsSection,
 * TextReveal, ImageBanner, via HomePage) falls back to its own
 * bundled default copy whenever this returns null or a field is
 * missing, so a misconfigured/offline database never blanks the
 * homepage.
 */
export async function fetchHomePageContent() {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase.from("pages").select("*").eq("slug", "home").maybeSingle();

  if (error) {
    console.error("[cms/pages] fetchHomePageContent failed:", error);
    return null;
  }

  return data;
}
