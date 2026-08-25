import {
  VEHICLE_TYPES,
  SERVICES,
  PPF_COVERAGE_OPTIONS,
  CERAMIC_DURATION_OPTIONS,
  CERAMIC_CONDITION_OPTIONS,
  PAINT_CORRECTION_STAGES,
  BODY_WORK_AREAS,
} from "../quoteData";

function labelFor(list, id) {
  return list.find((item) => item.id === id)?.label ?? null;
}

/**
 * Builds the per-service option summary lines shown in the review —
 * only for services that were actually selected, only the fields that
 * were actually set.
 */
function buildOptionLines(services, options) {
  const lines = [];

  if (services.includes("ppf") && options.ppf.coverage) {
    lines.push(`PPF Coverage: ${labelFor(PPF_COVERAGE_OPTIONS, options.ppf.coverage)}`);
  }

  if (services.includes("ceramic-coating")) {
    if (options.ceramicCoating.duration) {
      lines.push(`Ceramic Coating: ${labelFor(CERAMIC_DURATION_OPTIONS, options.ceramicCoating.duration)}`);
    }
    if (options.ceramicCoating.condition) {
      lines.push(`Paint Condition: ${labelFor(CERAMIC_CONDITION_OPTIONS, options.ceramicCoating.condition)}`);
    }
  }

  if (services.includes("paint-correction") && options.paintCorrection.stage) {
    lines.push(`Paint Correction: ${labelFor(PAINT_CORRECTION_STAGES, options.paintCorrection.stage)}`);
  }

  if ((services.includes("auto-body") || services.includes("panel-repainting")) && options.bodyWork.areas.length) {
    const areaLabels = options.bodyWork.areas.map((id) => labelFor(BODY_WORK_AREAS, id)).filter(Boolean);
    lines.push(`Body Work Areas: ${areaLabels.join(", ")}`);
  }

  return lines;
}

/**
 * @param {{ formData: object, onEditStep: (step: number) => void }} props
 */
function ReviewStep({ formData, onEditStep }) {
  const vehicleTypeLabel = labelFor(VEHICLE_TYPES, formData.vehicleType) ?? "N/A";
  const vehicleLine =
    [formData.vehicle.year, formData.vehicle.make, formData.vehicle.model].filter(Boolean).join(" ") || "N/A";

  const serviceLabels = formData.services
    .map((id) => SERVICES.find((service) => service.id === id)?.label)
    .filter(Boolean);

  const optionLines = buildOptionLines(formData.services, formData.options);

  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Review Your Request</h3>
      <p className="quote-step__helper">
        Make sure everything looks right, then send your quote request.
      </p>

      <div className="quote-review">
        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Vehicle</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(1)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">
            {vehicleTypeLabel} &middot; {vehicleLine}
          </p>
        </div>

        <div className="quote-review__row">
          <div className="quote-review__row-header">
            <span className="quote-review__row-label">Service</span>
            <button type="button" className="quote-review__edit" onClick={() => onEditStep(2)}>
              Edit
            </button>
          </div>
          <p className="quote-review__row-value">
            {serviceLabels.length ? serviceLabels.join(", ") : "N/A"}
          </p>
        </div>

        {optionLines.length > 0 && (
          <div className="quote-review__row">
            <div className="quote-review__row-header">
              <span className="quote-review__row-label">Options</span>
              <button type="button" className="quote-review__edit" onClick={() => onEditStep(3)}>
                Edit
              </button>
            </div>
            <ul className="quote-review__list">
              {optionLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}

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
          {formData.contact.notes && (
            <p className="quote-review__row-value quote-review__row-value--muted">{formData.contact.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewStep;
