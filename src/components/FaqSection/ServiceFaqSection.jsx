import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FAQ_ITEMS } from "../../data/faqData";
import { buildFaqPageSchema } from "../../data/seoData";
import { fetchFaqsForService } from "../../services/cms/faqs";
import FaqAccordionItem from "./FaqAccordionItem";
import "./FaqSection.css";

// The same accordion component, styling and underlying FAQ content as
// the homepage's FaqSection, filtered to one service instead of shown
// with category tabs — no new questions, no separate copy of the
// text. Renders nothing when a service has no tagged question (see
// FAQ_ITEMS' `services` field / the faqs table's `services` column),
// same "don't force unrelated content" rule as RelatedInsightsSection.
function localFaqsForService(serviceSlug) {
  return FAQ_ITEMS.filter((item) => (item.services ?? []).includes(serviceSlug));
}

function useServiceFaqs(serviceSlug) {
  const [items, setItems] = useState(() => localFaqsForService(serviceSlug));

  useEffect(() => {
    setItems(localFaqsForService(serviceSlug));
    let cancelled = false;

    fetchFaqsForService(serviceSlug).then((rows) => {
      if (cancelled || !rows || rows.length === 0) return;
      setItems(rows);
    });

    return () => {
      cancelled = true;
    };
  }, [serviceSlug]);

  return items;
}

function ServiceFaqSection({ serviceSlug }) {
  const items = useServiceFaqs(serviceSlug);
  const [openIndex, setOpenIndex] = useState(null);

  if (items.length === 0) return null;

  return (
    <section className="faq-ak section">
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

        <div className="faq-ak__list">
          {items.map((item, i) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFaqSection;
