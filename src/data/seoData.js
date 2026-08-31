import { SITE_URL, BUSINESS_INFO } from "./businessInfo";
import { FAQ_ITEMS } from "./faqData";

/**
 * Per-page <title>/description, centralized so every route's SEO copy
 * lives in one place. Titles follow the exact directions given;
 * descriptions are written from each page's actual on-page content —
 * nothing invented beyond what the page itself says.
 */
export const HOME_SEO = {
  title: "Toronto Buffing | Paint Correction, PPF & Ceramic Coating",
  description:
    "Toronto Buffing provides precision paint correction, ceramic coating and paint protection film (PPF) for vehicles across Vaughan and the GTA. Get your free quote.",
};

export const SERVICE_SEO = {
  ppf: {
    title: "Paint Protection Film (PPF) Toronto & Vaughan | Toronto Buffing",
    description:
      "PPF is a clear, self-healing physical barrier that protects paint from rock chips, scratches, UV exposure and environmental damage. See Toronto Buffing's PPF process, films and packages.",
  },
  "paint-correction": {
    title: "Paint Correction Toronto & Vaughan | Toronto Buffing",
    description:
      "Toronto Buffing removes swirls, scratches, oxidation and haze through multi-stage machine polishing and wet sanding, matched to your paint's actual condition — not a one-size fix.",
  },
  "ceramic-coating": {
    title: "Ceramic Coating Toronto & Vaughan | Toronto Buffing",
    description:
      "Professional ceramic coating from Toronto Buffing creates a durable, hydrophobic layer for lasting gloss, UV and chemical resistance — always applied after proper paint correction.",
  },
  "headlight-restoration": {
    title: "Headlight Restoration Toronto & Vaughan | Toronto Buffing",
    description:
      "Restore clarity to oxidized, yellowed, hazy or scratched headlight lenses with multi-stage wet sanding and polishing from Toronto Buffing, backed by a 2-year warranty.",
  },
  "paint-chip-repair": {
    title: "Paint Chip Repair Toronto & Vaughan | Toronto Buffing",
    description:
      "Toronto Buffing repairs paint chips before exposed metal or primer becomes a corrosion risk — basecoat, clearcoat and machine polishing, paired with correction, PPF or ceramic coating.",
  },
  "classic-restoration": {
    title: "Classic Car Paint Restoration | Toronto Buffing",
    description:
      "Bespoke paint preservation, correction and protection for classic and specialty vehicles, built around each car's actual condition — including Toronto Buffing's documented Supra restoration.",
  },
  "panel-refinishing": {
    title: "Automotive Panel Refinishing Toronto & Vaughan | Toronto Buffing",
    description:
      "When damage goes beyond what correction or chip repair can safely fix, Toronto Buffing refinishes panels with proper prep, colour matching and clearcoat to match the factory finish.",
  },
};

export function buildServiceSchema({ slug, seo, page }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.hero.title.replace(/\.$/, ""),
    description: seo.description,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "AutoRepair",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.telephone,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Vaughan" },
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    ],
  };
}

export function buildBreadcrumbSchema({ slug, title }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/services/${slug}` },
    ],
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    image: `${SITE_URL}/images/social/og-image.png`,
    url: SITE_URL,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: BUSINESS_INFO.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: BUSINESS_INFO.sameAs,
    areaServed: [
      { "@type": "City", name: "Vaughan" },
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    ],
  };
}

export function buildFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
