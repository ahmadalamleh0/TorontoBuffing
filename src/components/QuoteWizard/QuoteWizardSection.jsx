import { useMemo, useState } from "react";
import StepProgress from "./StepProgress";
import ServiceSelectionStep from "./steps/ServiceSelectionStep";
import VehicleDetailsStep from "./steps/VehicleDetailsStep";
import ProjectDetailsStep from "./steps/ProjectDetailsStep";
import PhotosAndContactStep from "./steps/PhotosAndContactStep";
import ReviewSubmitStep from "./steps/ReviewSubmitStep";
import { CheckIcon } from "./icons";
import { TOTAL_STEPS, initialQuoteFormData } from "./quoteData";
import "./QuoteWizardSection.css";
import "./QuoteSteps.css";

function SuccessState({ onStartOver }) {
  return (
    <div className="quote-success">
      <span className="quote-success__icon" aria-hidden="true">
        <CheckIcon />
      </span>
      <h3 className="quote-success__heading">Your request has been received.</h3>
      <p className="quote-success__body">We'll review the details and get back to you shortly.</p>
      <p className="quote-success__note">
        If your job is urgent, feel free to call us directly at{" "}
        <a href="tel:+16479858630">647-985-8630</a>.
      </p>
      <button type="button" className="btn btn-secondary" onClick={onStartOver}>
        Start a New Request
      </button>
    </div>
  );
}

function QuoteWizardSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialQuoteFormData);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id) => {
    setFormData((data) => ({
      ...data,
      services: data.services.includes(id)
        ? data.services.filter((service) => service !== id)
        : [...data.services, id],
    }));
  };

  const updateVehicle = (field, value) => {
    setFormData((data) => ({ ...data, vehicle: { ...data.vehicle, [field]: value } }));
  };

  const updateProject = (field, value) => {
    setFormData((data) => ({ ...data, project: { ...data.project, [field]: value } }));
  };

  const updatePhotos = (photos) => {
    setFormData((data) => ({ ...data, photos }));
  };

  const updateContact = (field, value) => {
    setFormData((data) => ({ ...data, contact: { ...data.contact, [field]: value } }));
  };

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return formData.services.length > 0;
      case 2:
        return Boolean(formData.vehicle.year && formData.vehicle.make.trim() && formData.vehicle.model.trim());
      case 4:
        return Boolean(
          formData.contact.fullName.trim() && formData.contact.phone.trim() && formData.contact.email.trim(),
        );
      default:
        return true;
    }
  }, [step, formData]);

  const goNext = () => setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const goToStep = (target) => setStep(target);

  const handleSubmit = () => {
    // TODO: replace with a real submission call, e.g.
    //   await fetch("/api/quote-request", { method: "POST", body: buildFormPayload(formData) })
    // Keep photos as multipart/form-data rather than JSON when that
    // lands — they're plain File objects already.
    console.info("[QuoteWizard] Quote request ready to submit:", formData);
    setSubmitted(true);
  };

  const startOver = () => {
    setFormData(initialQuoteFormData);
    setStep(1);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="quote-wizard section">
      <div className="container quote-wizard__container">
        <div className="quote-wizard__heading">
          <span className="eyebrow">Get A Quote</span>
          <h2 className="quote-wizard__title">Let's Get You A Quote.</h2>
          <p className="quote-wizard__subline">
            A few quick steps and we'll have everything we need to put together your estimate.
          </p>
        </div>

        <div className="quote-wizard__card">
          {submitted ? (
            <SuccessState onStartOver={startOver} />
          ) : (
            <>
              <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

              <div className="quote-wizard__step-body" key={step}>
                {step === 1 && (
                  <ServiceSelectionStep selected={formData.services} onToggle={toggleService} />
                )}
                {step === 2 && (
                  <VehicleDetailsStep vehicle={formData.vehicle} onChange={updateVehicle} />
                )}
                {step === 3 && (
                  <ProjectDetailsStep project={formData.project} onChange={updateProject} />
                )}
                {step === 4 && (
                  <PhotosAndContactStep
                    photos={formData.photos}
                    onPhotosChange={updatePhotos}
                    contact={formData.contact}
                    onContactChange={updateContact}
                  />
                )}
                {step === 5 && <ReviewSubmitStep formData={formData} onEditStep={goToStep} />}
              </div>

              <div className="quote-wizard__nav">
                {step > 1 ? (
                  <button type="button" className="btn btn-secondary" onClick={goBack}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canProceed}
                  onClick={step === TOTAL_STEPS ? handleSubmit : goNext}
                >
                  {step === TOTAL_STEPS ? "Request Quote" : "Continue"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuoteWizardSection;
