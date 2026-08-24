import bannerImage from "../../assets/images/banner/showcase.png";
import "./ImageBanner.css";

function ImageBanner() {
  return (
    <section className="image-banner">
      <div
        className="image-banner__media"
        style={{ backgroundImage: `url(${bannerImage})` }}
        aria-hidden="true"
      />
    </section>
  );
}

export default ImageBanner;
