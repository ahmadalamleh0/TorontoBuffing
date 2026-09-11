export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/** True once real Supabase credentials are configured. Lets every CMS
 * fetcher short-circuit to its static fallback instead of throwing
 * when .env hasn't been set up yet (e.g. local dev before setup). */
export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
