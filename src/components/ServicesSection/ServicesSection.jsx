import { useEffect, useRef, useState } from "react";
import { FEATURED_SERVICES, SUPPORTING_SERVICES } from "../../data/servicesData";
import { fetchPublishedServices } from "../../services/cms/services";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.css";

// src/data/servicesData.js is the fallback whenever the CMS's
// `services` table isn't configured, empty, or unreachable — the grid
// always has real cards either way.
function useServiceGroups() {
  const [groups, setGroups] = useState({ featured: FEATURED_SERVICES, supporting: SUPPORTING_SERVICES });

  useEffect(() => {
    let cancelled = false;

    fetchPublishedServices().then((result) => {
      if (cancelled || !result || (result.featured.length === 0 && result.supporting.length === 0)) return;
      setGroups(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return groups;
}

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
  const { featured, supporting } = useServiceGroups();

  return (
    <section id="services" className="services section" ref={sectionRef}>
      <div className="container">
        <div className="services__cards">
          <div className="services__featured">
            {featured.map((service) => (
              <ServiceCard key={service.id} {...service} size="featured" />
            ))}
          </div>

          <div className="services__supporting">
            {supporting.map((service) => (
              <ServiceCard key={service.id} {...service} size="supporting" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
