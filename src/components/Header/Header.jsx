import { useState } from "react";
import "./Header.css";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="header__inner container">
          <a href="#top" className="header__logo" onClick={closeMenu}>
            Toronto Buffing
          </a>

          <nav className="header__nav" aria-label="Primary">
            <ul className="header__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn btn-secondary header__cta">
            Contact / Book
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
          </button>
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
        <ul className="mobile-nav__list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={closeMenu}>
              Contact / Book
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
