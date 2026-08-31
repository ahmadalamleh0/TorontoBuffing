import { useState } from "react";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "../../data/faqData";
import "./FaqSection.css";

// Ported from the client-supplied Framer code component (FAQ.js /
// "AKFaq"). That file only imports `addPropertyControls`/`ControlType`
// from "framer" for the Framer editor's properties panel — nothing
// framer-motion or runtime-only — so the actual component logic here
// is close to a direct port, just: search bar removed (per request),
// styling moved from inline style objects to CSS classes, accent
// swapped from the source's green (#1D9E75) to Toronto Buffing blue,
// and content hardcoded instead of exposed as editable props.
//
// FAQ_ITEMS/FAQ_CATEGORIES now live in src/data/faqData.js, shared
// with the homepage's FAQPage JSON-LD so structured data can never
// drift from what's actually rendered here.
const CATEGORIES = FAQ_CATEGORIES;

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
      </div>
    </section>
  );
}

export default FaqSection;
