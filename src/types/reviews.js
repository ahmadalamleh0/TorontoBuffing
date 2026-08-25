/**
 * Data model for the Google Reviews section.
 *
 * Source of truth today: Google Places API (Place Details), proxied
 * through our own backend so the API key + Place ID never reach the
 * client. Places only returns up to 5 "most relevant" reviews per
 * place, so `source: "manual"` entries (see src/data/manualReviews.js)
 * can be merged in alongside the live ones to fill out the grid.
 *
 * If/when we get owner access to the Google Business Profile API,
 * only reviewsService.js (and the backend) need to change — this
 * shape, and every component that consumes it, stays the same.
 *
 * @typedef {"google_places" | "manual"} ReviewSource
 *
 * @typedef {Object} Review
 * @property {string} id
 * @property {ReviewSource} source
 * @property {string} reviewerName
 * @property {string | null} reviewerPhoto
 * @property {string | null} reviewerProfileUrl - link to the reviewer's Google profile, when Google provides one
 * @property {number} rating - 1-5
 * @property {string} comment - empty string if the reviewer left a rating with no written text
 * @property {string | null} reviewImage - a single customer-uploaded photo attached to this review, when
 *   available. The Places API (New) does not reliably expose reviewer-uploaded media, so today this only
 *   ever comes from manually curated entries (see src/data/manualReviews.js) — never live. The Reviews
 *   section only features reviews that have one of these; drop the filter once a source that reliably
 *   supplies review photos (e.g. Business Profile API) is connected for every review.
 * @property {string | null} createTime - ISO 8601, when known
 * @property {string | null} updateTime - ISO 8601, when known
 * @property {string | null} reviewUrl - deep link to this specific review, when available
 *
 * @typedef {Object} ReviewsSummary
 * @property {number | null} averageRating
 * @property {number | null} totalReviewCount - the real total review count on Google, independent of how many `reviews` are rendered
 * @property {Review[]} reviews
 * @property {string | null} mapsUrl - link to the Toronto Buffing Google Maps listing
 * @property {string | null} writeReviewUrl - link that opens the "write a review" flow
 */

export {};
