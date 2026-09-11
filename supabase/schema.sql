-- Toronto Buffing CMS schema
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: every statement is idempotent (create-if-not-exists / or-replace).

-- ============================================================================
-- 0. One-time setup you must do by hand (SQL can't do these two):
--
--   a) Dashboard -> Authentication -> Sign In / Providers -> Third Party Auth
--      -> add Clerk, paste your Clerk "Frontend API URL" (Clerk Dashboard ->
--      API Keys -> Advanced -> Frontend API URL, looks like
--      https://xxxx.clerk.accounts.dev). This is what lets Supabase trust
--      Clerk session tokens directly — no custom auth relay needed.
--
--   b) Below, replace 'REPLACE_WITH_CLERK_ADMIN_USER_ID' with the Clerk
--      user id (starts "user_...", found in Clerk Dashboard -> Users ->
--      your account -> "User ID") of the ONE person allowed to write CMS
--      content. Every write policy in this file checks against it.
-- ============================================================================

create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'sub', '') = 'user_3J6uMfGmbNZQZbQyWMRkXphPe7X';
$$;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- 1. Tables
-- ============================================================================

-- Singleton homepage copy. Only one row is ever expected: slug = 'home'.
create table if not exists public.pages (
  slug text primary key,
  hero jsonb not null default '{}'::jsonb,            -- { eyebrow, headline, subline }
  brand_statement jsonb not null default '{}'::jsonb,  -- { headline, copy }
  stats jsonb not null default '[]'::jsonb,            -- [{ value, suffix, useLocaleString, label }]
  text_reveal jsonb not null default '{}'::jsonb,      -- { eyebrow, title, bodyLead, bodyEmphasis }
  image_banner jsonb not null default '{}'::jsonb,     -- { imageUrl, alt }
  seo_title text,
  seo_description text,
  og_image_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  card_image_url text,
  hero jsonb not null default '{}'::jsonb,     -- { title, copy, image_url, image_alt, centered, titleNoWrap }
  sections jsonb not null default '[]'::jsonb, -- [{ type, ...fields }] — see src/pages/ServicePage/ServiceSections.jsx
  cta jsonb not null default '{}'::jsonb,      -- { heading, buttonLabel }
  seo_title text,
  seo_description text,
  og_image_url text,
  tier text not null default 'supporting' check (tier in ('featured', 'supporting', 'unlisted')),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  vehicle text not null,
  services_performed text[] not null default '{}',
  description text,
  image_urls text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  review_text text not null,
  reviewer_image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  hero jsonb not null default '{}'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  og_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Which top-level route this page is served under. Every page defaults
-- to the general 'pages' namespace (/pages/:slug); location pages live
-- under /service-areas/:slug, and educational articles live under
-- /insights/:slug (see App.jsx's SeoPage routes and
-- fetchSeoPageBySlug's pathPrefix argument) — a page only renders
-- under the route matching its own path_prefix, so the same content
-- can never end up live at two different URLs.
alter table public.seo_pages add column if not exists path_prefix text not null default 'pages'
  check (path_prefix in ('pages', 'service-areas'));

alter table public.seo_pages drop constraint if exists seo_pages_path_prefix_check;
alter table public.seo_pages add constraint seo_pages_path_prefix_check
  check (path_prefix in ('pages', 'service-areas', 'insights'));

-- Insights-specific fields (only meaningful when path_prefix = 'insights',
-- but kept as plain nullable columns on the same table rather than a
-- separate one — reusing the existing seo_pages infrastructure end to
-- end: same hero/sections block system, same RLS, same slug-change
-- machinery, same admin editor).
alter table public.seo_pages add column if not exists category text;
alter table public.seo_pages add column if not exists excerpt text;
alter table public.seo_pages add column if not exists cover_image_url text;
alter table public.seo_pages add column if not exists related_service text;
alter table public.seo_pages add column if not exists featured boolean not null default false;
alter table public.seo_pages add column if not exists display_order integer not null default 0;

-- Which /services/:slug page(s) a homepage FAQ question is also
-- relevant to (empty = homepage only, e.g. General/Pricing). Reuses
-- the same faqs row and RLS the homepage already reads — a service
-- page's FAQ block is a filtered view of this same data, not a copy,
-- so editing a question here updates both places at once.
alter table public.faqs add column if not exists services text[] not null default '{}'::text[];

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  created_at timestamptz not null default now()
);

-- Old URL -> new URL, served as a real HTTP redirect by
-- netlify/edge-functions/redirects.js via the portable
-- server/resolveRedirect.js (checked on effectively every request —
-- see netlify.toml's excludedPath list for what's skipped). `source`
-- distinguishes redirects the admin created by hand from the ones
-- auto-created atomically when a published Service/SEO Page's slug is
-- changed (see change_service_slug / change_seo_page_slug below).
--
-- `from_host` is optional and exists to prepare for a future old
-- subdomain (or entirely different legacy domain) migration: null
-- means "match this path on any host this deployment answers to" —
-- almost every row today. A non-null value only ever takes effect
-- once that host's DNS is actually pointed at this deployment (or
-- added as a domain alias on whatever host is current) — that's
-- infrastructure work outside this database, not something a redirect
-- row can cause by itself. Do not set from_host on a domain that
-- isn't already routed here.
create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_host text,
  from_path text not null,
  to_path text not null,
  redirect_type smallint not null default 301 check (redirect_type in (301, 302)),
  active boolean not null default true,
  source text not null default 'manual' check (source in ('manual', 'auto')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migrating from an earlier version of this schema that only had
-- from_path (no from_host): add the column if it isn't already there.
alter table public.redirects add column if not exists from_host text;

-- Only one *active* redirect may claim a given (host-or-any, path)
-- pair at a time — coalesce() so every "any host" row (from_host is
-- null) is compared against every other "any host" row for the same
-- path, while a host-specific row for that same path can coexist
-- alongside it (a more specific match always wins at lookup time, see
-- server/resolveRedirect.js). Replaces the earlier from_path-only
-- index, which didn't account for from_host.
drop index if exists public.redirects_active_from_path_key;
create unique index if not exists redirects_active_from_host_path_key
  on public.redirects (coalesce(from_host, ''), from_path) where active = true;

-- ============================================================================
-- 1a. SEO fields — added on top of the original per-page columns.
-- OG title/description are optional overrides (blank = reuse the meta
-- title/description); canonical_url is an optional override (blank =
-- the page's own clean URL, which is correct for almost every page).
-- noindex only makes sense on pages that can legitimately be excluded
-- from search while still existing/being linkable — not on the
-- homepage, so it isn't added there.
-- ============================================================================

alter table public.pages add column if not exists og_title text;
alter table public.pages add column if not exists og_description text;
alter table public.pages add column if not exists canonical_url text;

alter table public.services add column if not exists og_title text;
alter table public.services add column if not exists og_description text;
alter table public.services add column if not exists canonical_url text;
alter table public.services add column if not exists noindex boolean not null default false;

alter table public.seo_pages add column if not exists og_title text;
alter table public.seo_pages add column if not exists og_description text;
alter table public.seo_pages add column if not exists canonical_url text;
alter table public.seo_pages add column if not exists noindex boolean not null default false;

-- updated_at triggers
drop trigger if exists set_updated_at on public.pages;
create trigger set_updated_at before update on public.pages
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.services;
create trigger set_updated_at before update on public.services
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.projects;
create trigger set_updated_at before update on public.projects
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.reviews;
create trigger set_updated_at before update on public.reviews
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.faqs;
create trigger set_updated_at before update on public.faqs
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.seo_pages;
create trigger set_updated_at before update on public.seo_pages
  for each row execute function private.set_updated_at();

drop trigger if exists set_updated_at on public.redirects;
create trigger set_updated_at before update on public.redirects
  for each row execute function private.set_updated_at();

create index if not exists services_sort_order_idx on public.services (tier, sort_order);
create index if not exists projects_sort_order_idx on public.projects (sort_order);
create index if not exists reviews_sort_order_idx on public.reviews (sort_order);
create index if not exists faqs_sort_order_idx on public.faqs (category, sort_order);
create index if not exists redirects_created_at_idx on public.redirects (created_at desc);

-- ============================================================================
-- 2. Row Level Security
-- ============================================================================

alter table public.pages enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;
alter table public.seo_pages enable row level security;
alter table public.media_assets enable row level security;
alter table public.redirects enable row level security;

-- pages: always publicly readable (it's the live homepage), admin-only writes.
drop policy if exists "pages_select_all" on public.pages;
create policy "pages_select_all" on public.pages for select using (true);
drop policy if exists "pages_write_admin" on public.pages;
create policy "pages_write_admin" on public.pages for all
  using (private.is_admin()) with check (private.is_admin());

-- services / projects / reviews / faqs / seo_pages: public can only see
-- published rows; the admin (identified by Clerk JWT) sees and writes everything.
drop policy if exists "services_select_published" on public.services;
create policy "services_select_published" on public.services for select
  using (published = true or private.is_admin());
drop policy if exists "services_write_admin" on public.services;
create policy "services_write_admin" on public.services for all
  using (private.is_admin()) with check (private.is_admin());

drop policy if exists "projects_select_published" on public.projects;
create policy "projects_select_published" on public.projects for select
  using (published = true or private.is_admin());
drop policy if exists "projects_write_admin" on public.projects;
create policy "projects_write_admin" on public.projects for all
  using (private.is_admin()) with check (private.is_admin());

drop policy if exists "reviews_select_published" on public.reviews;
create policy "reviews_select_published" on public.reviews for select
  using (published = true or private.is_admin());
drop policy if exists "reviews_write_admin" on public.reviews;
create policy "reviews_write_admin" on public.reviews for all
  using (private.is_admin()) with check (private.is_admin());

drop policy if exists "faqs_select_published" on public.faqs;
create policy "faqs_select_published" on public.faqs for select
  using (published = true or private.is_admin());
drop policy if exists "faqs_write_admin" on public.faqs;
create policy "faqs_write_admin" on public.faqs for all
  using (private.is_admin()) with check (private.is_admin());

drop policy if exists "seo_pages_select_published" on public.seo_pages;
create policy "seo_pages_select_published" on public.seo_pages for select
  using (published = true or private.is_admin());
drop policy if exists "seo_pages_write_admin" on public.seo_pages;
create policy "seo_pages_write_admin" on public.seo_pages for all
  using (private.is_admin()) with check (private.is_admin());

-- media_assets: just filename/alt-text metadata for already-public images —
-- fine to expose the list, still admin-only to add/remove entries.
drop policy if exists "media_assets_select_all" on public.media_assets;
create policy "media_assets_select_all" on public.media_assets for select using (true);
drop policy if exists "media_assets_write_admin" on public.media_assets;
create policy "media_assets_write_admin" on public.media_assets for all
  using (private.is_admin()) with check (private.is_admin());

-- redirects: the edge function reads this with the public anon key
-- (no session), so active redirects must be publicly selectable —
-- there's no sensitive data in a URL-to-URL mapping. Writes stay admin-only.
drop policy if exists "redirects_select_active" on public.redirects;
create policy "redirects_select_active" on public.redirects for select
  using (active = true or private.is_admin());
drop policy if exists "redirects_write_admin" on public.redirects;
create policy "redirects_write_admin" on public.redirects for all
  using (private.is_admin()) with check (private.is_admin());

-- ============================================================================
-- 2a. Atomic slug-change operations
--
-- Changing a published page's slug and recording the old->new redirect
-- must happen together or not at all — a partial result (slug moved,
-- no redirect; or a failed redirect insert that leaves an admin
-- thinking nothing happened when the slug actually did change) is
-- exactly the bug these two functions exist to make impossible.
--
-- Both are `security invoker` (the default — never SECURITY DEFINER,
-- so no privilege escalation is introduced): every statement inside
-- still runs as the calling role, so the *same* RLS policies above
-- (services_write_admin / seo_pages_write_admin / redirects_write_admin)
-- still gate every write exactly as if the caller ran them directly.
-- A Postgres function body is one implicit transaction, so if the
-- redirect insert fails (e.g. the old path already has an active
-- redirect elsewhere — the unique index above), the slug update in
-- the SAME call is rolled back too. On top of that, each function
-- also explicitly checks private.is_admin() as its very first
-- statement and raises immediately for anyone else — belt-and-braces
-- on top of RLS, and much easier to audit at a glance than relying on
-- RLS's row-filtering behavior alone.
-- ============================================================================

create or replace function public.change_service_slug(p_id uuid, p_new_slug text)
returns public.services
language plpgsql
security invoker
as $$
declare
  v_old_slug text;
  v_published boolean;
  v_result public.services;
begin
  if not private.is_admin() then
    raise exception 'Not authorized.' using errcode = '42501';
  end if;

  select slug, published into v_old_slug, v_published from public.services where id = p_id;
  if v_old_slug is null then
    raise exception 'Service % not found', p_id;
  end if;

  update public.services set slug = p_new_slug where id = p_id
    returning * into v_result;

  if v_old_slug <> p_new_slug and v_published then
    begin
      insert into public.redirects (from_path, to_path, redirect_type, source, active)
      values ('/services/' || v_old_slug, '/services/' || p_new_slug, 301, 'auto', true);
    exception when unique_violation then
      raise exception 'The old URL /services/% already has an active redirect elsewhere. Deactivate it in Redirects first, then try again.', v_old_slug;
    end;
  end if;

  return v_result;
end;
$$;

revoke all on function public.change_service_slug(uuid, text) from public;
grant execute on function public.change_service_slug(uuid, text) to authenticated;

create or replace function public.change_seo_page_slug(p_id uuid, p_new_slug text)
returns public.seo_pages
language plpgsql
security invoker
as $$
declare
  v_old_slug text;
  v_published boolean;
  v_result public.seo_pages;
begin
  if not private.is_admin() then
    raise exception 'Not authorized.' using errcode = '42501';
  end if;

  select slug, published into v_old_slug, v_published from public.seo_pages where id = p_id;
  if v_old_slug is null then
    raise exception 'SEO page % not found', p_id;
  end if;

  update public.seo_pages set slug = p_new_slug where id = p_id
    returning * into v_result;

  if v_old_slug <> p_new_slug and v_published then
    begin
      insert into public.redirects (from_path, to_path, redirect_type, source, active)
      values ('/pages/' || v_old_slug, '/pages/' || p_new_slug, 301, 'auto', true);
    exception when unique_violation then
      raise exception 'The old URL /pages/% already has an active redirect elsewhere. Deactivate it in Redirects first, then try again.', v_old_slug;
    end;
  end if;

  return v_result;
end;
$$;

revoke all on function public.change_seo_page_slug(uuid, text) from public;
grant execute on function public.change_seo_page_slug(uuid, text) to authenticated;

-- ============================================================================
-- 3. Storage: one public bucket for all CMS-uploaded images
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_bucket_public_read" on storage.objects;
create policy "media_bucket_public_read" on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "media_bucket_admin_write" on storage.objects;
create policy "media_bucket_admin_write" on storage.objects for insert
  with check (bucket_id = 'media' and private.is_admin());

drop policy if exists "media_bucket_admin_update" on storage.objects;
create policy "media_bucket_admin_update" on storage.objects for update
  using (bucket_id = 'media' and private.is_admin());

drop policy if exists "media_bucket_admin_delete" on storage.objects;
create policy "media_bucket_admin_delete" on storage.objects for delete
  using (bucket_id = 'media' and private.is_admin());
