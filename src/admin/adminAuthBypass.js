/**
 * ============================================================================
 * TEMPORARY — Clerk sign-in bypass for /admin (client review)
 * ============================================================================
 * While true, AdminApp.jsx's RequireAdmin skips the Clerk sign-in
 * requirement entirely, so /admin opens straight to the full working CMS
 * for anyone, no login screen.
 *
 * This flag ONLY controls the app's own UI gate. It does nothing to
 * Supabase itself — every write still runs through the normal
 * supabaseAdmin client and is still checked by RLS's private.is_admin()
 * (see supabase/schema.sql). For writes to actually succeed without
 * anyone signing in, private.is_admin() ALSO has to be temporarily
 * changed — see supabase/TEMPORARY-admin-bypass.sql for that half (it has
 * to be run by hand in the Supabase SQL Editor; this app has no
 * credentials that can execute DDL).
 *
 * TO REVERT: set this back to false, AND run the "RESTORE" block in
 * supabase/TEMPORARY-admin-bypass.sql. Both halves need to be undone —
 * reverting only this file leaves the database still open to
 * unauthenticated writes; reverting only the SQL leaves /admin unusable
 * (redirects to a Clerk sign-in that no one but the real allow-listed
 * admin can complete).
 * ============================================================================
 */
export const ADMIN_AUTH_BYPASS = true;
