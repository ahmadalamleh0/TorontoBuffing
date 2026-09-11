-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New
-- query) after creating the temporary Clerk reviewer account (see the
-- Clerk Dashboard steps in chat). Grants that account the same full CMS
-- admin access the original account has, without removing the original.
--
-- Replace REPLACE_WITH_NEW_USER_ID below with the new user's Clerk User ID
-- (Clerk Dashboard -> Users -> click the info@torontobuffing.com user ->
-- "User ID", starts with "user_").

create or replace function private.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'sub', '') in (
    'user_3J6uMfGmbNZQZbQyWMRkXphPe7X',  -- Ahmed (original admin)
    'REPLACE_WITH_NEW_USER_ID'            -- temporary reviewer account (info@torontobuffing.com)
  );
$$;

-- To remove the temporary reviewer account's access later (once Chris's
-- permanent account replaces it), just delete its line above and re-run
-- this statement — or run this to go back to a single admin:
--
-- create or replace function private.is_admin()
-- returns boolean
-- language sql
-- stable
-- as $$
--   select coalesce(auth.jwt() ->> 'sub', '') = 'user_3J6uMfGmbNZQZbQyWMRkXphPe7X';
-- $$;
