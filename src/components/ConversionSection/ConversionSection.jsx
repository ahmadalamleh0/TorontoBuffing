import "./ConversionSection.css";

function ConversionSection() {
  return (
    <section id="contact" className="conversion section">
      <div className="container conversion__inner">
        <h2 className="conversion__headline">
          Ready to elevate your vehicle?
        </h2>
        <p className="conversion__copy">
          Tell us about your vehicle and what you're looking for, and we'll
          get back to you with next steps.
        </p>

        <div className="conversion__actions">
          <a href="#" className="btn btn-primary">
            Request a Quote
          </a>
          <a href="#" className="btn btn-secondary">
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

export default ConversionSection;
