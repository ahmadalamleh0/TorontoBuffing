import { VEHICLE_YEARS, VEHICLE_MAKES } from "../quoteData";

/**
 * @param {{
 *   vehicle: { year: string, make: string, model: string },
 *   onChange: (field: string, value: string) => void,
 * }} props
 */
function VehicleDetailsStep({ vehicle, onChange }) {
  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Tell us about your vehicle</h3>
      <p className="quote-step__helper">
        This helps us understand the car and provide a more accurate quote.
      </p>

      <div className="quote-field-stack">
        <label className="quote-field">
          <span className="quote-field__label">Year</span>
          <select
            className="quote-field__input"
            value={vehicle.year}
            onChange={(e) => onChange("year", e.target.value)}
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
            className="quote-field__input"
            value={vehicle.make}
            onChange={(e) => onChange("make", e.target.value)}
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
            onChange={(e) => onChange("model", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default VehicleDetailsStep;
