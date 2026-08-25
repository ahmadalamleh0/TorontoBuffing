import heroImage from "../../assets/images/hero/hero-mobile-hood-detail.webp";
import BrandLogoStrip from "../BrandLogoStrip/BrandLogoStrip";
import GoogleLogo from "../GoogleReviews/GoogleLogo";
import "./Hero.css";

// Same hood-detail shot on every breakpoint now; .hero__media--mobile
// and --desktop still exist purely so each breakpoint can keep its
// own background-position crop via CSS.
function Hero() {
  return (
    <section id="top" className="hero">
      <div
        className="hero__media hero__media--mobile"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div
        className="hero__media hero__media--desktop"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="hero__scrim" aria-hidden="true" />

      {/* Text and button anchor independently within this block: text
          stays high (just under the header), the button is pushed all
          the way to the block's own bottom edge — right above the
          brand strip — leaving the car visible in between. */}
      <div className="hero__content container">
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">Toronto Buffing</span>
          <h1 className="hero__headline">
            Paint Correction,
            <br />
            Ceramic Coating &amp; PPF.
          </h1>
          <p className="hero__subline">Precision protection for vehicles across Vaughan and the GTA.</p>
        </div>

        <div className="hero__actions">
          <a href="#contact" className="btn btn-secondary hero__cta">
            Start Your Quote
          </a>
          <span className="hero__trust-badge" aria-label="Rated 5.0 stars on Google from 350+ reviews">
            <span className="hero__trust-badge-visual" aria-hidden="true">
              <GoogleLogo size={13} />
              <span>5.0</span>
              <span className="hero__trust-badge-star">★</span>
              <span>350+</span>
            </span>
          </span>
        </div>
      </div>

      {/* Pinned to the hero's own bottom edge so the marquee reads as
          part of the photo, not a section below it, and is already in
          view on first load without scrolling. */}
      <div className="hero__brands">
        <BrandLogoStrip />
      </div>
    </section>
  );
}

export default Hero;
