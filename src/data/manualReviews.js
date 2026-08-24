/**
 * Real, manually-entered Google reviews for Toronto Buffing.
 *
 * Google Places API only returns up to 5 "most relevant" reviews per
 * place — this file exists to supplement those with additional real
 * reviews (copied verbatim from Google) so the grid isn't limited to
 * 5 cards. These are merged with the live API reviews in
 * reviewsService.mergeManualReviews, tagged with source: "manual" so
 * the two stay clearly distinguishable in the data layer.
 *
 * Do not paraphrase or edit review text — copy it exactly as written
 * on Google, per Google's review attribution requirements.
 *
 * Google Places API (New) doesn't reliably expose customer-uploaded
 * review photos, so the featured-review grid (see
 * reviewsService.selectFeaturedReviews) can only ever show them for
 * entries added here. To feature a photo on a review, add a
 * `reviewPhoto` key (an imported image, same as any other asset
 * import) alongside the review's other fields below.
 *
 * Currently empty — add entries here as real reviews are collected.
 * Shape matches the `reviewerName`/`rating`/`comment`/... fields
 * normalizeReview() expects.
 */
export const MANUAL_REVIEWS = [];
