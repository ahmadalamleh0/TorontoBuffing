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
        <p className="service-card__subtitle">{subtitle}</p>
      </div>
    </Link>
  );
}

export default ServiceCard;
