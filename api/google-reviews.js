// Vercel serverless function -> GET /api/google-reviews
//
// Holds the only copy of the Google Places API key and Toronto
// Buffing's Place ID; neither ever reaches the browser. Calls Place
// Details (Places API New) and normalizes the result into exactly the
// shape reviewsService.js already expects on the frontend, so the UI
// never needs to know this is Places today vs. Business Profile later.

const PLACES_FIELD_MASK = "rating,userRatingCount,reviews,googleMapsLinks";

function placeDetailsUrl(placeId) {
  return `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
}

function normalizeGoogleReview(review) {
  return {
    id: review.name ?? null,
    reviewerName: review.authorAttribution?.displayName ?? "Google User",
    reviewerPhoto: review.authorAttribution?.photoUri ?? null,
    reviewerProfileUrl: review.authorAttribution?.uri ?? null,
    rating: typeof review.rating === "number" ? review.rating : 0,
    comment: review.text?.text ?? review.originalText?.text ?? "",
    createTime: review.publishTime ?? null,
    updateTime: null,
    reviewUrl: null,
  };
}

function normalizePlaceDetails(place) {
  return {
    averageRating: typeof place.rating === "number" ? place.rating : null,
    totalReviewCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
    mapsUrl: place.googleMapsLinks?.reviewsUri ?? place.googleMapsLinks?.placeUri ?? null,
    writeReviewUrl: place.googleMapsLinks?.writeAReviewUri ?? null,
    reviews: Array.isArray(place.reviews) ? place.reviews.map(normalizeGoogleReview) : [],
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.TORONTO_BUFFING_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error(
      "[api/google-reviews] Missing GOOGLE_PLACES_API_KEY or TORONTO_BUFFING_PLACE_ID environment variable.",
    );
    return res.status(500).json({ error: "Reviews are temporarily unavailable." });
  }

  try {
    const placesResponse = await fetch(placeDetailsUrl(placeId), {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": PLACES_FIELD_MASK,
      },
    });

    if (!placesResponse.ok) {
      const errorBody = await placesResponse.text();
      console.error(`[api/google-reviews] Places API ${placesResponse.status}: ${errorBody}`);
      return res.status(502).json({ error: "Reviews are temporarily unavailable." });
    }

    const place = await placesResponse.json();

    // Short edge cache so we're not hitting Places on every page load —
    // the review data doesn't need to be second-by-second fresh.
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=300");
    return res.status(200).json(normalizePlaceDetails(place));
  } catch (error) {
    console.error("[api/google-reviews] Unexpected error:", error);
    return res.status(500).json({ error: "Reviews are temporarily unavailable." });
  }
}
