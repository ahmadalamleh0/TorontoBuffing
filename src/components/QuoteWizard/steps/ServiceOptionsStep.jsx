import {
  PPF_COVERAGE_OPTIONS,
  CERAMIC_DURATION_OPTIONS,
  CERAMIC_CONDITION_OPTIONS,
  PAINT_CORRECTION_STAGES,
  BODY_WORK_AREAS,
} from "../quoteData";
import CoverageVisualizer from "./CoverageVisualizer";

/**
 * Step 3 is entirely dynamic: one section per selected service that
 * actually has configuration to collect. Simple services (headlight restoration, paint chip repair, scratch
 * repair) contribute no section — see SIMPLE_SERVICES
 * and hasServiceOptions() in quoteData/QuoteWizardSection, which skip
 * this step entirely when none of the selected services need it.
 *
 * @param {{
 *   services: string[],
 *   options: import('../quoteData').initialQuoteFormData["options"],
 *   onOptionChange: (group: string, field: string, value: string) => void,
 *   onBodyAreaToggle: (area: string) => void,
 * }} props
 */
function ServiceOptionsStep({ services, options, onOptionChange, onBodyAreaToggle }) {
  const hasPPF = services.includes("ppf");
  const hasCeramic = services.includes("ceramic-coating");
  const hasPaintCorrection = services.includes("paint-correction");
  const hasBodyWork = services.includes("auto-body") || services.includes("panel-repainting");

  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Select Your Options</h3>
      <p className="quote-step__helper">Configure each service you selected.</p>

      <div className="quote-options-stack">
        {hasPPF && (
          <section className="quote-options-section">
            <h4 className="quote-options-section__title">Choose Your Coverage</h4>
            <div className="quote-option-grid">
              {PPF_COVERAGE_OPTIONS.map((opt) => {
                const isSelected = options.ppf.coverage === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    className={`quote-option-card${isSelected ? " is-selected" : ""}`}
                    onClick={() => onOptionChange("ppf", "coverage", opt.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="quote-option-card__label">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <CoverageVisualizer coverage={options.ppf.coverage} />
          </section>
        )}

        {hasCeramic && (
          <section className="quote-options-section">
            <h4 className="quote-options-section__title">Coating Package</h4>
            <div className="quote-option-grid">
              {CERAMIC_DURATION_OPTIONS.map((opt) => {
                const isSelected = options.ceramicCoating.duration === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    className={`quote-option-card${isSelected ? " is-selected" : ""}`}
                    onClick={() => onOptionChange("ceramicCoating", "duration", opt.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="quote-option-card__label">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <h4 className="quote-options-section__title quote-options-section__title--spaced">
              Current Paint Condition
            </h4>
            <div className="quote-tag-group">
              {CERAMIC_CONDITION_OPTIONS.map((opt) => {
                const isSelected = options.ceramicCoating.condition === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    className={`quote-tag${isSelected ? " is-selected" : ""}`}
                    onClick={() => onOptionChange("ceramicCoating", "condition", opt.id)}
                    aria-pressed={isSelected}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {hasPaintCorrection && (
          <section className="quote-options-section">
            <h4 className="quote-options-section__title">Correction Stage</h4>
            <div className="quote-stage-list">
              {PAINT_CORRECTION_STAGES.map((stage) => {
                const isSelected = options.paintCorrection.stage === stage.id;
                return (
                  <button
                    type="button"
                    key={stage.id}
                    className={`quote-stage-card${isSelected ? " is-selected" : ""}`}
                    onClick={() => onOptionChange("paintCorrection", "stage", stage.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="quote-stage-card__label">{stage.label}</span>
                    <span className="quote-stage-card__description">{stage.description}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {hasBodyWork && (
          <section className="quote-options-section">
            <h4 className="quote-options-section__title">Which Area Needs Attention?</h4>
            <p className="quote-options-section__helper">Select all that apply.</p>
            <div className="quote-tag-group">
              {BODY_WORK_AREAS.map((area) => {
                const isSelected = options.bodyWork.areas.includes(area.id);
                return (
                  <button
                    type="button"
                    key={area.id}
                    className={`quote-tag${isSelected ? " is-selected" : ""}`}
                    onClick={() => onBodyAreaToggle(area.id)}
                    aria-pressed={isSelected}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ServiceOptionsStep;
