import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StatsSection.css";

gsap.registerPlugin(ScrollTrigger);

const STAT_ITEMS = [
  {
    targetValue: 1000,
    format: (val) => `${Math.floor(val).toLocaleString()}+`,
    label: "RESTORATIONS COMPLETED",
  },
  {
    targetValue: 16,
    format: (val) => `${Math.floor(val)}+`,
    label: "YEARS OF EXPERIENCE",
  },
  {
    targetValue: 10,
    format: (val) => `${Math.floor(val)}-YEAR`,
    label: "PPF WARRANTY",
  },
  {
    targetValue: 5.0,
    format: (val) => `${val.toFixed(1)}`,
    star: true,
    label: "AVERAGE RATING",
  },
];

function StatsSection() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);
      if (!items.length) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        STAT_ITEMS.forEach((stat, i) => {
          if (numberRefs.current[i]) {
            numberRefs.current[i].textContent = stat.format(stat.targetValue);
          }
        });
        return;
      }

      gsap.set(items, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Fade up container items
      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Smooth count-up for numbers
      STAT_ITEMS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const counterObj = { val: 0 };
        tl.to(
          counterObj,
          {
            val: stat.targetValue,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              if (el) el.textContent = stat.format(counterObj.val);
            },
          },
          0.1 + i * 0.05
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container stats-section__container">
        <div className="stats-section__grid">
          {STAT_ITEMS.map((stat, i) => (
            <div
              key={stat.label}
              className="stats-section__item"
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <div className="stats-section__number">
                {stat.star && <span className="stats-section__star" aria-hidden="true">★</span>}
                <span className="stats-section__value" ref={(el) => (numberRefs.current[i] = el)}>
                  {stat.format(0)}
                </span>
              </div>
              <span className="stats-section__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
