import heroImageMobile from "../../assets/images/hero/hero-mobile-hood-detail.webp";
import heroImageDesktop from "../../assets/images/hero/hero-foam-wash.jpg";
import BrandLogoStrip from "../BrandLogoStrip/BrandLogoStrip";
import "./Hero.css";

// Two art-directed crops: a wider shop shot for narrow/tall mobile
// viewports, a tight detail shot for wide desktop viewports. Swap
// either import to change that breakpoint's image — nothing else changes.
function Hero() {
  return (
    <section id="top" className="hero">
      <div
        className="hero__media hero__media--mobile"
        style={{ backgroundImage: `url(${heroImageMobile})` }}
        aria-hidden="true"
      />
      <div
        className="hero__media hero__media--desktop"
        style={{ backgroundImage: `url(${heroImageDesktop})` }}
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
            Book Consultation
          </a>
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
