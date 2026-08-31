/**
 * Single source of truth for business facts used in structured data
 * (JSON-LD) and page metadata. Values are copied verbatim from what's
 * already displayed on the live site (Footer, LocationSection,
 * NovaNavbar) — nothing here is invented. If the visible site copy
 * changes, update it here too so schema stays in sync.
 */
export const SITE_URL = "https://paintcorrection.ca";

export const BUSINESS_INFO = {
  name: "Toronto Buffing Inc.",
  legalName: "Toronto Buffing Inc.",
  telephone: "+1-647-985-8630",
  telephoneDisplay: "(647) 985-8630",
  email: "info@torontobuffing.com",
  url: SITE_URL,
  address: {
    streetAddress: "99 Rodinea Road, Unit 14",
    addressLocality: "Vaughan",
    addressRegion: "ON",
    postalCode: "L6A 1E9",
    addressCountry: "CA",
  },
  geo: {
    latitude: 43.8726035,
    longitude: -79.5087235,
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/torontobuffing",
    "https://www.tiktok.com/@torontobuffing",
    "https://www.youtube.com/torontobuffing",
    "https://www.facebook.com/torontobuffing",
  ],
};
