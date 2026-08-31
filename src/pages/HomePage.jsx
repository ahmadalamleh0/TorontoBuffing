import { useEffect } from "react";
import IntroAnimation from "../components/IntroAnimation/IntroAnimation";
import NovaNavbar from "../components/NovaNavbar/NovaNavbar";
import Hero from "../components/Hero/Hero";
import BrandStatement from "../components/BrandStatement/BrandStatement";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import GoogleReviewsSection from "../components/GoogleReviews/GoogleReviewsSection";
import StatsSection from "../components/StatsSection/StatsSection";
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
import { HOME_SEO, buildLocalBusinessSchema, buildFaqPageSchema } from "../data/seoData";
import "./HomePage.css";

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

  return (
    <>
      <Seo
        title={HOME_SEO.title}
        description={HOME_SEO.description}
        path="/"
        jsonLd={[buildLocalBusinessSchema(), buildFaqPageSchema()]}
      />
      <IntroAnimation />
      <NovaNavbar />
      <main>
        <Hero />
        <BrandStatement />
        <ServicesSection />
        <TextReveal />
        <ImageBanner />
        <SelectedWorkSection />
        <QuoteWizardSection />
        <div className="dark-showcase">
          <GoogleReviewsSection />
          <StatsSection />
        </div>
        <LocationSection />
        <InstagramSection />
        <BlogSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
