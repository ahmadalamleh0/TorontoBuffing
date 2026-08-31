import { useEffect, useRef } from "react";
import "./TextReveal.css";

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
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// The "Why Toronto Buffing" statement between Services and the image
// banner — a simple editorial breathing point (fade + slight upward
// entrance on view), not an interactive feature. Component/file name
// is a holdover from the previous scroll-pinned version; kept as-is
// to avoid an unrelated rename.
function TextReveal() {
  const sectionRef = useSectionReveal();

  return (
    <section className="cinematic" ref={sectionRef}>
      <div className="container cinematic__inner">
        <span className="eyebrow cinematic__eyebrow">Why Toronto Buffing</span>
        <h2 className="cinematic__title">DETAILERS WITH INTEGRITY.</h2>
        <p className="cinematic__copy">
          We don’t believe in one-size-fits-all. Every finish is treated for what it actually needs, using
          proven materials and the right process instead of shortcuts.
        </p>
        <p className="cinematic__copy">Protecting paint is one thing. Making it worthy of protection comes first.</p>
      </div>
    </section>
  );
}

export default TextReveal;
