/**
 * @typedef {import('../types/reviews').ReviewsSummary} ReviewsSummary
 * @typedef {import('../types/reviews').Review} Review
 */

// Same-origin route. The backend (not this frontend) holds the Google
// Places API key and Toronto Buffing's Place ID, calls Place Details,
// and returns already-normalized JSON in the shape below. No Google
// credentials, keys, or Place IDs live in frontend code — the key
// should also be restricted (HTTP referrer / API restrictions) on the
// Google Cloud side.
//
// Swapping to the Google Business Profile API later (once we have
// owner access) only changes what this endpoint does server-side —
// the response contract, and everything below, stays the same.
const REVIEWS_ENDPOINT = "/api/google-reviews";

/**
 * Fetches live Google review data for Toronto Buffing.
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<ReviewsSummary>}
 */
export async function fetchGoogleReviews({ signal } = {}) {
  const response = await fetch(REVIEWS_ENDPOINT, { signal });

  if (!response.ok) {
    throw new Error(`Failed to load Google reviews (${response.status})`);
  }

  const data = await response.json();
  return normalizeReviewsResponse(data);
}

/** @returns {ReviewsSummary} */
function normalizeReviewsResponse(data) {
  return {
    averageRating: data.averageRating ?? null,
    totalReviewCount: data.totalReviewCount ?? null,
    mapsUrl: data.mapsUrl ?? null,
    writeReviewUrl: data.writeReviewUrl ?? null,
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map((review) => normalizeReview(review, "google_places"))
      : [],
  };
}

/**
 * @param {Record<string, unknown>} review
 * @param {import('../types/reviews').ReviewSource} source
 * @returns {Review}
 */
export function normalizeReview(review, source) {
  return {
    id: String(review.id ?? `${source}-${review.reviewerName ?? "review"}-${review.createTime ?? Math.random()}`),
    source,
    reviewerName: review.reviewerName ?? "Google User",
    reviewerPhoto: review.reviewerPhoto ?? null,
    reviewerProfileUrl: review.reviewerProfileUrl ?? null,
    rating: Number(review.rating ?? 0),
    comment: review.comment ?? "",
    reviewPhoto: review.reviewPhoto ?? null,
    createTime: review.createTime ?? null,
    updateTime: review.updateTime ?? null,
    reviewUrl: review.reviewUrl ?? null,
  };
}

/**
 * Merges the live Places reviews (max 5) with manually curated real
 * reviews so the grid isn't limited to whatever Places returns.
 * Manual entries are kept as a clearly separate source (see
 * src/data/manualReviews.js) so this merge step is easy to drop once
 * the Business Profile API can supply every review live.
 *
 * @param {ReviewsSummary} liveSummary
 * @param {Record<string, unknown>[]} manualReviews
 * @returns {ReviewsSummary}
 */
export function mergeManualReviews(liveSummary, manualReviews = []) {
  const normalizedManual = manualReviews.map((review) => normalizeReview(review, "manual"));

  return {
    ...liveSummary,
    reviews: [...liveSummary.reviews, ...normalizedManual],
  };
}

/**
 * Curates a small, strong set of reviews for the premium featured-review
 * grid, rather than rendering every review that comes back. Reviews with
 * a customer-attached photo (see reviewPhoto on the Review type) are
 * prioritized first; the remaining slots are filled with the
 * highest-rated, most substantial written reviews. Reviews with no
 * written text are dropped entirely — a star-only rating gives visitors
 * nothing to read in this card layout.
 *
 * @param {import('../types/reviews').Review[]} reviews
 * @param {number} [max]
 * @returns {import('../types/reviews').Review[]}
 */
export function selectFeaturedReviews(reviews, max = 8) {
  const withText = reviews.filter((review) => review.comment?.trim());
  const withPhoto = withText.filter((review) => review.reviewPhoto);
  const withoutPhoto = withText
    .filter((review) => !review.reviewPhoto)
    .sort((a, b) => b.rating - a.rating || b.comment.length - a.comment.length);

  return [...withPhoto, ...withoutPhoto].slice(0, max);
}
