/**
 * Toronto Buffing's business location.
 *
 * Coordinates were geocoded from the street address (not hand-typed),
 * so double check them against the real Google Business listing once
 * it's available. mapsUrl / directionsUrl use Google's query-based
 * deep link format, which works without a Place ID — swap in the
 * real Place ID-based links (e.g. from the reviews backend's
 * googleMapsLinks) once known, for a more precise "this exact
 * listing" link.
 */
export const BUSINESS_LOCATION = {
  name: "Toronto Buffing Inc.",
  addressLine: "99 Rodinea Rd Unit 14, Vaughan, ON L6A 1R3",
  lat: 43.8726035,
  lng: -79.5087235,
  zoom: 17,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Toronto+Buffing+Inc,+99+Rodinea+Rd+Unit+14,+Vaughan,+ON+L6A+1R3",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=99+Rodinea+Rd+Unit+14,+Vaughan,+ON+L6A+1R3,+Canada",
};
