import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Admin Supabase client — same anon key as the public client, but
 * every request carries the signed-in Clerk user's session token via
 * the `accessToken` hook. Supabase is configured (dashboard side) to
 * accept Clerk as a third-party auth provider, so RLS's `auth.jwt()`
 * sees the Clerk session's claims and `private.is_admin()` (see
 * supabase/schema.sql) can allow writes for the one allow-listed
 * admin user id. No custom token-exchange endpoint needed.
 *
 * `getTokenRef` is set once by <AdminAuthBridge> (src/admin/AdminApp.jsx)
 * as soon as Clerk's `getToken` is available — every query issued
 * before that resolves to a null token, which RLS treats as
 * unauthenticated (read-only), never as an error.
 */
let getTokenRef = async () => null;

export function setAdminTokenGetter(fn) {
  getTokenRef = fn;
}

export const supabaseAdmin = createClient(
  SUPABASE_CONFIGURED ? SUPABASE_URL : "https://placeholder.supabase.co",
  SUPABASE_CONFIGURED ? SUPABASE_ANON_KEY : "placeholder-anon-key",
  {
    accessToken: async () => (await getTokenRef()) ?? null,
  },
);
