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
      // .select() is what makes Supabase actually report which rows
      // were deleted. Without it, a delete that RLS silently blocks
      // (0 rows matched — e.g. the caller isn't currently recognized
      // as an admin, such as a momentarily stale Clerk session token)
      // returns exactly the same { error: null } as a real success,
      // so the caller has no way to tell them apart — confirmed
      // directly against this project's own database: an
      // unauthenticated delete call returns status 204/error null
      // while leaving the row completely untouched. update() above
      // already gets this for free from .single() (which throws on 0
      // rows) — remove() never had the equivalent check, which is
      // exactly why "unpublish" (an update) surfaces failures but
      // delete silently did nothing. Throwing here whenever nothing
      // came back turns that silent no-op into a real, visible error.
      const { data, error } = await supabaseAdmin.from(table).delete().eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("Delete failed: no matching row was removed. You may not have permission, or it was already deleted.");
      }
    },
  };
}
