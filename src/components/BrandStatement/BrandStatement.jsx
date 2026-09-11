import { Fragment, useEffect, useRef } from "react";
import "./BrandStatement.css";

const DEFAULT_HEADLINE = ["More Than", "Detailing."];
const DEFAULT_COPY = "Precision restoration, correction and protection, beyond traditional detailing.";

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
function BrandStatement({ content }) {
  const sectionRef = useSectionReveal();
  const headline = content?.headline?.length ? content.headline : DEFAULT_HEADLINE;
  const copy = content?.copy || DEFAULT_COPY;

  return (
    <section id="about" className="brand-statement" ref={sectionRef}>
      <div className="container brand-statement__container">
        <span className="brand-statement__line" aria-hidden="true" />
        <h2 className="brand-statement__headline">
          {headline.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <p className="brand-statement__copy">{copy}</p>
      </div>
    </section>
  );
}

export default BrandStatement;
