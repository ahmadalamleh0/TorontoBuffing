import bannerImage from "../../assets/images/banner/ppf-showcase.webp";
import "./ImageBanner.css";

const DEFAULT_ALT =
  "Toronto Buffing PPF benefits: self-healing hydrophobic topcoat, 10-12 year manufacturer warranty, and TPU film 4x thicker than traditional vinyl";

// Rendered as a real <img> (not a cover-cropped background) since the
// artwork carries its own callout labels reaching all four edges —
// any crop would cut off text, so the full image is always shown.
function ImageBanner({ content }) {
  const src = content?.imageUrl || bannerImage;
  const alt = content?.alt || DEFAULT_ALT;

  return (
    <section className="image-banner">
      <img
        className="image-banner__media"
        src={src}
        width={1122}
        height={1402}
        alt={alt}
        loading="lazy"
      />
    </section>
  );
}

export default ImageBanner;
