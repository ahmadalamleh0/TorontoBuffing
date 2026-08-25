import { Link } from "react-router-dom";
import "./Footer.css";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/torontobuffing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@torontobuffing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 4v10.2a3.3 3.3 0 1 1 -3.3-3.3c.3 0 .6 0 .9.1V8.4c-.3 0-.6-.1-.9-.1A5.9 5.9 0 1 0 16.6 14V9.2c1 .7 2.2 1.1 3.4 1.1V7.7c-1.8 0-3.3-1.2-3.7-2.9A3.3 3.3 0 0 1 16 4h-2Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/torontobuffing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.5 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/torontobuffing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M13.5 21v-7h2.2l.3-2.6h-2.5V9.7c0-.75.2-1.26 1.28-1.26H16V6.1c-.23-.03-1-.1-1.9-.1-1.9 0-3.2 1.16-3.2 3.28v1.86H8.7v2.6h2.2V21" />
      </svg>
    ),
  },
];

const SERVICE_GROUPS = [
  {
    label: "PROTECTION",
    services: [
      { title: "PPF", id: "ppf" },
      { title: "Ceramic Coating", id: "ceramic-coating" },
    ],
  },
  {
    label: "CORRECTION",
    services: [
      { title: "Paint Correction", id: "paint-correction" },
      { title: "Panel Refinishing", id: "panel-refinishing" },
    ],
  },
  {
    label: "RESTORATION",
    services: [
      { title: "Headlight Restoration", id: "headlight-restoration" },
      { title: "Paint Chip Repair", id: "paint-chip-repair" },
    ],
  },
];

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
                VAUGHAN, ON L6A 1E9
              </p>
            </div>
          </div>

          {SERVICE_GROUPS.map((group) => (
            <div className="editorial-footer__col" key={group.label}>
              <h4 className="editorial-footer__label">{group.label}</h4>
              <div className="editorial-footer__content">
                {group.services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="editorial-footer__link"
                  >
                    {service.title.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="editorial-footer__col">
            <h4 className="editorial-footer__label">FOLLOW</h4>
            <div className="editorial-footer__socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-footer__social"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
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

      <div className="editorial-footer__bottom container">
        <div className="editorial-footer__legal">
          <a href="#privacy">PRIVACY</a>
          <span className="editorial-footer__sep">·</span>
          <a href="#terms">TERMS</a>
        </div>
        <p className="editorial-footer__credit">
          POWERED BY{" "}
          <a href="https://thediablo.co/" target="_blank" rel="noopener noreferrer">
            DIABLO
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
