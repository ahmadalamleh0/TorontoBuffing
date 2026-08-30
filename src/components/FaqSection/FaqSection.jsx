import { useState } from "react";
import "./FaqSection.css";

// Ported from the client-supplied Framer code component (FAQ.js /
// "AKFaq"). That file only imports `addPropertyControls`/`ControlType`
// from "framer" for the Framer editor's properties panel — nothing
// framer-motion or runtime-only — so the actual component logic here
// is close to a direct port, just: search bar removed (per request),
// styling moved from inline style objects to CSS classes, accent
// swapped from the source's green (#1D9E75) to Toronto Buffing blue,
// and content hardcoded instead of exposed as editable props.
const CATEGORIES = ["General", "Pricing", "Paint Correction", "Ceramic Coating", "PPF", "Repairs"];

// Real Toronto Buffing Q&A, sourced from the existing site's homepage,
// pricing page, and terms — facts/policies kept as supplied, not
// expanded with invented claims.
const FAQ_ITEMS = [
  // General
  {
    question: "What services does Toronto Buffing specialize in?",
    answer:
      "Toronto Buffing specializes in automotive paint restoration, repair and protection, including paint correction, PPF, ceramic coatings, autobody and repainting, collision repair, wetsanding, headlight restoration, paint chip repair, scratch repair and vehicle paint inspections.",
    category: "General",
  },
  {
    question: "Do I need an in-person assessment before booking?",
    answer:
      "For paint correction and ceramic coating, an in-person assessment is required to provide an accurate quote. The condition of the paint needs to be inspected before the appropriate service can be recommended.",
    category: "General",
  },
  {
    question: "Do you warranty your work?",
    answer:
      "Warranty coverage depends on the service. Toronto Buffing provides a limited lifetime warranty on select workmanship issues. Protection products such as coatings and PPF are also subject to their applicable product and manufacturer warranty terms.",
    category: "General",
  },
  {
    question: "What makes Toronto Buffing different from a traditional detailing shop?",
    answer:
      "Toronto Buffing focuses on in-depth paint restoration, repair and protection rather than general detailing. Their team combines experience in paint correction, autobody defect finishing, chip repair, refinishing, PPF and ceramic coatings so damaged paint can be properly restored before it is protected.",
    category: "General",
  },

  // Pricing
  {
    question: "Why are your prices listed as “starting at”?",
    answer:
      "Final pricing varies because every vehicle is different. Paint type and condition, defect severity, surface area, vehicle size and body geometry can all affect the amount of work required.",
    category: "Pricing",
  },
  {
    question: "What factors affect the final price of a project?",
    answer:
      "Pricing depends on factors including paint condition and type, severity of defects, surface area, vehicle geometry, vehicle wear and the complexity of the work required.",
    category: "Pricing",
  },
  {
    question: "Can you provide an accurate quote from photos?",
    answer:
      "Paint correction and ceramic coating cannot be accurately quoted from photos, written descriptions or verbal descriptions. These services require an in-person assessment. Scratch and collision repairs may sometimes be quoted from clear and complete photos.",
    category: "Pricing",
  },
  {
    question: "Is paint correction included in ceramic coating or PPF pricing?",
    answer:
      "Ceramic coating pricing does not include paint correction, and coatings must be paired with a service that results in a fully corrected finish. PPF packages may include basic preparation/correction, but additional correction or polishing can add to the project cost.",
    category: "Pricing",
  },

  // Paint Correction
  {
    question: "What is paint correction?",
    answer:
      "Paint correction is the process of removing defects from an automotive finish using machine polishers, pads, abrasive compounds and, when necessary, fine-grit sanding. The process levels a small amount of clear coat around scratches and defects to create a smoother, clearer finish.",
    category: "Paint Correction",
  },
  {
    question: "What’s the difference between buffing, polishing and paint correction?",
    answer:
      "Polishing generally refers to lighter machining of the paint. Buffing refers to the heavier cutting or compounding stage. A traditional “cut and polish” or “buff and polish” is essentially what is now called a 2-stage paint correction.",
    category: "Paint Correction",
  },
  {
    question: "What’s the difference between a 2-stage and 3-stage paint correction?",
    answer:
      "A 2-stage correction uses a cutting stage followed by a refining polish. A 3-stage correction adds another machining/refinement stage, allowing more extensive defect removal and a higher level of finishing when the paint requires it.",
    category: "Paint Correction",
  },
  {
    question: "What types of scratches and defects can paint correction remove?",
    answer:
      "Paint correction can address swirl marks, surface scratches, oxidation, clear-coat water-spot etching, haze and other clear-coat defects. Deeper damage that passes beyond what can safely be corrected may require another repair method.",
    category: "Paint Correction",
  },
  {
    question: "Is paint correction safe for my vehicle’s clear coat?",
    answer:
      "Yes, when performed correctly. Toronto Buffing measures and evaluates the paint before correction and aims to remove as little clear coat as possible. Their site states that a standard correction generally removes only a small percentage of the available clear coat.",
    category: "Paint Correction",
  },
  {
    question: "Why is paint correction important before ceramic coating or PPF?",
    answer:
      "Any defects left behind can remain visible — or become more noticeable — once coating or film is installed. Toronto Buffing corrects the paint first so the surface is properly restored before long-term protection is applied.",
    category: "Paint Correction",
  },

  // Ceramic Coating
  {
    question: "What is a ceramic coating?",
    answer: "A ceramic coating is a liquid polymer that chemically bonds with the paint and creates a durable hydrophobic protective layer.",
    category: "Ceramic Coating",
  },
  {
    question: "What are the benefits of ceramic coating?",
    answer:
      "Ceramic coating increases gloss, hydrophobic behaviour and resistance to UV exposure, contaminants, chemical etching and minor wash-induced wear. It also makes the vehicle easier to clean and helps it stay cleaner longer.",
    category: "Ceramic Coating",
  },
  {
    question: "How long does a ceramic coating last?",
    answer:
      "Depending on the coating formulation and how the vehicle is used and maintained, professionally applied ceramic coatings can last approximately 1 to 10 years.",
    category: "Ceramic Coating",
  },
  {
    question: "Why is paint correction required before ceramic coating?",
    answer:
      "Paint correction removes swirls, imperfections and stubborn contamination before the coating is installed. Toronto Buffing only applies coatings to finishes that have first been properly corrected.",
    category: "Ceramic Coating",
  },
  {
    question: "How much does professional ceramic coating cost?",
    answer:
      "Pricing depends on the coating package and required preparation. Toronto Buffing’s current pricing page lists coating options ranging from entry-level packages through multi-layer Ceramic Pro packages, with paint correction priced separately where required.",
    category: "Ceramic Coating",
  },
  {
    question: "How long does ceramic coating need to cure?",
    answer:
      "Most Ceramic Pro coatings listed by Toronto Buffing require approximately 10–14 days for full cure. Fireball Korea coatings are listed as curing in roughly 7 days. The initial drying stage occurs much sooner.",
    category: "Ceramic Coating",
  },
  {
    question: "What’s the difference between ceramic coating and PPF?",
    answer:
      "Ceramic coating is an extremely thin liquid protective layer focused on gloss, hydrophobicity and chemical/environmental resistance. PPF is a much thicker physical film designed to protect against impacts such as rock chips and scratches.",
    category: "Ceramic Coating",
  },
  {
    question: "Can ceramic coating be applied over PPF?",
    answer:
      "Yes. Ceramic coating can be applied on top of PPF for additional gloss and protection. Toronto Buffing specifically advises against applying ceramic coating underneath PPF because it can interfere with film adhesion.",
    category: "Ceramic Coating",
  },
  {
    question: "Is ceramic coating right for every vehicle?",
    answer:
      "It is appropriate in most situations, but it does not protect against physical impacts such as rock chips or deep scratches. Toronto Buffing also advises against ceramic coating certain single-stage, lacquer and soft painted-plastic finishes.",
    category: "Ceramic Coating",
  },

  // PPF
  {
    question: "What is paint protection film (PPF)?",
    answer: "PPF is a thin, clear material made from plastics and adhesives that is installed over automotive surfaces to physically protect the paint.",
    category: "PPF",
  },
  {
    question: "Who should consider getting PPF?",
    answer:
      "Anyone looking for a physical barrier against rock chips, scratches, UV exposure and environmental damage can benefit from PPF. Toronto Buffing particularly recommends it for new vehicles, specialty vehicles and vehicles with unique or difficult-to-repair paint colours.",
    category: "PPF",
  },
  {
    question: "When is the best time to install PPF?",
    answer:
      "PPF can be installed during any season or stage of ownership, but ideally it should be installed before the paint accumulates damage. Used vehicles can also receive PPF after existing defects are properly corrected or repaired.",
    category: "PPF",
  },
  {
    question: "What PPF brands does Toronto Buffing use?",
    answer:
      "Toronto Buffing uses premium films including Hexis Bodyfence, SunTek, XPEL and STEK, selecting the film according to the vehicle, colour and client requirements.",
    category: "PPF",
  },
  {
    question: "What’s the difference between bulk and pre-cut PPF?",
    answer:
      "Pre-cut film is quicker and reduces material waste but can leave more exposed edges. Toronto Buffing specializes in bulk installation because it allows greater coverage, deeper edge wrapping and a more seamless finish.",
    category: "PPF",
  },
  {
    question: "How long does a PPF installation take?",
    answer:
      "A full-front PPF installation on a new standard sedan normally takes around 2–3 days. Used vehicles can take longer because of correction and repairs. Toronto Buffing states that a full-body PPF project normally takes about two weeks on a new vehicle and can take longer for complex projects.",
    category: "PPF",
  },
  {
    question: "What warranty comes with Toronto Buffing’s PPF installations?",
    answer:
      "Toronto Buffing provides a limited lifetime workmanship guarantee for labour-related PPF installation failures. Their films carry a minimum 10-year limited material warranty against issues such as peeling, cracking and fading, subject to applicable warranty conditions.",
    category: "PPF",
  },
  {
    question: "How should I care for PPF after installation?",
    answer:
      "Toronto Buffing recommends regular hand washing, at least monthly or whenever the vehicle becomes dirty. Do not machine-polish or hand-wax the film, avoid using a pressure washer too close to edges, and follow the post-installation curing instructions.",
    category: "PPF",
  },
  {
    question: "Can PPF be safely removed later?",
    answer:
      "Toronto Buffing’s low-primer or primer-free installation method is intended to allow future removal without damaging healthy OEM paint. However, previously repainted, poorly bonded or already compromised paint can still be at risk when old PPF is removed.",
    category: "PPF",
  },

  // Repairs
  {
    question: "What is a paint chip and why should it be repaired?",
    answer:
      "A paint chip is a small area where the vehicle’s paint has been removed. If the chip exposes primer or metal, it can become a starting point for corrosion and further paint failure. Toronto Buffing’s chip repair process focuses first on protection from corrosion and second on improving appearance.",
    category: "Repairs",
  },
  {
    question: "Can paint chip repair be booked by itself?",
    answer:
      "No. Toronto Buffing does not offer chip repair as a stand-alone service. It must be paired with a larger service such as paint correction, ceramic coating or PPF.",
    category: "Repairs",
  },
  {
    question: "When is chip repair not enough and panel refinishing required?",
    answer:
      "Toronto Buffing recommends panel refinishing when damage is too extensive for chip repair — including panels with more than roughly 10 chips, chips larger than a pencil eraser, peeling paint, heavy microchipping or sandblasting. Very small pinhole chips may also require repainting to achieve meaningful improvement.",
    category: "Repairs",
  },
  {
    question: "What can headlight restoration repair?",
    answer:
      "Depending on the restoration level, Toronto Buffing addresses oxidation, yellowing, haze, pitting, scratches, stone chips, deeper gouges and damaged or peeling exterior lens coatings.",
    category: "Repairs",
  },
  {
    question: "How long does headlight restoration take?",
    answer:
      "Headlight restoration usually takes about 1–2 days. Entry-level work can sometimes be completed in under four hours, although vehicles may be kept overnight when curing time is needed.",
    category: "Repairs",
  },
  {
    question: "Is headlight restoration permanent?",
    answer:
      "The sanding and polishing permanently removes the defects being corrected, but an unprotected plastic lens can oxidize again over time. Toronto Buffing recommends PPF or another protective system after restoration for longer-term clarity.",
    category: "Repairs",
  },
  {
    question: "Can all headlights be restored?",
    answer:
      "Most plastic headlight lenses can be significantly improved. Severe internal crazing, trapped moisture, internal cracking or extensive damage may limit the result, and in some cases replacement may be necessary.",
    category: "Repairs",
  },
];

function FaqAccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div className={`faq-akitem${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq-akitem__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-akitem__question-inner">
          <span className="faq-akitem__number">{String(index + 1).padStart(2, "0")}</span>
          <span className="faq-akitem__question-text">{item.question}</span>
        </span>
        <span className="faq-akitem__indicator" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="1" y1="5" x2="9" y2="5" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className="faq-akitem__answer-wrap">
        <p className="faq-akitem__answer">{item.answer}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("General");

  const filtered = FAQ_ITEMS.filter((item) => item.category === activeTab);

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <section className="faq-ak section">
      <div className="container faq-ak__container">
        <span className="faq-ak__badge">
          <span className="faq-ak__badge-dot" aria-hidden="true" />
          FAQ
        </span>

        <h2 className="faq-ak__heading">Frequently Asked Questions</h2>
        <p className="faq-ak__subheading">Everything you need to know before your visit.</p>

        <div className="faq-ak__tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`faq-ak__tab${activeTab === cat ? " is-active" : ""}`}
              onClick={() => {
                setActiveTab(cat);
                setOpenIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-ak__list">
          {filtered.map((item, i) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <div className="faq-ak__footer">
          <div className="faq-ak__footer-text">
            <span className="faq-ak__footer-title">Still have questions?</span>
            <span className="faq-ak__footer-subtext">Tell us about your vehicle.</span>
          </div>
          <a href="#contact" className="faq-ak__footer-cta">
            START YOUR QUOTE →
          </a>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
