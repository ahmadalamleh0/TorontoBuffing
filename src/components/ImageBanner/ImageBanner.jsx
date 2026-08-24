import bannerImage from "../../assets/images/banner/garage-showcase.jpg";
import "./ImageBanner.css";

// A single full-bleed image moment between Reviews and the map —
// swap the import above (or replace the <div> with a <video>) to
// change the photo; nothing else needs to change.
function ImageBanner() {
  return (
    <section className="image-banner">
      <div
        className="image-banner__media"
        style={{ backgroundImage: `url(${bannerImage})` }}
        aria-hidden="true"
      />
      <div className="image-banner__scrim" aria-hidden="true" />
      <div className="image-banner__content container">
        <h2 className="image-banner__statement">Precision Finishes</h2>
      </div>
    </section>
  );
}

export default ImageBanner;
