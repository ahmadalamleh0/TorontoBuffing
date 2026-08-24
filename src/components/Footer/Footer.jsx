import "./Footer.css";

function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer__inner container">
        {/* Top Info Sections */}
        <div className="editorial-footer__info-grid">
          <div className="editorial-footer__col">
            <h4 className="editorial-footer__label">CONTACT</h4>
            <div className="editorial-footer__content">
              <a href="tel:+16479858630" className="editorial-footer__link">
                (647) 985-8630
              </a>
              <a href="mailto:info@torontobuffing.com" className="editorial-footer__link">
                INFO@TORONTOBUFFING.COM
              </a>
              <p className="editorial-footer__text">MON – FRI: 8AM – 5PM</p>
            </div>
          </div>

          <div className="editorial-footer__col">
            <h4 className="editorial-footer__label">LOCATION</h4>
            <div className="editorial-footer__content">
              <p className="editorial-footer__text editorial-footer__text--bold">
                TORONTO BUFFING INC.
              </p>
              <p className="editorial-footer__text">
                99 RODINEA ROAD, UNIT 14
              </p>
              <p className="editorial-footer__text">
                MAPLE, ON L6A 1E9
              </p>
            </div>
          </div>

          <div className="editorial-footer__col">
            <h4 className="editorial-footer__label">FOLLOW</h4>
            <div className="editorial-footer__content">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="editorial-footer__link"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="editorial-footer__link"
              >
                GOOGLE
              </a>
            </div>
          </div>
        </div>

        {/* Utility Row */}
        <div className="editorial-footer__utility">
          <span className="editorial-footer__handle">@TORONTOBUFFING</span>
          <div className="editorial-footer__legal">
            <a href="#privacy">PRIVACY</a>
            <span className="editorial-footer__sep">·</span>
            <a href="#terms">TERMS</a>
          </div>
        </div>
      </div>

      {/* Massive Brand Wordmark */}
      <div className="editorial-footer__wordmark-container">
        <h1 className="editorial-footer__wordmark">
          <span>TORONTO</span>
          <span>BUFFING</span>
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
