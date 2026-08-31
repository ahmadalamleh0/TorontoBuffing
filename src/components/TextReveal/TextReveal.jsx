import { useEffect, useRef } from "react";
import "./TextReveal.css";

const EYEBROW = "Why Toronto Buffing";
const TITLE = "DETAILERS WITH INTEGRITY.";
const BODY_LEAD =
  "Every vehicle is treated based on what it actually needs. From proper preparation to proven materials and precise workmanship, we focus on restoring, protecting, and preserving your vehicle the right way ";
const BODY_EMPHASIS = "without shortcuts.";

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
// banner — matches the service pages' reveal-intro treatment exactly:
// small eyebrow, one heavy Anton headline, one short line of support,
// fading/rising into place together as one composed brand statement.
function TextReveal() {
  const ref = useRevealOnView();

  return (
    <section className="cinematic" ref={ref}>
      <div className="container cinematic__inner">
        <span className="eyebrow cinematic__eyebrow">{EYEBROW}</span>
        <h2 className="cinematic__title">{TITLE}</h2>
        <p className="cinematic__body">
          {BODY_LEAD}
          <strong>{BODY_EMPHASIS}</strong>
        </p>
      </div>
    </section>
  );
}

export default TextReveal;
