import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import BrandStatement from "../components/BrandStatement/BrandStatement";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import GoogleReviewsSection from "../components/GoogleReviews/GoogleReviewsSection";
import ImageBanner from "../components/ImageBanner/ImageBanner";
import LocationSection from "../components/LocationSection/LocationSection";
import QuoteWizardSection from "../components/QuoteWizard/QuoteWizardSection";
import Footer from "../components/Footer/Footer";
import IntroAnimation from "../components/IntroAnimation/IntroAnimation";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";

function HomePage() {
  return (
    <>
      <IntroAnimation />
      <Header />
      <main>
        <Hero />
        <BrandStatement />
        <ServicesSection />
        <GoogleReviewsSection />
        <ImageBanner />
        <QuoteWizardSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default HomePage;
