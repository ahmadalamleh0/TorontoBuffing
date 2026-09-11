import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "../../data/faqData";
import { buildFaqPageSchema } from "../../data/seoData";
import { fetchPublishedFaqs } from "../../services/cms/faqs";
import FaqAccordionItem from "./FaqAccordionItem";
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
// FAQ_ITEMS/FAQ_CATEGORIES (src/data/faqData.js) are the fallback used
// whenever the CMS's `faqs` table isn't configured, empty, or
// unreachable — the accordion always has real content either way.
// Once CMS data loads, this section's own <Helmet> emits FAQPage
// JSON-LD built from whichever list actually rendered, so structured
// data can never drift from what's on the page.

function useFaqData() {
  const [state, setState] = useState({ items: FAQ_ITEMS, categories: FAQ_CATEGORIES });

  useEffect(() => {
    let cancelled = false;

    fetchPublishedFaqs().then((result) => {
      if (cancelled || !result || result.items.length === 0) return;
      setState(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function FaqSection() {
  const { items, categories } = useFaqData();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(categories[0] ?? "General");

  // If CMS data replaces the fallback list after the initial render
  // and the active tab no longer exists in it, fall back to the new
  // list's first category instead of showing an empty accordion.
  const effectiveTab = categories.includes(activeTab) ? activeTab : categories[0];
  const filtered = items.filter((item) => item.category === effectiveTab);

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <section id="faq" className="faq-ak section">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildFaqPageSchema(items))}</script>
      </Helmet>
      <div className="container faq-ak__container">
        <span className="faq-ak__badge">
          <span className="faq-ak__badge-dot" aria-hidden="true" />
          FAQ
        </span>

        <h2 className="faq-ak__heading">Frequently Asked Questions</h2>
        <p className="faq-ak__subheading">Everything you need to know before your visit.</p>

        <div className="faq-ak__tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`faq-ak__tab${effectiveTab === cat ? " is-active" : ""}`}
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
