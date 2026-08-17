import "./Hero.css";

// Background media is a placeholder. Swap the <div className="hero__media">
// contents for a <video> or <img> once final assets are ready.
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content container">
        <span className="eyebrow hero__eyebrow">Toronto Buffing</span>
        <h1 className="hero__headline">
          Automotive Detailing,
          <br />
          Refined.
        </h1>
        <p className="hero__subline">
          Paint correction, protection, and finishing for vehicles that
          deserve better.
        </p>

        <div className="hero__actions">
          <a href="#contact" className="btn btn-primary">
            Request a Quote
          </a>
          <a href="#work" className="btn btn-secondary">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
