import { supabaseAdmin } from "../lib/supabaseAdminClient";

/** The homepage content row is a singleton keyed by slug = 'home'. */
export async function getHomePage() {
  const { data, error } = await supabaseAdmin.from("pages").select("*").eq("slug", "home").maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveHomePage(values) {
  const { data, error } = await supabaseAdmin
    .from("pages")
    .upsert({ slug: "home", ...values }, { onConflict: "slug" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
