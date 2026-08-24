import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";
import Logo from "./Logo";
import "./Header.css";

// Split so the logo can sit dead-center: left links flank it on one
// side, right links + CTA on the other.
const NAV_LINKS_LEFT = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
];
const NAV_LINKS_RIGHT = [
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
];
const NAV_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    // 90px roughly matches "just past the very top of the hero" —
    // far enough that this isn't triggered by a stray pixel of
    // scroll, soon enough that the docking feels responsive.
    const onScroll = () => setIsScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="header">
        <div className={`header__inner${isScrolled ? " is-scrolled" : ""}`}>
          <div className="header__side header__side--left">
            <nav className="header__nav" aria-label="Primary">
              <ul className="header__nav-list">
                {NAV_LINKS_LEFT.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link
            to="/"
            id="site-logo-target"
            className="header__logo"
            onClick={closeMenu}
          >
            {/* id used by IntroAnimation to dock/crossfade into this
                slot. Header floats over dark/image sections, so it
                uses the white mark variant. */}
            <Logo variant="white" />
          </Link>

          <div className="header__side header__side--right">
            <nav className="header__nav" aria-label="Secondary">
              <ul className="header__nav-list">
                {NAV_LINKS_RIGHT.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <a href="#contact" className="btn btn-primary header__cta">
              Get a Quote
            </a>

            <button
              type="button"
              className="header__toggle"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="visually-hidden">Toggle menu</span>
              <span className="header__toggle-bar" />
              <span className="header__toggle-bar" />
              <span className="header__toggle-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> so its position: fixed isn't
          re-anchored by the header's backdrop-filter containing block. */}
      <nav
        id="mobile-nav"
        className={`mobile-nav ${isMenuOpen ? "mobile-nav--open" : ""}`}
        aria-label="Mobile"
        aria-hidden={!isMenuOpen}
      >
        <span className="mobile-nav__handle" aria-hidden="true" />

        <ul className="mobile-nav__list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-nav__actions">
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="mobile-nav__action mobile-nav__action--call"
            onClick={closeMenu}
          >
            Call Now
          </a>
          <a
            href="#contact"
            className="mobile-nav__action mobile-nav__action--book"
            onClick={closeMenu}
          >
            Book Online
          </a>
        </div>
      </nav>
    </>
  );
}

export default Header;
