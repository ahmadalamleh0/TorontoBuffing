import { useEffect, useRef } from "react";
import { FEATURED_SERVICES, SUPPORTING_SERVICES } from "../../data/servicesData";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.css";

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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ServicesSection() {
  const sectionRef = useSectionReveal();

  return (
    <section id="services" className="services section" ref={sectionRef}>
      <div className="container">
        <div className="services__cards">
          <div className="services__featured">
            {FEATURED_SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} size="featured" />
            ))}
          </div>

          <div className="services__supporting">
            {SUPPORTING_SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} size="supporting" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
