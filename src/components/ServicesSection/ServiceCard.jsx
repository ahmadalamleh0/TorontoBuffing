import { Link } from "react-router-dom";

/**
 * @param {{
 *   id: string,
 *   title: string,
 *   subtitle: string,
 *   image: string | null,
 *   size?: "featured" | "supporting",
 *   offset?: boolean,
 * }} props
 */
function ServiceCard({ id, title, subtitle, image, size = "featured", offset = false }) {
  return (
    <Link
      to={`/services/${id}`}
      className={`service-card service-card--${size} service-card--${id}${offset ? " service-card--offset" : ""}`}
    >
      <div
        className="service-card__media"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
        aria-hidden="true"
      />
      <div className="service-card__scrim" aria-hidden="true" />
      <div className="service-card__text">
        <h3 className="service-card__title">{title}</h3>
        <div className="service-card__meta">
          <p className="service-card__subtitle">{subtitle}</p>
          <span className="service-card__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
