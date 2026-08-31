// Netlify Function -> GET /api/instagram-feed (rewritten from
// /.netlify/functions/instagram-feed via netlify.toml's existing
// /api/* redirect)
//
// Holds the only copy of the Instagram access token; it never reaches
// the browser. Calls the Instagram API (Instagram Login) for the
// connected Business/Creator account's own profile + latest media and
// normalizes both into the shape instagramService.js expects on the
// frontend.
//
// Requires INSTAGRAM_ACCESS_TOKEN — a long-lived Instagram User Access
// Token for a Business or Creator account, generated via Meta for
// Developers (Instagram API with Instagram Login product). Set it as
// a Netlify environment variable; never commit it.

const GRAPH_BASE = "https://graph.instagram.com";
const MEDIA_FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
const MEDIA_LIMIT = 8;

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
  };
}

function normalizePost(item) {
  return {
    id: item.id,
    caption: item.caption ?? null,
    mediaType: item.media_type ?? "IMAGE",
    // Videos have no static media_url worth showing in a photo grid —
    // use the thumbnail instead. Carousel albums' media_url is the
    // cover image, which is exactly what a grid needs.
    imageUrl: item.media_type === "VIDEO" ? (item.thumbnail_url ?? null) : (item.media_url ?? null),
    permalink: item.permalink ?? null,
    timestamp: item.timestamp ?? null,
  };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed." }, { Allow: "GET" });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("[netlify/functions/instagram-feed] Missing environment variable: INSTAGRAM_ACCESS_TOKEN.");
    return json(500, { error: "Instagram feed is temporarily unavailable." });
  }

  try {
    const [profileResponse, mediaResponse] = await Promise.all([
      fetch(`${GRAPH_BASE}/me?fields=username,profile_picture_url&access_token=${encodeURIComponent(accessToken)}`),
      fetch(
        `${GRAPH_BASE}/me/media?fields=${MEDIA_FIELDS}&limit=${MEDIA_LIMIT}&access_token=${encodeURIComponent(accessToken)}`,
      ),
    ]);

    if (!profileResponse.ok || !mediaResponse.ok) {
      const [profileBody, mediaBody] = await Promise.all([profileResponse.text(), mediaResponse.text()]);
      console.error(
        `[netlify/functions/instagram-feed] Instagram API request failed — profile status ` +
          `${profileResponse.status}, media status ${mediaResponse.status}. Profile body: ${profileBody}. ` +
          `Media body: ${mediaBody}`,
      );
      return json(502, { error: "Instagram feed is temporarily unavailable." });
    }

    const profile = await profileResponse.json();
    const media = await mediaResponse.json();

    // Short edge cache so we're not hitting the Instagram API on every
    // page load — new posts don't need to be second-by-second fresh.
    return json(
      200,
      {
        username: profile.username ?? null,
        profilePictureUrl: profile.profile_picture_url ?? null,
        posts: Array.isArray(media.data) ? media.data.map(normalizePost) : [],
      },
      { "Cache-Control": "s-maxage=1800, stale-while-revalidate=600" },
    );
  } catch (error) {
    console.error("[netlify/functions/instagram-feed] Unexpected error:", error);
    return json(500, { error: "Instagram feed is temporarily unavailable." });
  }
}
