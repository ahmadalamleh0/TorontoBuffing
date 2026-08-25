// Netlify Function -> GET /api/google-reviews (rewritten from
// /.netlify/functions/google-reviews via netlify.toml)
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
    // Places API (New) doesn't reliably expose reviewer-uploaded review
    // photos — never fabricate one from unrelated business photography.
    // Swap this for the real field once a source that exposes review
    // media (e.g. Business Profile API) is connected.
    reviewImage: null,
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

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed." }, { Allow: "GET" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.TORONTO_BUFFING_PLACE_ID;

  if (!apiKey || !placeId) {
    const missing = [!apiKey && "GOOGLE_PLACES_API_KEY", !placeId && "TORONTO_BUFFING_PLACE_ID"]
      .filter(Boolean)
      .join(", ");
    console.error(`[netlify/functions/google-reviews] Missing environment variable(s): ${missing}.`);
    return json(500, { error: "Reviews are temporarily unavailable." });
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
      console.error(
        `[netlify/functions/google-reviews] Places API request failed — status ${placesResponse.status} ` +
          `for placeId "${placeId}". Response body: ${errorBody}`,
      );
      return json(502, { error: "Reviews are temporarily unavailable." });
    }

    const place = await placesResponse.json();

    // Short edge cache so we're not hitting Places on every page load —
    // the review data doesn't need to be second-by-second fresh.
    return json(200, normalizePlaceDetails(place), {
      "Cache-Control": "s-maxage=900, stale-while-revalidate=300",
    });
  } catch (error) {
    console.error(
      `[netlify/functions/google-reviews] Unexpected error while fetching placeId "${placeId}":`,
      error,
    );
    return json(500, { error: "Reviews are temporarily unavailable." });
  }
}
