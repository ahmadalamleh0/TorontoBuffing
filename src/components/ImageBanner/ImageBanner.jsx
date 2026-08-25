import bannerImage from "../../assets/images/banner/ppf-benefits.png";
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
        alt="Toronto Buffing PPF benefits: self-healing protection, hydrophobic surface, 10-year warranty, and crystal gloss finish"
        loading="lazy"
      />
    </section>
  );
}

export default ImageBanner;
