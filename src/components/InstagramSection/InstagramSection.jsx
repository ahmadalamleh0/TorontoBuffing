import { useEffect, useState } from "react";
import { fetchInstagramFeed } from "../../services/instagramService";
import { BUSINESS_INFO } from "../../data/businessInfo";
import InstagramGlyph from "./InstagramGlyph";
import "./InstagramSection.css";

const INSTAGRAM_URL = BUSINESS_INFO.sameAs.find((url) => url.includes("instagram.com"));
const FALLBACK_HANDLE = "torontobuffing";
const SKELETON_COUNT = 4;

// Live feed via the Instagram API (see netlify/functions/instagram-feed.js)
// — never hardcoded, so new posts show up automatically. Until
// INSTAGRAM_ACCESS_TOKEN is configured (or if the API request fails),
// the profile header still renders with a static fallback so "Follow
// on Instagram" always works; only the post grid depends on the feed.
function InstagramSection() {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    fetchInstagramFeed({ signal: controller.signal })
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("[InstagramSection] Failed to load Instagram feed:", error);
        setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, []);

  const posts = state.data?.posts ?? [];
  const handle = state.data?.username ?? FALLBACK_HANDLE;
  const avatarUrl = state.data?.profilePictureUrl ?? null;
  const isLoading = state.status === "loading";
  const hasPosts = state.status === "ready" && posts.length > 0;

  return (
    <section id="instagram" className="instagram-section section">
      <div className="container">
        <div className="instagram-section__header">
          <span className="instagram-section__avatar">
            {avatarUrl ? <img src={avatarUrl} alt="" /> : <InstagramGlyph />}
          </span>
          <div className="instagram-section__identity">
            <p className="instagram-section__handle">@{handle.toUpperCase()}</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="instagram-section__follow">
              Follow on Instagram <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {isLoading && (
          <div className="instagram-grid" aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <div className="instagram-post instagram-post--skeleton" key={i} />
            ))}
          </div>
        )}

        {hasPosts && (
          <div className="instagram-grid">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink ?? INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-post"
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption ? post.caption.slice(0, 140) : "Toronto Buffing Instagram post"}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default InstagramSection;
