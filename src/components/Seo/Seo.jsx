import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../data/businessInfo";

// Versioned filename (see index.html's icon links for why) — Safari
// and link-preview crawlers cache these aggressively per URL.
const DEFAULT_IMAGE = `${SITE_URL}/images/social/og-image-v2.png`;

// Hostnames search engines should treat as "this is the real site."
// Configurable (VITE_PRODUCTION_HOSTNAMES, comma-separated) rather
// than hardcoded to any one host's naming convention — a hosting
// provider's preview-deployment domain (*.netlify.app, *.vercel.app,
// *.pages.dev, ...) is never in this list, so it never needs to be
// special-cased by name. Defaults to SITE_URL's own hostname when
// unset, so this works correctly with zero config on the one
// production domain.
const PRODUCTION_HOSTNAMES = (import.meta.env.VITE_PRODUCTION_HOSTNAMES || new URL(SITE_URL).hostname)
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

/**
 * Per-page <head> metadata: title, description, canonical, Open
 * Graph/Twitter tags, and optional JSON-LD structured data. This is a
 * client-side-rendered SPA (no SSR/prerendering), so these tags are
 * reliably read by crawlers that execute JavaScript (Googlebot,
 * Bingbot) but NOT by non-JS social-media unfurlers (e.g. an iMessage/
 * WhatsApp/Slack preview of a deep link) — those fall back to the
 * static defaults in index.html. That's an inherent SPA limitation,
 * not something this component can fix without a prerender/SSR step.
 *
 * @param {{
 *   title: string,
 *   description: string,
 *   path: string,          // e.g. "/" or "/services/ppf"
 *   image?: string,        // absolute URL; defaults to the site's og-image
 *   type?: "website" | "article",
 *   noIndex?: boolean,
 *   jsonLd?: object | object[],
 *   ogTitle?: string,       // defaults to `title` if not set — an optional CMS override
 *   ogDescription?: string, // defaults to `description` if not set — an optional CMS override
 *   canonical?: string,     // absolute or root-relative URL; defaults to this page's own clean URL
 * }} props
 */
function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  jsonLd,
  ogTitle,
  ogDescription,
  canonical,
}) {
  const url = `${SITE_URL}${path}`;
  const canonicalUrl = canonical ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`) : url;
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  // Prevent any non-production deployment (preview builds, staging,
  // localhost — on whatever host is current) from competing with
  // production in search results, while ensuring every hostname
  // listed in PRODUCTION_HOSTNAMES indexes normally.
  const isPreview =
    typeof window !== "undefined" && !PRODUCTION_HOSTNAMES.includes(window.location.hostname);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : isPreview ? (
        <meta name="robots" content="noindex, follow" />
      ) : null}

      {/* Open Graph — og:url follows the canonical override too, since
          they're both meant to name the one "real" URL for this content. */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="Toronto Buffing" />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${resolvedOgTitle} — Toronto Buffing`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${resolvedOgTitle} — Toronto Buffing`} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
