import { useEffect, useState } from "react";
import { fetchInstagramFeed } from "../../services/instagramService";
import { BUSINESS_INFO } from "../../data/businessInfo";
import "./InstagramSection.css";

const INSTAGRAM_URL = BUSINESS_INFO.sameAs.find((url) => url.includes("instagram.com"));
const SKELETON_COUNT = 4;

// Live feed via the Instagram API (see netlify/functions/instagram-feed.js)
// — never hardcoded, so new posts show up automatically. No header/
// fallback content: until INSTAGRAM_ACCESS_TOKEN is configured (or if
// the request fails), this renders nothing at all rather than leaving
// empty section padding on the page.
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
  const isLoading = state.status === "loading";
  const hasPosts = state.status === "ready" && posts.length > 0;

  // Nothing to show and nothing pending — collapse the section
  // entirely instead of leaving empty section padding on the page.
  if (!isLoading && !hasPosts) return null;

  return (
    <section id="instagram" className="instagram-section section">
      <div className="container">
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
