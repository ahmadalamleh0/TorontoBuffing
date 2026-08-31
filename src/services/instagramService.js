// Same-origin route. The backend (not this frontend) holds the
// Instagram access token, calls the Instagram API, and returns
// already-normalized JSON in the shape below. No Instagram
// credentials or tokens live in frontend code.
const INSTAGRAM_ENDPOINT = "/api/instagram-feed";

/**
 * @typedef {{
 *   id: string,
 *   caption: string | null,
 *   mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM",
 *   imageUrl: string | null,
 *   permalink: string | null,
 *   timestamp: string | null,
 * }} InstagramPost
 */

/**
 * Fetches Toronto Buffing's live Instagram profile + latest posts.
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ username: string | null, profilePictureUrl: string | null, posts: InstagramPost[] }>}
 */
export async function fetchInstagramFeed({ signal } = {}) {
  const response = await fetch(INSTAGRAM_ENDPOINT, { signal });

  if (!response.ok) {
    throw new Error(`Failed to load Instagram feed (${response.status})`);
  }

  const data = await response.json();
  return {
    username: data.username ?? null,
    profilePictureUrl: data.profilePictureUrl ?? null,
    // A post with no resolvable image (e.g. a video whose thumbnail
    // wasn't ready yet) has nothing a photo grid can show.
    posts: Array.isArray(data.posts) ? data.posts.filter((post) => post.imageUrl) : [],
  };
}
