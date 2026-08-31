import bannerImage from "../../assets/images/banner/ppf-showcase.webp";
import "./ImageBanner.css";

// Rendered as a real <img> (not a cover-cropped background) since the
// artwork carries its own callout labels reaching all four edges —
// any crop would cut off text, so the full image is always shown.
function ImageBanner() {
  return (
    <section className="image-banner">
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
