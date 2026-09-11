import { Link } from "react-router-dom";
import { SERVICE_AREAS } from "../../data/serviceAreas";
import "./ServiceAreasSection.css";

// Full planned coverage is always visible, but only cities with a
// published page (src/data/serviceAreas.js) render as a real link —
// an unpublished one renders as plain text so this section never
// points a visitor at a page that 404s.
function ServiceAreasSection() {
  return (
    <section className="service-areas">
      <div className="container service-areas__inner">
        <h2 className="service-areas__heading">Serving The Greater Toronto Area</h2>
        <div className="service-areas__pills">
          {SERVICE_AREAS.map((area) =>
            area.published ? (
              <Link key={area.path} to={area.path} className="service-areas__pill">
                {area.title}
              </Link>
            ) : (
              <span key={area.path} className="service-areas__pill service-areas__pill--soon">
                {area.title}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceAreasSection;
