// Shared by FaqSection (homepage, full category-tabbed list) and
// ServiceFaqSection (one service's tagged subset, no tabs) — one
// accordion row implementation, so both places render identically.
function FaqAccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div className={`faq-akitem${isOpen ? " is-open" : ""}`}>
      <button type="button" className="faq-akitem__question" onClick={onToggle} aria-expanded={isOpen}>
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

export default FaqAccordionItem;
