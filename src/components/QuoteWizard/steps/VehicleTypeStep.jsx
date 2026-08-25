import { VEHICLE_TYPES, VEHICLE_YEARS, VEHICLE_MAKES } from "../quoteData";

/**
 * Two internal phases, driven entirely by whether a vehicle type has
 * been picked yet: tile picker first, then an automatic hand-off to
 * the year/make/model form. This is a sub-step within Step 1 only —
 * it doesn't touch the wizard's own 5-step numbering/progress.
 *
 * @param {{
 *   vehicleType: string | null,
 *   onVehicleTypeChange: (id: string | null) => void,
 *   vehicle: { year: string, make: string, model: string },
 *   onVehicleChange: (field: string, value: string) => void,
 * }} props
 */
function VehicleTypeStep({ vehicleType, onVehicleTypeChange, vehicle, onVehicleChange }) {
  if (!vehicleType) {
    return (
      <div className="quote-step">
        <h3 className="quote-step__heading">Your Vehicle</h3>
        <p className="quote-step__helper">Start by telling us what you drive.</p>

        <div className="quote-vehicle-grid">
          {VEHICLE_TYPES.map((type) => (
            <button
              type="button"
              key={type.id}
              className={`quote-vehicle-card ${vehicleType === type.id ? "is-selected" : ""}`}
              onClick={() => onVehicleTypeChange(type.id)}
            >
              <img className="quote-vehicle-card__media" src={type.image} alt="" aria-hidden="true" />
              <div className="quote-vehicle-card__text">
                <span className="quote-vehicle-card__label">{type.label}</span>
                <span className="quote-vehicle-card__examples">{type.examples}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const selectedType = VEHICLE_TYPES.find((type) => type.id === vehicleType);

  return (
    <div className="quote-step">
      <button
        type="button"
        className="quote-step__back-link"
        onClick={() => onVehicleTypeChange(null)}
      >
        &larr; {selectedType?.label} — change
      </button>

      <h3 className="quote-step__heading">Year, Make &amp; Model</h3>
      <p className="quote-step__helper">So we can quote accurately.</p>

      <div className="quote-field-stack">
        <label className="quote-field">
          <span className="quote-field__label">Year</span>
          <select
            className="quote-field__input quote-field__select"
            value={vehicle.year}
            onChange={(e) => onVehicleChange("year", e.target.value)}
          >
            <option value="">Select year</option>
            {VEHICLE_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="quote-field">
          <span className="quote-field__label">Make</span>
          <select
            className="quote-field__input quote-field__select"
            value={vehicle.make}
            onChange={(e) => onVehicleChange("make", e.target.value)}
          >
            <option value="">Select make</option>
            {VEHICLE_MAKES.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>

        <label className="quote-field">
          <span className="quote-field__label">Model</span>
          <input
            className="quote-field__input"
            type="text"
            placeholder="e.g. M3"
            value={vehicle.model}
            onChange={(e) => onVehicleChange("model", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default VehicleTypeStep;
