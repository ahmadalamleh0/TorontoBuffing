import { useEffect, useRef } from "react";
import "./TextReveal.css";

const DEFAULT_TITLE = "DETAILERS WITH INTEGRITY.";
const DEFAULT_BODY_LEAD =
  "Every vehicle is treated based on what it actually needs. From proper preparation to proven materials and precise workmanship, we focus on restoring, protecting, and preserving your vehicle the right way ";
const DEFAULT_BODY_EMPHASIS = "without shortcuts.";

const REVEAL_THRESHOLD = 0.3;

function useRevealOnView() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// The "Why Toronto Buffing" statement between Services and the image
// banner — one heavy Anton headline, one short line of support, fading/
// rising into place together as one composed brand statement (no
// eyebrow label, by request).
function TextReveal({ content }) {
  const ref = useRevealOnView();
  const title = content?.title || DEFAULT_TITLE;
  const bodyLead = content?.bodyLead || DEFAULT_BODY_LEAD;
  const bodyEmphasis = content?.bodyEmphasis || DEFAULT_BODY_EMPHASIS;

  return (
    <section className="cinematic" ref={ref}>
      <div className="container cinematic__inner">
        <h2 className="cinematic__title">{title}</h2>
        <p className="cinematic__body">
          {bodyLead}
          <strong>{bodyEmphasis}</strong>
        </p>
      </div>
    </section>
  );
}

export default TextReveal;
