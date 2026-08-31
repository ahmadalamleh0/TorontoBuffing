import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ALL_SERVICES } from "../../data/servicesData";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import { SERVICE_SEO, buildServiceSchema, buildBreadcrumbSchema } from "../../data/seoData";
import { ServiceHero, ServiceSection, ServiceCta } from "./ServiceSections";
import "./ServicePage.css";

function ServicePage() {
  const { slug } = useParams();
  const service = ALL_SERVICES.find((s) => s.id === slug);
  const seo = SERVICE_SEO[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      {service?.page && seo ? (
        <Seo
          title={seo.title}
          description={seo.description}
          path={`/services/${slug}`}
          jsonLd={[
            buildServiceSchema({ slug, seo, page: service.page }),
            buildBreadcrumbSchema({ slug, title: service.page.hero.title.replace(/\.$/, "") }),
          ]}
        />
      ) : (
        // Not-yet-built service pages ("Coming Soon") aren't real,
        // crawlable content — keep them out of the index until they
        // have an actual page built for them.
        <Seo
          title={service ? `${service.title} | Toronto Buffing` : "Service Not Found | Toronto Buffing"}
          description="This Toronto Buffing service page is coming soon."
          path={`/services/${slug}`}
          noIndex
        />
      )}
      <NovaNavbar />
      <main>
        {service?.page ? (
          <>
            <ServiceHero hero={service.page.hero} />
            {service.page.sections.map((section, i) => (
              <ServiceSection section={section} key={i} />
            ))}
            <ServiceCta cta={service.page.cta} />
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
