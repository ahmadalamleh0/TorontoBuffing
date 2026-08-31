import { useEffect, useRef, useState } from "react";

const VISIBLE_DELAY_MS = 2200;
const CYCLE_INTERVAL_MS = 2600;

/**
 * One project's card in the Selected Work carousel — once the card
 * has been visible in the viewport for a couple of seconds, it starts
 * auto-cycling through the project's photos (crossfading between
 * them) so multi-photo cars are visible without any interaction, with
 * the corner dots tracking which photo is currently showing.
 *
 * @param {{ project: import('./projectsData').PROJECTS[number] }} props
 */
function WorkCard({ project }) {
  const { images } = project;
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);

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
          }, VISIBLE_DELAY_MS);
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
  }, [images.length]);

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
