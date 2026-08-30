import IntroAnimation from "../components/IntroAnimation/IntroAnimation";
import NovaNavbar from "../components/NovaNavbar/NovaNavbar";
import Hero from "../components/Hero/Hero";
import BrandStatement from "../components/BrandStatement/BrandStatement";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import GoogleReviewsSection from "../components/GoogleReviews/GoogleReviewsSection";
import StatsSection from "../components/StatsSection/StatsSection";
import ImageBanner from "../components/ImageBanner/ImageBanner";
import SelectedWorkSection from "../components/SelectedWorkSection/SelectedWorkSection";
import LocationSection from "../components/LocationSection/LocationSection";
import QuoteWizardSection from "../components/QuoteWizard/QuoteWizardSection";
import FaqSection from "../components/FaqSection/FaqSection";
import Footer from "../components/Footer/Footer";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";

function HomePage() {
  return (
    <>
      <IntroAnimation />
      <NovaNavbar />
      <main>
        <Hero />
        <BrandStatement />
        <ServicesSection />
        <GoogleReviewsSection />
        <StatsSection />
        <ImageBanner />
        <SelectedWorkSection />
        <QuoteWizardSection />
        <LocationSection />
        <FaqSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default HomePage;
