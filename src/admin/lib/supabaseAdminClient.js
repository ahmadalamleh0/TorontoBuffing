import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Admin Supabase client — same anon key as the public client, but
 * every request carries the signed-in Clerk user's session token via
 * the `accessToken` hook. Supabase is configured (dashboard side) to
 * accept Clerk as a third-party auth provider, so RLS's `auth.jwt()`
 * sees the Clerk session's claims and `private.is_admin()` (see
 * supabase/schema.sql) can allow writes for the allow-listed admin
 * user id(s). No custom token-exchange endpoint needed.
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

const clerkClient = createClient(
  SUPABASE_CONFIGURED ? SUPABASE_URL : "https://placeholder.supabase.co",
  SUPABASE_CONFIGURED ? SUPABASE_ANON_KEY : "placeholder-anon-key",
  {
    accessToken: async () => (await getTokenRef()) ?? null,
  },
);

/**
 * Temporary, non-Clerk /admin login's data client (see
 * src/admin/tempAdminAuth.js) — points at this site's own
 * /api/admin/* reverse proxy (netlify/functions/admin-db-proxy.js)
 * instead of Supabase directly. That function is what actually holds
 * the Supabase service-role key and checks the signed session cookie;
 * this client never sees either. The "anon key" passed here is never
 * checked by anything — the proxy authenticates the request via the
 * HttpOnly cookie (sent automatically, same-origin) rather than any
 * header this client sets.
 */
const tempProxyClient = createClient(
  typeof window !== "undefined" ? `${window.location.origin}/api/admin` : "https://placeholder.invalid/api/admin",
  "temp-admin-proxy-not-checked",
  {
    global: { fetch: (input, init) => fetch(input, { ...init, credentials: "include" }) },
  },
);

let activeClient = clerkClient;

/**
 * Switches every subsequent supabaseAdmin call between the normal
 * Clerk-authenticated path and the temporary session-proxy path. Set
 * once, right after a temp session is confirmed valid (or found
 * invalid) — see AdminApp.jsx. Both real clients coexist; this only
 * changes which one supabaseAdmin currently delegates to.
 */
export function useTempAdminProxy(useProxy) {
  activeClient = useProxy ? tempProxyClient : clerkClient;
}

/**
 * A stable delegating handle — every existing call site
 * (src/admin/services/*.js) keeps calling supabaseAdmin.from(...),
 * .rpc(...), .storage.from(...) exactly as before. Which real client
 * those reach is decided per-call by useTempAdminProxy() above, so
 * none of those call sites needed to change for the temp login to
 * work.
 */
export const supabaseAdmin = {
  from: (table) => activeClient.from(table),
  rpc: (fn, args) => activeClient.rpc(fn, args),
  get storage() {
    return activeClient.storage;
  },
};
