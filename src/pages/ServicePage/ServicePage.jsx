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

// undefined here specifically means "no local fallback for this slug,
// still waiting on the CMS" — kept distinct from `null` (confirmed not
// found anywhere) so a slug that only exists in the CMS still shows a
// loading state instead of flashing "not found" before its fetch
// resolves.
function localFallback(slug) {
  return ALL_SERVICES.find((s) => s.id === slug) ?? undefined;
}

// Swapping `service` straight to the freshly-fetched CMS row (once the
// fallback above is already showing) changes the hero <img>'s src to
// a different URL — the browser has to fetch and decode that image
// from scratch, and img.currentSrc reads as empty for a frame or two
// while that happens, which read as the hero image "disappearing" on
// a slow connection even after the initial-render gap was fixed.
// Preloading it off-screen first means the swap only ever happens
// once the new image is already decoded and cache-hot, so the visible
// <img> never has a moment with nothing to paint. Resolves regardless
// of success/failure/timeout — a slow or broken image must never
// block the rest of the CMS row (title, copy, sections) from landing.
function preloadImage(src, timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    setTimeout(done, timeoutMs);
    img.src = src;
  });
}

// undefined = still loading this slug, null = confirmed not found,
// object = resolved (either from the CMS or src/data/servicesData.js).
//
// Seeds state with the bundled catalogue entry (a synchronous local
// lookup, no network round trip) instead of starting every slug at
// `undefined`, so the 7 services that have one get something real to
// paint on the very first render — image, title, copy already
// correct — instead of rendering nothing at all for however long the
// CMS fetch takes. That gap (previously: blank <main> until
// fetchServiceBySlug resolved) is what actually caused the hero to
// "disappear" on slower connections; it wasn't reliably reproducible
// locally because localhost fetches resolve near-instantly. The CMS
// fetch still runs every time and silently upgrades `service` once it
// resolves, so content edited in /admin still reaches the page — this
// only removes the empty-state window while waiting for it.
function useService(slug) {
  const [service, setService] = useState(() => localFallback(slug));

  useEffect(() => {
    let cancelled = false;
    setService(localFallback(slug));

    fetchServiceBySlug(slug).then(async (row) => {
      if (cancelled) return;
      if (row) {
        await preloadImage(row.page?.hero?.image);
        if (cancelled) return;
        setService(row);
        return;
      }
      // Not in the CMS (not configured, not seeded yet, or genuinely
      // doesn't exist) — the local fallback set above already covers
      // the slugs that have one; anything else is confirmed missing.
      setService((current) => current ?? null);
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
