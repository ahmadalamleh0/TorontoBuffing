import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ALL_SERVICES } from "../../data/servicesData";
import { fetchServiceBySlug } from "../../services/cms/services";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import QuoteWizardSection from "../../components/QuoteWizard/QuoteWizardSection";
import RelatedInsightsSection from "../../components/RelatedInsights/RelatedInsightsSection";
import ServiceFaqSection from "../../components/FaqSection/ServiceFaqSection";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import { SERVICE_SEO, buildServiceSchema, buildBreadcrumbSchema } from "../../data/seoData";
import { ServiceHero, ServiceSection } from "./ServiceSections";
import "./ServicePage.css";

// undefined = still loading this slug, null = confirmed not found,
// object = resolved (either from the CMS or src/data/servicesData.js).
function useService(slug) {
  const [service, setService] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    setService(undefined);

    fetchServiceBySlug(slug).then((row) => {
      if (cancelled) return;
      if (row) {
        setService(row);
        return;
      }
      // Not in the CMS (not configured, not seeded yet, or genuinely
      // doesn't exist) — fall back to the bundled catalogue so
      // existing service pages never go dark.
      setService(ALL_SERVICES.find((s) => s.id === slug) ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return service;
}

function ServicePage() {
  const { slug } = useParams();
  const service = useService(slug);
  const staticSeo = SERVICE_SEO[slug];
  const seoTitle = service?.seo?.title || staticSeo?.title;
  const seoDescription = service?.seo?.description || staticSeo?.description;
  const ogImage = service?.seo?.ogImage || undefined;
  const ogTitle = service?.seo?.ogTitle || undefined;
  const ogDescription = service?.seo?.ogDescription || undefined;
  const canonical = service?.seo?.canonical || undefined;
  const isNoindex = Boolean(service?.seo?.noindex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isLoading = service === undefined;

  return (
    <>
      {service?.page && seoTitle && seoDescription ? (
        <Seo
          title={seoTitle}
          description={seoDescription}
          path={`/services/${slug}`}
          image={ogImage}
          ogTitle={ogTitle}
          ogDescription={ogDescription}
          canonical={canonical}
          noIndex={isNoindex}
          jsonLd={[
            buildServiceSchema({ slug, seo: { description: seoDescription }, page: service.page }),
            buildBreadcrumbSchema({ slug, title: service.page.hero.title.replace(/\.$/, "") }),
          ]}
        />
      ) : (
        // Not-yet-built service pages ("Coming Soon") aren't real,
        // crawlable content — keep them out of the index until they
        // have an actual page built for them. Loading is also kept
        // noindex/untitled-safe since it briefly shares this branch.
        <Seo
          title={service ? `${service.title} | Toronto Buffing` : "Service Not Found | Toronto Buffing"}
          description="This Toronto Buffing service page is coming soon."
          path={`/services/${slug}`}
          noIndex
        />
      )}
      <NovaNavbar />
      <main>
        {isLoading ? null : service?.page ? (
          <>
            <ServiceHero hero={service.page.hero} variant="service" />
            {service.page.sections.map((section, i) => (
              <ServiceSection section={section} key={i} />
            ))}
            <QuoteWizardSection />
            <RelatedInsightsSection relatedService={slug} />
            <ServiceFaqSection serviceSlug={slug} />
          </>
        ) : (
          <section className="service-page section">
            <div className="container service-page__inner">
              <span className="eyebrow">Services</span>
              <h1 className="service-page__title">{service ? service.title : "Service Not Found"}</h1>
              <p className="service-page__status">Coming Soon</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ServicePage;
