import { Link } from "react-router-dom";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import { buildBlogPostSchema, buildBlogBreadcrumbSchema } from "../../data/seoData";
import { ServiceHero, ServiceSection } from "../ServicePage/ServiceSections";
import QuoteWizardSection from "../../components/QuoteWizard/QuoteWizardSection";
import RelatedInsightsSection from "../../components/RelatedInsights/RelatedInsightsSection";
import { ALL_SERVICES } from "../../data/servicesData";

/**
 * Renders one CMS Insight (seo_pages, path_prefix "insights") — hero,
 * sections, related-service CTA, Related Insights, quote CTA. The one
 * and only place this markup exists, so the real published route
 * (BlogPostPage) and the dev-only draft preview (PreviewInsights) are
 * guaranteed pixel-identical: a draft previewed locally looks exactly
 * like what publishing it will actually produce.
 *
 * @param {{
 *   insight: object,        // seo_pages row, path_prefix "insights"
 *   slug: string,
 *   path?: string,           // canonical path for Seo; defaults to the public /insights/:slug URL
 *   backHref?: string,       // "Back to Insights" target; the preview route points this at itself
 *   forceNoIndex?: boolean,  // dev preview's second safety layer, independent of insight.noindex
 * }} props
 */
function InsightArticle({ insight, slug, path, backHref = "/insights", forceNoIndex = false }) {
  const relatedService = ALL_SERVICES.find((s) => s.id === insight.related_service);

  return (
    <>
      <Seo
        title={insight.seo_title || insight.title}
        description={insight.seo_description || insight.excerpt || ""}
        path={path || `/insights/${slug}`}
        type="article"
        image={insight.og_image_url || insight.cover_image_url || undefined}
        ogTitle={insight.og_title || undefined}
        ogDescription={insight.og_description || undefined}
        canonical={insight.canonical_url || undefined}
        noIndex={forceNoIndex || Boolean(insight.noindex)}
        jsonLd={[
          buildBlogPostSchema({
            slug,
            post: {
              title: insight.title,
              excerpt: insight.seo_description || insight.excerpt || "",
              date: insight.updated_at,
            },
          }),
          buildBlogBreadcrumbSchema({ slug, title: insight.title }),
        ]}
      />
      <NovaNavbar />
      <main>
        <div className="blog-post__back-bar container">
          <Link to={backHref} className="blog-post__back">
            &larr; Back to Insights
          </Link>
          {insight.category && <span className="blog-post__meta blog-post__meta--pill">{insight.category}</span>}
        </div>

        <ServiceHero hero={{ title: insight.title, copy: "", centered: true, ...insight.hero }} />
        {(insight.sections ?? []).map((section, i) => (
          <ServiceSection section={section} key={i} />
        ))}

        {relatedService && (
          <section className="blog-post-service-cta section">
            <div className="container blog-post-service-cta__inner">
              <p className="blog-post-service-cta__label">Related Service</p>
              <Link to={`/services/${relatedService.id}`} className="blog-post-service-cta__link">
                {relatedService.title} &rarr;
              </Link>
            </div>
          </section>
        )}

        <RelatedInsightsSection relatedService={insight.related_service} excludeSlug={slug} />

        <QuoteWizardSection />
      </main>
      <Footer />
    </>
  );
}

export default InsightArticle;
