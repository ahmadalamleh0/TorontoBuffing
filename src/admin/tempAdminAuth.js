/**
 * ============================================================================
 * TEMPORARY — custom, non-Clerk /admin login (client review)
 * ============================================================================
 * Talks to netlify/functions/admin-login.js, admin-logout.js and
 * admin-session.js — real credential checking, password hashing and
 * session signing all happen server-side (server/tempAdminAuth.js);
 * this file just calls those endpoints and reports what they say.
 *
 * Gated by VITE_TEMP_ADMIN_LOGIN_ENABLED, which mirrors the server-side
 * TEMP_ADMIN_LOGIN_ENABLED Netlify env var (Vite only exposes
 * VITE_-prefixed vars to the browser bundle, so the one flag needs
 * both names set to the same value). AdminApp.jsx only renders the
 * temp login form / activates the proxy client when this is "true";
 * with it unset or "false", AdminApp.jsx behaves exactly as it did
 * before this system existed — plain Clerk, nothing from this file
 * runs at all.
 *
 * TO REVERT: remove/unset both TEMP_ADMIN_LOGIN_ENABLED and
 * VITE_TEMP_ADMIN_LOGIN_ENABLED in Netlify, and redeploy. No code
 * changes needed — everything here and in AdminApp.jsx is already
 * conditioned on the flag.
 * ============================================================================
 */
export const TEMP_ADMIN_LOGIN_ENABLED = import.meta.env.VITE_TEMP_ADMIN_LOGIN_ENABLED === "true";

/** @returns {Promise<boolean>} whether the browser currently holds a valid temp-admin session. */
export async function checkTempSession() {
  if (!TEMP_ADMIN_LOGIN_ENABLED) return false;
  try {
    const res = await fetch("/api/admin-session", { credentials: "include" });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

/** @returns {Promise<{ok: true} | {ok: false, error: string}>} */
export async function tempLogin(email, password) {
  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: data.error || "Incorrect email or password." };
  } catch {
    return { ok: false, error: "Couldn't reach the server. Try again." };
  }
}

export async function tempLogout() {
  try {
    await fetch("/api/admin-logout", { method: "POST", credentials: "include" });
  } catch {
    // Best-effort — the cookie will simply expire on its own otherwise.
  }
}
