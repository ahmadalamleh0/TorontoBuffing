import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepProgress from "./StepProgress";
import VehicleTypeStep from "./steps/VehicleTypeStep";
import ServiceSelectionStep from "./steps/ServiceSelectionStep";
import ServiceOptionsStep from "./steps/ServiceOptionsStep";
import PhotosAndDetailsStep from "./steps/PhotosAndDetailsStep";
import ReviewStep from "./steps/ReviewStep";
import { CheckIcon } from "./icons";
import { TOTAL_STEPS, initialQuoteFormData, SIMPLE_SERVICES } from "./quoteData";
import "./QuoteWizardSection.css";
import "./QuoteSteps.css";

gsap.registerPlugin(ScrollTrigger);

// Eyebrow -> headline -> supporting line -> card, each landing softly
// on top of the last. Runs once, the moment the section's intro
// enters view; skipped for prefers-reduced-motion.
function useIntroReveal() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const sublineRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [eyebrowRef.current, titleRef.current, sublineRef.current, cardRef.current];
    if (targets.some((el) => !el)) return;

    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 14 });
      gsap.set(titleRef.current, { opacity: 0, y: 28 });
      gsap.set(sublineRef.current, { opacity: 0, y: 12 });
      gsap.set(cardRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: eyebrowRef.current, start: "top 85%", once: true },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.28 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.14")
        .to(sublineRef.current, { opacity: 1, y: 0, duration: 0.26 }, "-=0.16")
        .to(cardRef.current, { opacity: 1, y: 0, duration: 0.3 }, "-=0.08");
    });

    return () => ctx.revert();
  }, []);

  return { eyebrowRef, titleRef, sublineRef, cardRef };
}

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
  const { eyebrowRef, titleRef, sublineRef, cardRef } = useIntroReveal();

  // Step 3 only exists when at least one selected service actually has
  // configuration to collect — otherwise Next/Back jump straight over
  // it (see goNext/goBack), matching "no unnecessary package screens."
  const hasStep3Content = useMemo(
    () => formData.services.some((id) => !SIMPLE_SERVICES.has(id)),
    [formData.services],
  );

  const updateVehicleType = (id) => setFormData((data) => ({ ...data, vehicleType: id }));

  const updateVehicle = (field, value) => {
    setFormData((data) => ({ ...data, vehicle: { ...data.vehicle, [field]: value } }));
  };

  const toggleService = (id) => {
    setFormData((data) => ({
      ...data,
      services: data.services.includes(id)
        ? data.services.filter((service) => service !== id)
        : [...data.services, id],
    }));
  };

  const updateOption = (group, field, value) => {
    setFormData((data) => ({
      ...data,
      options: { ...data.options, [group]: { ...data.options[group], [field]: value } },
    }));
  };

  const toggleBodyArea = (area) => {
    setFormData((data) => {
      const areas = data.options.bodyWork.areas;
      const nextAreas = areas.includes(area) ? areas.filter((a) => a !== area) : [...areas, area];
      return { ...data, options: { ...data.options, bodyWork: { ...data.options.bodyWork, areas: nextAreas } } };
    });
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
        return Boolean(
          formData.vehicleType &&
            formData.vehicle.year &&
            formData.vehicle.make.trim() &&
            formData.vehicle.model.trim(),
        );
      case 2:
        return formData.services.length > 0;
      case 3: {
        const checks = [];
        if (formData.services.includes("ppf")) checks.push(Boolean(formData.options.ppf.coverage));
        if (formData.services.includes("ceramic-coating")) {
          checks.push(
            Boolean(formData.options.ceramicCoating.duration) && Boolean(formData.options.ceramicCoating.condition),
          );
        }
        if (formData.services.includes("paint-correction")) {
          checks.push(Boolean(formData.options.paintCorrection.stage));
        }
        if (formData.services.includes("auto-body") || formData.services.includes("panel-repainting")) {
          checks.push(formData.options.bodyWork.areas.length > 0);
        }
        return checks.every(Boolean);
      }
      case 4:
        return Boolean(
          formData.contact.fullName.trim() &&
            formData.contact.phone.trim() &&
            formData.contact.email.trim()
        );
      default:
        return true;
    }
  }, [step, formData]);

  const goNext = () => {
    setStep((current) => {
      let next = current + 1;
      if (next === 3 && !hasStep3Content) next += 1;
      return Math.min(TOTAL_STEPS, next);
    });
  };

  const goBack = () => {
    setStep((current) => {
      let prev = current - 1;
      if (prev === 3 && !hasStep3Content) prev -= 1;
      return Math.max(1, prev);
    });
  };

  const goToStep = (target) => setStep(target === 3 && !hasStep3Content ? 2 : target);

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
          <span className="eyebrow" ref={eyebrowRef}>
            Get A Quote
          </span>
          <h2 className="quote-wizard__title" ref={titleRef}>
            Build Your Quote.
          </h2>
          <p className="quote-wizard__subline" ref={sublineRef}>
            A few quick steps to your quote.
          </p>
        </div>

        <div className="quote-wizard__card" ref={cardRef}>
          {submitted ? (
            <SuccessState onStartOver={startOver} />
          ) : (
            <>
              <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

              <div className="quote-wizard__step-body" key={step}>
                {step === 1 && (
                  <VehicleTypeStep
                    vehicleType={formData.vehicleType}
                    onVehicleTypeChange={updateVehicleType}
                    vehicle={formData.vehicle}
                    onVehicleChange={updateVehicle}
                  />
                )}
                {step === 2 && <ServiceSelectionStep selected={formData.services} onToggle={toggleService} />}
                {step === 3 && (
                  <ServiceOptionsStep
                    services={formData.services}
                    options={formData.options}
                    onOptionChange={updateOption}
                    onBodyAreaToggle={toggleBodyArea}
                  />
                )}
                {step === 4 && (
                  <PhotosAndDetailsStep
                    photos={formData.photos}
                    onPhotosChange={updatePhotos}
                    contact={formData.contact}
                    onContactChange={updateContact}
                  />
                )}
                {step === 5 && <ReviewStep formData={formData} onEditStep={goToStep} />}
              </div>

              {!(step === 1 && !formData.vehicleType) && (
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
                    {step === TOTAL_STEPS ? "Get My Quote" : "Continue"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuoteWizardSection;
