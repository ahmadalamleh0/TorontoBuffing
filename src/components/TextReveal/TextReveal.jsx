import { useEffect, useRef } from "react";
import "./TextReveal.css";

const TITLE = "DETAILERS WITH INTEGRITY.";

const BLOCKS = [
  {
    heading: "NO ONE-SIZE-FITS-ALL.",
    body: "Every vehicle is treated for what it actually needs.",
  },
  {
    heading: "PROVEN MATERIALS. NO SHORTCUTS.",
    body: "We focus on the right process and trusted products, not quick fixes.",
  },
  {
    heading: "CORRECTION COMES FIRST.",
    body: "Protecting paint is one thing. Making it worthy of protection comes first.",
  },
];

const REVEAL_THRESHOLD = 0.4;

// Each block gets its own observer so they reveal independently, in
// sequence, as the user scrolls past them — not all at once.
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

function RevealBlock({ heading, body }) {
  const ref = useRevealOnView();
  return (
    <div className="cinematic__block" ref={ref}>
      <p className="cinematic__block-heading">{heading}</p>
      <p className="cinematic__block-body">{body}</p>
    </div>
  );
}

// The "Why Toronto Buffing" statement between Services and the image
// banner: a centered eyebrow + big title masthead, followed by three
// short statement blocks that each fade/rise into place independently
// as they're scrolled into view — a compact editorial manifesto, not
// a scroll-pinned scene.
function TextReveal() {
  return (
    <section className="cinematic">
      <div className="container cinematic__inner">
        <span className="eyebrow cinematic__eyebrow">Why Toronto Buffing</span>
        <h2 className="cinematic__title">{TITLE}</h2>

        <div className="cinematic__blocks">
          {BLOCKS.map((block) => (
            <RevealBlock key={block.heading} {...block} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TextReveal;
