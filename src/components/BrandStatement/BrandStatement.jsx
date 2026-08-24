import { useEffect, useRef } from "react";
import "./BrandStatement.css";

function useSectionReveal() {
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
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// The single-statement brand moment between the hero and Services —
// no headline-above-headline, no imagery, just the line the rest of
// the site backs up.
function BrandStatement() {
  const sectionRef = useSectionReveal();

  return (
    <section id="about" className="brand-statement" ref={sectionRef}>
      <div className="container brand-statement__container">
        <span className="brand-statement__line" aria-hidden="true" />
        <h2 className="brand-statement__headline">
          More Than
          <br />
          Detailing.
        </h2>
        <p className="brand-statement__copy">
          Precision restoration, correction and protection, beyond traditional
          detailing.
        </p>
      </div>
    </section>
  );
}

export default BrandStatement;
