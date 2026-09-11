import { useEffect, useRef, useState } from "react";

const VISIBLE_DELAY_MS = 2200;
const CYCLE_INTERVAL_MS = 2600;
// A vertical scroll position shows up to 3 cards (one per grid row) at
// once, and they'd all start their observer callback within the same
// frame — without this, all 3 would then cycle in perfect lockstep,
// which reads as mechanical rather than alive. Staggering only the
// initial delay (not the interval itself) is enough: once offset,
// same-period intervals never re-sync.
const STAGGER_STEP_MS = 450;
const STAGGER_CYCLE = 5;

/**
 * One project's card in the Selected Work carousel — once the card
 * has been visible in the viewport for a couple of seconds, it starts
 * auto-cycling through the project's photos (crossfading between
 * them) so multi-photo cars are visible without any interaction, with
 * the corner dots tracking which photo is currently showing.
 *
 * @param {{ project: import('./projectsData').PROJECTS[number], cardIndex?: number }} props
 */
function WorkCard({ project, cardIndex = 0 }) {
  const { images } = project;
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const stagger = (cardIndex % STAGGER_CYCLE) * STAGGER_STEP_MS;

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = cardRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    let delayId;
    let intervalId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delayId = setTimeout(() => {
            intervalId = setInterval(() => {
              setIndex((i) => (i + 1) % images.length);
            }, CYCLE_INTERVAL_MS);
          }, VISIBLE_DELAY_MS + stagger);
        } else {
          clearTimeout(delayId);
          clearInterval(intervalId);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(delayId);
      clearInterval(intervalId);
    };
  }, [images.length, stagger]);

  return (
    <div className="selected-work__card" ref={cardRef}>
      <div className="selected-work__media">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.vehicle} — Toronto Buffing project photo ${i + 1} of ${images.length}`}
            className={`selected-work__image${i === index ? " is-active" : ""}`}
            loading="lazy"
            draggable={false}
          />
        ))}
        <span className="selected-work__vehicle-tag">{project.vehicle}</span>
        {images.length > 1 && (
          <span className="selected-work__dots" aria-hidden="true">
            {images.map((_, i) => (
              <span key={i} className={`selected-work__dot${i === index ? " is-active" : ""}`} />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default WorkCard;
