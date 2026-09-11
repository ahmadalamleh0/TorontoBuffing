import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_CONFIGURED } from "./supabaseEnv";

/**
 * Public, read-only Supabase client (anon key). Used by the public
 * site to read published CMS content — RLS only grants this key
 * `select` on rows where `published = true`, so it can never write.
 *
 * Falls back to a harmless placeholder URL when env vars aren't set
 * (e.g. before Supabase is configured) so `createClient` never throws
 * at import time; every CMS fetch helper checks SUPABASE_CONFIGURED
 * and falls back to bundled static content instead of calling this.
 */
export const supabase = createClient(
  SUPABASE_CONFIGURED ? SUPABASE_URL : "https://placeholder.supabase.co",
  SUPABASE_CONFIGURED ? SUPABASE_ANON_KEY : "placeholder-anon-key",
);
