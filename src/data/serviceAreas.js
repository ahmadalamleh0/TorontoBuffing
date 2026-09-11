/**
 * Single source of truth for the city links shown in the homepage
 * "Serving The Greater Toronto Area" section and the footer's Service
 * Areas column — edit this one file and both places update, per the
 * "don't duplicate city URL logic" rule.
 *
 * Every city now lives under the dedicated /service-areas/:slug
 * namespace (see App.jsx's SeoPage route and the seo_pages
 * `path_prefix` column) rather than the general /pages/:slug one.
 *
 * `published` is hand maintained, not a live query against Supabase —
 * matching how this project's geo content already works (scripts/
 * migrate-service-areas.mjs is the manually run source of truth for
 * what's actually live). Flip a city to true here ONLY after its page
 * has actually been published, or the link on the live site 404s.
 */
export const SERVICE_AREAS = [
  { title: "Vaughan", path: "/service-areas/vaughan", published: true },
  { title: "Markham", path: "/service-areas/markham", published: true },
  { title: "Richmond Hill", path: "/service-areas/richmond-hill", published: true },
  { title: "Woodbridge", path: "/service-areas/woodbridge", published: true },
  { title: "Maple", path: "/service-areas/maple", published: true },
  { title: "Thornhill", path: "/service-areas/thornhill", published: true },
  { title: "Toronto", path: "/service-areas/toronto", published: true },
  { title: "North York", path: "/service-areas/north-york", published: true },
  { title: "Etobicoke", path: "/service-areas/etobicoke", published: true },
  { title: "Mississauga", path: "/service-areas/mississauga", published: true },
  { title: "Brampton", path: "/service-areas/brampton", published: true },
  { title: "Oakville", path: "/service-areas/oakville", published: true },
];
