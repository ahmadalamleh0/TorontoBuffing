import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";
import "./MobileActionBar.css";

// Yields whenever the quote wizard's own Back/Continue bar is on
// screen, so this full-width bar never covers it. Same approach as
// WhatsAppButton's yield behavior, needed here too since this bar is
// full-width instead of a corner bubble.
function useYieldsNearQuoteWizard() {
  const [yielded, setYielded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".quote-wizard__nav");
    if (!nav || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setYielded(entry.isIntersecting));
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return yielded;
}

// Stays hidden until the visitor has scrolled roughly halfway through
// the Services section — the bar shouldn't compete for attention
// before there's been a chance to see any actual work. Tracked via
// the section's own midpoint against the viewport's midpoint (not an
// IntersectionObserver threshold, which can't reach 0.5 for a section
// taller than 2x the viewport). Fires once and stops listening; once
// revealed during a visit, it stays revealed even if the user scrolls
// back up past the trigger point.
function useRevealAfterServicesHalfway() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    const servicesEl = document.querySelector("#services");
    if (!servicesEl) return;

    const checkScrollProgress = () => {
      const rect = servicesEl.getBoundingClientRect();
      const sectionMidpoint = rect.top + rect.height / 2;
      if (sectionMidpoint <= window.innerHeight / 2) {
        setRevealed(true);
      }
    };

    checkScrollProgress();
    window.addEventListener("scroll", checkScrollProgress, { passive: true });
    window.addEventListener("resize", checkScrollProgress);
    return () => {
      window.removeEventListener("scroll", checkScrollProgress);
      window.removeEventListener("resize", checkScrollProgress);
    };
  }, [revealed]);

  return revealed;
}

function MobileActionBar() {
  const revealed = useRevealAfterServicesHalfway();
  const yieldedNearWizard = useYieldsNearQuoteWizard();
  const hidden = !revealed || yieldedNearWizard;

  return (
    <div
      className={`mobile-action-bar${hidden ? " mobile-action-bar--yield" : ""}`}
      aria-hidden={hidden}
    >
      <a
        href={`tel:+${WHATSAPP_NUMBER}`}
        className="mobile-action-bar__btn mobile-action-bar__btn--call"
        tabIndex={hidden ? -1 : 0}
      >
        Call Now
      </a>
      <a
        href="#contact"
        className="mobile-action-bar__btn mobile-action-bar__btn--book"
        tabIndex={hidden ? -1 : 0}
      >
        Book Online
      </a>
    </div>
  );
}

export default MobileActionBar;
