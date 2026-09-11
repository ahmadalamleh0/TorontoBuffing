import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import QuoteWizardSection from "../../components/QuoteWizard/QuoteWizardSection";
import Seo from "../../components/Seo/Seo";
import { ServiceHero, ServiceSection } from "../ServicePage/ServiceSections";
import { PREVIEW_GEO_PAGES } from "./previewGeoPagesData";
import "../ServicePage/ServicePage.css";

// Dev-only visual QA harness for the geo-page launch batch — renders
// the exact same ServiceHero/ServiceSection components the real
// /pages/:slug route uses (see SeoPage.jsx), but from the local data
// file above instead of Supabase, so it needs no database connection
// or credentials at all. Not a stand-in for the real route: it skips
// the publish/fetch step entirely, on purpose.
//
// Kept out of production by construction, not just by convention: the
// only route that mounts this (see App.jsx) is itself wrapped in
// `if (import.meta.env.DEV)`, so this whole module — page, route,
// nav link — is dead code Vite strips from a production build. It
// cannot end up live, indexable, or linked from anywhere on the real
// site. Seo still forces noIndex below as a second, redundant layer,
// in case this file is ever reused somewhere that isn't dev-gated.
function PreviewGeoPageIndex() {
  return (
    <>
      <Seo title="Geo Page Preview (Dev Only)" description="" path="/preview/geo" noIndex />
      <NovaNavbar />
      <main>
        <section className="service-page section" style={{ minHeight: "60svh" }}>
          <div className="container service-page__inner">
            <span className="eyebrow">Dev Preview — Not Published</span>
            <h1 className="service-page__title">Launch Batch Preview</h1>
            <p className="service-page__status">
              Renders through the real SEO Page template, offline, with no Supabase connection. Pick a page:
            </p>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "24px", display: "grid", gap: "12px" }}>
              {PREVIEW_GEO_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link to={`/preview/geo/${page.slug}`} className="btn-text">
                    {page.title} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PreviewGeoPageDetail() {
  const { slug } = useParams();
  const page = PREVIEW_GEO_PAGES.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <>
        <Seo title="Preview Not Found" description="" path={`/preview/geo/${slug}`} noIndex />
        <NovaNavbar />
        <main>
          <section className="service-page section">
            <div className="container service-page__inner">
              <span className="eyebrow">Dev Preview</span>
              <h1 className="service-page__title">No preview data for &ldquo;{slug}&rdquo;</h1>
              <p className="service-page__status">
                <Link to="/preview/geo" className="btn-text">
                  Back to preview index
                </Link>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo title={page.seo_title || page.title} description={page.seo_description || ""} path={`/preview/geo/${page.slug}`} noIndex />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#111",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "12px",
          padding: "6px 14px",
          textAlign: "center",
        }}
      >
        DEV PREVIEW — NOT PUBLISHED — will live at /pages/{page.slug}
      </div>
      <NovaNavbar />
      <main>
        <ServiceHero hero={{ title: page.title, copy: "", centered: true, ...page.hero }} />
        {(page.sections ?? []).map((section, i) => (
          <ServiceSection section={section} key={i} />
        ))}
        <QuoteWizardSection />
      </main>
      <Footer />
    </>
  );
}

export function PreviewGeoPages() {
  const { slug } = useParams();
  return slug ? <PreviewGeoPageDetail /> : <PreviewGeoPageIndex />;
}

export default PreviewGeoPages;
