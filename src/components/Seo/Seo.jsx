import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../data/businessInfo";

const DEFAULT_IMAGE = `${SITE_URL}/images/social/og-image.png`;

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
 * }} props
 */
function Seo({ title, description, path, image = DEFAULT_IMAGE, type = "website", noIndex = false, jsonLd }) {
  const url = `${SITE_URL}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Toronto Buffing" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
