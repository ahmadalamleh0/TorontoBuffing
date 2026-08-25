import "./StepProgress.css";

/**
 * @param {{ currentStep: number, totalSteps: number }} props
 */
function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="step-progress">
      <div
        className="step-progress__bar"
        role="progressbar"
        aria-label={`Step ${currentStep} of ${totalSteps}`}
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        {Array.from({ length: totalSteps }, (_, i) => (
          <span key={i} className={`step-progress__segment${i < currentStep ? " is-complete" : ""}`} />
        ))}
      </div>
    </div>
  );
}

export default StepProgress;
