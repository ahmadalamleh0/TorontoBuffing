import { supabaseAdmin } from "../lib/supabaseAdminClient";

/**
 * Shared CRUD implementation for the id-keyed content tables
 * (projects, reviews, faqs, seo_pages — services.js wraps this too,
 * with extra tier-aware ordering on top). Every write goes through
 * the Clerk-authenticated `supabaseAdmin` client, so RLS's
 * `private.is_admin()` is what actually gates these — this factory
 * just avoids repeating the same five queries five times.
 */
export function createResourceService(table, { orderColumn = "sort_order", ascending = true } = {}) {
  return {
    async listAll() {
      const { data, error } = await supabaseAdmin.from(table).select("*").order(orderColumn, { ascending });
      if (error) throw error;
      return data;
    },

    async getById(id) {
      const { data, error } = await supabaseAdmin.from(table).select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },

    async insert(values) {
      const { data, error } = await supabaseAdmin.from(table).insert(values).select().single();
      if (error) throw error;
      return data;
    },

    async update(id, values) {
      const { data, error } = await supabaseAdmin.from(table).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },

    async remove(id) {
      const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
      if (error) throw error;
    },
  };
}
