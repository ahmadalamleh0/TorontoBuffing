import { SERVICES } from "../quoteData";
import { CheckIcon } from "../icons";

/**
 * @param {{ selected: string[], onToggle: (id: string) => void }} props
 */
function ServiceSelectionStep({ selected, onToggle }) {
  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">What do you need done?</h3>
      <p className="quote-step__helper">
        Choose the service that best matches your vehicle. Select as many as apply. You can
        always add more detail later.
      </p>

      <div className="quote-option-grid">
        {SERVICES.map((service) => {
          const isSelected = selected.includes(service.id);

          return (
            <button
              type="button"
              key={service.id}
              className={`quote-option-card${isSelected ? " is-selected" : ""}`}
              onClick={() => onToggle(service.id)}
              aria-pressed={isSelected}
            >
              <span className="quote-option-card__label">{service.label}</span>
              {isSelected && (
                <span className="quote-option-card__check" aria-hidden="true">
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
