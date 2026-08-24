import { SERVICES } from "../quoteData";

/**
 * @param {{ formData: object, onEditStep: (step: number) => void }} props
 */
function ReviewSubmitStep({ formData, onEditStep }) {
  const serviceLabels = formData.services
    .map((id) => SERVICES.find((service) => service.id === id)?.label)
    .filter(Boolean);

  const vehicleLine =
    [formData.vehicle.year, formData.vehicle.make, formData.vehicle.model].filter(Boolean).join(" ") ||
    "N/A";

  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Review your request</h3>
      <p className="quote-step__helper">
        Make sure everything looks right, then send your quote request.
      </p>

      <div className="quote-review">
        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Services</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(1)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">
            {serviceLabels.length ? serviceLabels.join(", ") : "N/A"}
          </p>
        </div>

        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Vehicle</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(2)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">{vehicleLine}</p>
        </div>

        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Project Notes</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(3)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">{formData.project.description || "N/A"}</p>
        </div>

        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Photos</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(4)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">
            {formData.photos.length > 0
              ? `${formData.photos.length} photo${formData.photos.length > 1 ? "s" : ""} attached`
              : "No photos attached"}
          </p>
        </div>

        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Contact</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(4)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">
            {[formData.contact.fullName, formData.contact.phone, formData.contact.email]
              .filter(Boolean)
              .join(" · ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewSubmitStep;
