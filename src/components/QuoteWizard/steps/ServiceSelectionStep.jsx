import { SERVICES } from "../quoteData";
import { CheckIcon } from "../icons";

/**
 * @param {{ selected: string[], onToggle: (id: string) => void }} props
 */
function ServiceSelectionStep({ selected, onToggle }) {
  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Choose Your Service</h3>
      <p className="quote-step__helper">Select everything you'd like done — most builds combine services.</p>

      <div className="quote-service-grid">
        {SERVICES.map((service) => {
          const isSelected = selected.includes(service.id);

          return (
            <button
              type="button"
              key={service.id}
              className={`quote-service-card${isSelected ? " is-selected" : ""}`}
              onClick={() => onToggle(service.id)}
              aria-pressed={isSelected}
            >
              {service.image ? (
                <span
                  className="quote-service-card__media"
                  style={{ backgroundImage: `url(${service.image})` }}
                  aria-hidden="true"
                />
              ) : (
                <span className="quote-service-card__media quote-service-card__media--empty" aria-hidden="true" />
              )}
              <span className="quote-service-card__label">{service.label}</span>
              {isSelected && (
                <span className="quote-service-card__check" aria-hidden="true">
                  <CheckIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceSelectionStep;
