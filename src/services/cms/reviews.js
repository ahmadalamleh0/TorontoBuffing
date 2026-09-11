import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Maps a `reviews` row onto the exact shape
 * src/data/manualReviews.js's MANUAL_REVIEWS array already uses, so
 * reviewsService.mergeManualReviews / normalizeReview need zero
 * changes. Every CMS-managed review is treated as 5-star — the same
 * as every entry in manualReviews.js today — since a star rating for
 * curated reviews wasn't part of the requested CMS fields.
 */
function toManualReviewShape(row) {
  return {
    reviewerName: row.reviewer_name,
    rating: 5,
    comment: row.review_text,
    reviewImage: row.reviewer_image_url || null,
  };
}

/**
 * Fetches every published curated review in display order. Returns
 * null on failure/not-configured so GoogleReviewsSection falls back
 * to the bundled manualReviews.js instead of losing the curated cards.
 */
export async function fetchPublishedReviews() {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[cms/reviews] fetchPublishedReviews failed:", error);
    return null;
  }

  return data.map(toManualReviewShape);
}
