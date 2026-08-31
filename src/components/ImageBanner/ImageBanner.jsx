import { useEffect, useRef } from "react";
import bannerImage from "../../assets/images/banner/ppf-showcase.webp";
import "./ImageBanner.css";

const REVEAL_THRESHOLD = 0.3;

function useRevealOnView() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Rendered as a real <img> (not a cover-cropped background) since the
// artwork carries its own callout labels reaching all four edges —
// any crop would cut off text, so the full image is always shown. A
// small eyebrow/title/caption sits above it so the banner reads as a
// continuation of the brand statement above, not an abrupt cut into
// an image — kept deliberately minimal, no cards or icons.
function ImageBanner() {
  const ref = useRevealOnView();

  return (
    <section className="image-banner" ref={ref}>
      <div className="container image-banner__intro">
        <span className="eyebrow image-banner__eyebrow">The Film Itself</span>
        <h2 className="image-banner__title">What's actually protecting your paint.</h2>
        <p className="image-banner__caption">A closer look at the technology built into every install.</p>
      </div>
      <img
        className="image-banner__media"
        src={bannerImage}
        width={1122}
        height={1402}
        alt="Toronto Buffing PPF benefits: self-healing hydrophobic topcoat, 10-12 year manufacturer warranty, and TPU film 4x thicker than traditional vinyl"
        loading="lazy"
      />
    </section>
  );
}

export default ImageBanner;
