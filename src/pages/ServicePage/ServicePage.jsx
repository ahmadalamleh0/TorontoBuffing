import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ALL_SERVICES } from "../../data/servicesData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import "./ServicePage.css";

function ServicePage() {
  const { slug } = useParams();
  const service = ALL_SERVICES.find((s) => s.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Header />
      <main>
        <section className="service-page section">
          <div className="container service-page__inner">
            <span className="eyebrow">Services</span>
            <h1 className="service-page__title">{service ? service.title : "Service Not Found"}</h1>
            <p className="service-page__status">Coming Soon</p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default ServicePage;
