import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRelatedInsights } from "../../services/cms/seoPages";
import { getRelatedInsightsFromManifest } from "../../data/insightsManifest";
import "./RelatedInsightsSection.css";

// Entirely data driven: which Insights show here is decided by the
// `related_service` field an admin sets per Insight in /admin, never
// a hardcoded list per service page. A service with no matching
// published Insight renders nothing at all — no empty heading, no
// placeholder — exactly per "don't force unrelated content onto every
// page." In local dev, if the live query comes back empty (true for
// all 24 right now, since none are published yet), this falls back to
// the same mapping read from a local manifest purely so the section
// is previewable before publishing — that fallback branch is dev-only
// and never ships (see insightsManifest.js).
function useRelatedInsights(serviceSlug, excludeSlug) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchRelatedInsights(serviceSlug).then((rows) => {
      if (cancelled) return;
      const filtered = rows.filter((r) => r.slug !== excludeSlug);
      if (filtered.length > 0) {
        setItems(filtered);
      } else if (import.meta.env.DEV) {
        setItems(getRelatedInsightsFromManifest(serviceSlug, excludeSlug));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [serviceSlug, excludeSlug]);

  return items;
}

function RelatedInsightsSection({ relatedService, excludeSlug }) {
  const items = useRelatedInsights(relatedService, excludeSlug);

  if (items.length === 0) return null;

  return (
    <section className="related-insights section">
      <div className="container">
        <h2 className="service-heading service-heading--center">Related Insights</h2>
        <div className="related-insights__grid">
          {items.map((item) => (
            <Link key={item.slug} to={`/insights/${item.slug}`} className="related-insights__card">
              <span className="related-insights__card-category">{item.category}</span>
              <h3 className="related-insights__card-title">{item.title}</h3>
              <p className="related-insights__card-excerpt">{item.excerpt || item.seo_description || ""}</p>
              <span className="related-insights__card-link">Read Article &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedInsightsSection;
