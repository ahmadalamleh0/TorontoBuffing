import { Fragment } from "react";
import BrandLogoStrip from "../BrandLogoStrip/BrandLogoStrip";
import GoogleLogo from "../GoogleReviews/GoogleLogo";
import "./Hero.css";

// Served from /public (not a Vite-processed src/assets import) so its
// URL is stable and known ahead of build time — that's what lets
// index.html <link rel="preload"> this exact file for the LCP hero
// image, discoverable by the browser's preload scanner before any JS
// runs. An import path here would still work, but a hashed filename
// changes every build, and index.html's static preload can't follow it.
const heroImage = "/images/hero/hero-mobile-hood-detail.webp";

// Text-only defaults — kept as the fallback whenever CMS content
// hasn't loaded yet (or hasn't been set). The hero background image
// deliberately stays out of CMS scope: index.html preloads this exact
// static path for the LCP image, ahead of any JS running, and a
// dynamic Supabase URL can't be known at that point.
const DEFAULT_EYEBROW = "Rated No.1";
const DEFAULT_HEADLINE = ["Paint Correction,", "Ceramic Coating & PPF."];
const DEFAULT_SUBLINE = "Precision protection for vehicles across Vaughan and the GTA.";

// Same hood-detail shot on every breakpoint now; .hero__media--mobile
// and --desktop still exist purely so each breakpoint can keep its
// own background-position crop via CSS.
function Hero({ content }) {
  const eyebrow = content?.eyebrow || DEFAULT_EYEBROW;
  const headline = content?.headline?.length ? content.headline : DEFAULT_HEADLINE;
  const subline = content?.subline || DEFAULT_SUBLINE;

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
          <span className="eyebrow hero__eyebrow">{eyebrow}</span>
          <h1 className="hero__headline">
            {headline.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="hero__subline">{subline}</p>
        </div>

        <div className="hero__actions">
          <span className="hero__trust-badge" aria-label="Rated 5.0 stars on Google from 400+ reviews">
            <span className="hero__trust-badge-visual" aria-hidden="true">
              <GoogleLogo size={13} />
              <span>5.0</span>
              <span className="hero__trust-badge-star">★</span>
              <span>400+</span>
            </span>
          </span>
          <a href="#contact" className="btn btn-secondary hero__cta">
            Start Your Quote
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
