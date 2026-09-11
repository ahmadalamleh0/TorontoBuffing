import { useEffect, useState } from "react";
import IntroAnimation from "../components/IntroAnimation/IntroAnimation";
import NovaNavbar from "../components/NovaNavbar/NovaNavbar";
import Hero from "../components/Hero/Hero";
import BrandStatement from "../components/BrandStatement/BrandStatement";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import GoogleReviewsSection from "../components/GoogleReviews/GoogleReviewsSection";
import StatsSection from "../components/StatsSection/StatsSection";
import ServiceAreasSection from "../components/ServiceAreasSection/ServiceAreasSection";
import ImageBanner from "../components/ImageBanner/ImageBanner";
import SelectedWorkSection from "../components/SelectedWorkSection/SelectedWorkSection";
import TextReveal from "../components/TextReveal/TextReveal";
import LocationSection from "../components/LocationSection/LocationSection";
import QuoteWizardSection from "../components/QuoteWizard/QuoteWizardSection";
import InstagramSection from "../components/InstagramSection/InstagramSection";
import BlogSection from "../components/BlogSection/BlogSection";
import FaqSection from "../components/FaqSection/FaqSection";
import Footer from "../components/Footer/Footer";
import Seo from "../components/Seo/Seo";
import { HOME_SEO, buildLocalBusinessSchema } from "../data/seoData";
import { fetchHomePageContent } from "../services/cms/pages";
import "./HomePage.css";

// One-shot fetch of the homepage's CMS row (Hero/BrandStatement/
// TextReveal/ImageBanner text + Stats numbers). Hero/BrandStatement/
// TextReveal/ImageBanner render immediately with their own bundled
// defaults and just re-render once this resolves — a harmless text
// swap, since none of them drive an animation off their own text.
// StatsSection is the one exception (its GSAP count-up reads target
// values once, on mount) so HomePage waits for `ready` before
// mounting it at all, capped at HOME_CONTENT_TIMEOUT_MS so a slow or
// unreachable database never hides the stats section for long.
const HOME_CONTENT_TIMEOUT_MS = 1200;

function useHomeContent() {
  const [state, setState] = useState({ content: null, ready: false });

  useEffect(() => {
    let settled = false;

    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      setState((current) => ({ ...current, ready: true }));
    }, HOME_CONTENT_TIMEOUT_MS);

    fetchHomePageContent().then((data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      setState({ content: data, ready: true });
    });

    return () => clearTimeout(timeoutId);
  }, []);

  return state;
}

// Service pages link back here with "/#contact" (the quote wizard
// only exists on the homepage) — a plain hash on load doesn't
// auto-scroll on its own once React has mounted, so nudge it once.
// Scrolling immediately on mount lands short: this is client-side
// SPA navigation, so `document.readyState` is already "complete"
// from the very first page load — it never re-fires — while images
// further down THIS page (hero, cards, reviews) are still fetching
// and keep growing the document's height after the jump. Re-scroll
// whenever the page's height changes, for a few seconds, so the
// landing position converges once images finish loading in.
function useScrollToHashOnMount() {
  useEffect(() => {
    if (!window.location.hash) return;

    const scrollToHash = () => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHash();

    const observer = new ResizeObserver(scrollToHash);
    observer.observe(document.body);
    const stopObserving = setTimeout(() => observer.disconnect(), 2500);

    return () => {
      observer.disconnect();
      clearTimeout(stopObserving);
    };
  }, []);
}

function HomePage() {
  useScrollToHashOnMount();
  const { content: homeContent, ready: homeReady } = useHomeContent();

  return (
    <>
      <Seo
        title={homeContent?.seo_title || HOME_SEO.title}
        description={homeContent?.seo_description || HOME_SEO.description}
        path="/"
        image={homeContent?.og_image_url || undefined}
        ogTitle={homeContent?.og_title || undefined}
        ogDescription={homeContent?.og_description || undefined}
        canonical={homeContent?.canonical_url || undefined}
        jsonLd={[buildLocalBusinessSchema()]}
      />
      <IntroAnimation />
      <NovaNavbar />
      <main>
        <Hero content={homeContent?.hero} />
        <BrandStatement content={homeContent?.brand_statement} />
        <ServicesSection />
        <TextReveal content={homeContent?.text_reveal} />
        <ImageBanner content={homeContent?.image_banner} />
        <SelectedWorkSection />
        <QuoteWizardSection />
        <div className="dark-showcase">
          <GoogleReviewsSection />
          {homeReady && <StatsSection content={homeContent?.stats} />}
        </div>
        <ServiceAreasSection />
        <LocationSection />
        <FaqSection />
        <InstagramSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
