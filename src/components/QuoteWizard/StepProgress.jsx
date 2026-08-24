import "./StepProgress.css";

/**
 * @param {{ currentStep: number, totalSteps: number }} props
 */
function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="step-progress">
      <span className="step-progress__label">
        Step {currentStep} of {totalSteps}
      </span>
      <div className="step-progress__bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`step-progress__segment${i < currentStep ? " is-complete" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default StepProgress;
