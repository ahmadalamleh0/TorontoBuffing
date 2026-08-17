import "./MainSection.css";

// Structural placeholder for the brand / services / work section.
// The image block and copy below stand in until this is designed properly.
function MainSection() {
  return (
    <section id="services" className="main-section section">
      <div className="container main-section__grid">
        <div className="main-section__text">
          <span className="eyebrow">About Toronto Buffing</span>
          <h2 className="main-section__headline">Built on precision.</h2>
          <p className="main-section__copy">
            Every vehicle that comes through our shop is treated with the
            same level of care and attention to detail — from correction to
            final finish.
          </p>
        </div>

        <div className="main-section__media" aria-hidden="true" />
      </div>
    </section>
  );
}

export default MainSection;
