import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSeoPageBySlug } from "../../services/cms/seoPages";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import QuoteWizardSection from "../../components/QuoteWizard/QuoteWizardSection";
import Seo from "../../components/Seo/Seo";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { ServiceHero, ServiceSection } from "../ServicePage/ServiceSections";
import "../ServicePage/ServicePage.css";

// undefined = still loading this slug, null = not found/unpublished,
// object = the seo_pages row.
function useSeoPage(slug, pathPrefix) {
  const [page, setPage] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    setPage(undefined);

    fetchSeoPageBySlug(slug, pathPrefix).then((row) => {
      if (!cancelled) setPage(row ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug, pathPrefix]);

  return page;
}

// Renders any CMS-created SEO page through the exact same ServiceHero/
// ServiceSection block renderer the built-in /services/:slug pages
// use (src/pages/ServicePage/ServiceSections.jsx) — see that file for
// the list of section types the admin's block editor can compose. No
// page-specific layout code is ever added here.
//
// `pathPrefix` ("pages" or "service-areas") is passed by App.jsx based
// on which route matched — it's what keeps a page scoped to the one
// URL it actually lives at (see fetchSeoPageBySlug's doc comment).
function SeoPage({ pathPrefix = "pages" }) {
  const { slug } = useParams();
  const page = useSeoPage(slug, pathPrefix);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (page === null) return <NotFoundPage />;

  return (
    <>
      {page && (
        <Seo
          title={page.seo_title || page.title}
          description={page.seo_description || ""}
          path={`/${pathPrefix}/${slug}`}
          image={page.og_image_url || undefined}
          ogTitle={page.og_title || undefined}
          ogDescription={page.og_description || undefined}
          canonical={page.canonical_url || undefined}
          noIndex={Boolean(page.noindex)}
        />
      )}
      <NovaNavbar />
      <main>
        {page && (
          <>
            <ServiceHero hero={{ title: page.title, copy: "", centered: true, ...page.hero }} />
            {(page.sections ?? []).map((section, i) => (
              <ServiceSection section={section} key={i} />
            ))}
            <QuoteWizardSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SeoPage;
