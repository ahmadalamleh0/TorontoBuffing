import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Header/Logo";
import "./NovaNavbar.css";

// Ported from the client-supplied Framer component (NewMenu.js /
// "Nova Glow Navigation"). Framer's own runtime/modules (framer,
// framer-motion, framerusercontent.com-hosted AuroraNavLink/AuroraCTA
// sub-components) aren't available in this stack, so this is a hand
// port: every real value below (gradients, blur, shadow, timings,
// easing, sizes) is taken directly from the generated source. Only
// content/branding changed — the purple/white glow palette is kept
// exactly as supplied, per explicit instruction not to reskin it blue.
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#reviews" },
  { label: "Location", href: "#location" },
];

// Mobile drawer only — matches the old header's expandable service
// categories instead of a flat "Services" link. ids match
// servicesData/ServicePage routes.
const MOBILE_SERVICE_CATEGORIES = [
  {
    label: "Protection",
    services: [
      { title: "PPF", id: "ppf" },
      { title: "Ceramic Coating", id: "ceramic-coating" },
    ],
  },
  {
    label: "Correction",
    services: [
      { title: "Paint Correction", id: "paint-correction" },
      { title: "Panel Refinishing", id: "panel-refinishing" },
    ],
  },
  {
    label: "Restoration",
    services: [
      { title: "Headlight Restoration", id: "headlight-restoration" },
      { title: "Paint Chip Repair", id: "paint-chip-repair" },
    ],
  },
];

const MOBILE_SECONDARY_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#reviews" },
  { label: "Location", href: "#location" },
];

function useIsMobile(breakpoint = "(max-width: 1023px)") {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(breakpoint).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(breakpoint);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// Hides the floating navbar while the quote configurator is on
// screen — same protective behaviour used by the previous headers,
// without it the pill overlaps the configurator's own heading.
function useHiddenOverQuote() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const quoteSection = document.getElementById("contact");
      if (!quoteSection) return;
      const rect = quoteSection.getBoundingClientRect();
      setIsHidden(rect.top < window.innerHeight && rect.bottom > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isHidden;
}

// NAV_LINKS/MOBILE_SECONDARY_LINKS/the CTA all point at in-page
// section ids (#services, #contact, ...) that only exist on
// HomePage. A plain <a href="#x"> is correct there (native
// same-page scroll) but is a dead click on every other route
// (ServicePage, NotFoundPage) since no matching id exists on those
// pages. Off the homepage, route to "/#x" instead — HomePage's
// useScrollToHashOnMount picks up the hash once it mounts, same
// pattern already used by ServiceCta's "/#contact" link.
function SectionLink({ href, isHome, className, onClick, children }) {
  if (isHome) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={`/${href}`} onClick={onClick}>
      {children}
    </Link>
  );
}

function DrawerCategory({ category, isOpen, onToggle, onLinkClick }) {
  return (
    <div className={`nova__drawer-category${isOpen ? " is-open" : ""}`}>
      <button type="button" className="nova__drawer-category-toggle" aria-expanded={isOpen} onClick={onToggle}>
        {category.label.toUpperCase()}
        <span className="nova__drawer-category-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="nova__drawer-category-panel">
        <div className="nova__drawer-category-panel-clip">
          <div className="nova__drawer-category-links">
            {category.services.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} onClick={onLinkClick}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NovaNavbar() {
  const isMobile = useIsMobile();
  const isHidden = useHiddenOverQuote();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  // Fresh accordion state each time the drawer is opened.
  useEffect(() => {
    if (!isOpen) setOpenCategory(null);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`nova${isMobile ? " nova--phone" : " nova--desktop"}${isOpen ? " nova--open" : ""}${
        isHidden ? " nova--hidden" : ""
      }`}
      aria-label="Primary"
    >
      <div className="nova__glow-wrap">
        <div className="nova__border-rotor" aria-hidden="true" />

        <div className="nova__glass">
          <div className="nova__hairline" aria-hidden="true" />
          <div className="nova__shimmer" aria-hidden="true" />

          <div className="nova__top-row">
            <Link to="/" className="nova__logo" onClick={closeMenu} aria-label="Toronto Buffing home">
              <span className="nova__logo-mark">
                <Logo variant="white" />
              </span>
              <span className="nova__logo-label">Toronto Buffing</span>
            </Link>

            {!isMobile && (
              <ul className="nova__links">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <SectionLink className="nova__link" href={link.href} isHome={isHome}>
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            )}

            <div className="nova__right">
              {!isMobile && (
                <SectionLink href="#contact" isHome={isHome} className="nova__cta">
                  Start Your Quote <span aria-hidden="true">↗</span>
                </SectionLink>
              )}

              {isMobile && (
                <button
                  type="button"
                  className="nova__toggle"
                  aria-expanded={isOpen}
                  aria-controls="nova-drawer"
                  onClick={() => setIsOpen((open) => !open)}
                >
                  <span className="visually-hidden">Toggle menu</span>
                  <span className="nova__toggle-line nova__toggle-line--top" aria-hidden="true" />
                  <span className="nova__toggle-line nova__toggle-line--bottom" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {isMobile && (
            <div className="nova__drawer-wrap" id="nova-drawer">
              <div className="nova__drawer-clip">
                <div className="nova__drawer">
                  <div className="nova__drawer-categories">
                    {MOBILE_SERVICE_CATEGORIES.map((category) => (
                      <DrawerCategory
                        key={category.label}
                        category={category}
                        isOpen={openCategory === category.label}
                        onToggle={() =>
                          setOpenCategory((prev) => (prev === category.label ? null : category.label))
                        }
                        onLinkClick={closeMenu}
                      />
                    ))}
                  </div>

                  <div className="nova__drawer-links">
                    {MOBILE_SECONDARY_LINKS.map((link) => (
                      <SectionLink
                        key={link.href}
                        className="nova__drawer-link"
                        href={link.href}
                        isHome={isHome}
                        onClick={closeMenu}
                      >
                        {link.label.toUpperCase()}
                      </SectionLink>
                    ))}
                  </div>

                  <SectionLink
                    href="#contact"
                    isHome={isHome}
                    className="nova__cta nova__cta--block"
                    onClick={closeMenu}
                  >
                    Start Your Quote <span aria-hidden="true">↗</span>
                  </SectionLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NovaNavbar;
