-- ============================================================================
-- TEMPORARY client-review bypass — run the "ENABLE" block below once in the
-- Supabase SQL Editor (Dashboard -> SQL Editor -> New query) to let /admin
-- work with full read/write access without anyone signing in through Clerk.
--
-- WHY THIS IS NEEDED: every write in this CMS is gated by
-- private.is_admin(), which checks the signed-in Clerk user's id against one
-- allow-listed admin (see schema.sql). The site's Supabase anon key is
-- public (shipped in the browser bundle for the live public site to work at
-- all), so skipping Clerk sign-in in the app's own UI does nothing on its
-- own — real writes still require is_admin() to return true. This file is
-- what actually flips that on.
--
-- REAL SECURITY IMPACT WHILE ENABLED: is_admin() returning true
-- unconditionally means ANYONE with the site's public anon key — not just
-- people who visit /admin, but anyone calling the Supabase REST API
-- directly — can create, edit, and delete every row in the tables listed
-- below, and upload/replace/delete files in the "media" storage bucket.
-- This is a real, live vulnerability on the production database for as
-- long as it's enabled, not a cosmetic admin convenience. Run the RESTORE
-- block the moment the client review is done.
--
-- Scope: only the private.is_admin() check itself changes. Nothing else in
-- schema.sql is touched, and this file makes no changes of its own to any
-- table, row, or column.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- ENABLE (run this now)
-- ---------------------------------------------------------------------------
create or replace function private.is_admin()
returns boolean
language sql
stable
as $$
  select true;
$$;


-- ---------------------------------------------------------------------------
-- RESTORE (run this to turn real authentication back on — re-locks every
-- write policy in schema.sql back down to the one allow-listed Clerk admin)
-- ---------------------------------------------------------------------------
-- create or replace function private.is_admin()
-- returns boolean
-- language sql
-- stable
-- as $$
--   select coalesce(auth.jwt() ->> 'sub', '') = 'user_3J6uMfGmbNZQZbQyWMRkXphPe7X';
-- $$;
