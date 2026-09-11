/**
 * Slug rules shared by the SEO Pages admin form and its Supabase
 * uniqueness check — kept in one place so "what makes a slug valid"
 * can't drift between the client-side check and the DB constraint.
 */

// Route segments the app already uses (or reserves for itself) at the
// root level. A new SEO page slug can't collide with any of these or
// its /pages/:slug route would shadow — or be shadowed by — a real
// route. Existing service ids are checked separately (live, against
// the `services` table) since that list can change.
export const RESERVED_SLUGS = [
  "admin",
  "api",
  "services",
  "insights",
  "pages",
  "p",
  "sitemap.xml",
  "robots.txt",
  "404",
  "index",
  "home",
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input) {
  return String(input ?? "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** @returns {string | null} an error message, or null if the slug is well-formed. */
export function validateSlugFormat(slug) {
  if (!slug) return "Slug is required.";
  if (!SLUG_PATTERN.test(slug)) {
    return "Slug can only contain lowercase letters, numbers and hyphens (e.g. \"ceramic-coating-faq\").";
  }
  if (RESERVED_SLUGS.includes(slug)) {
    return `"${slug}" is a reserved route and can't be used as a page slug.`;
  }
  return null;
}
