import { Link } from "react-router-dom";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import "../ServicePage/ServicePage.css";

// Reuses ServicePage's existing "Coming Soon" placeholder styling
// (.service-page) rather than introducing new CSS for a one-off page.
function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Toronto Buffing"
        description="The page you're looking for doesn't exist or may have moved. Explore Toronto Buffing's paint correction, PPF and ceramic coating services."
        path="/404"
        noIndex
      />
      <NovaNavbar />
      <main>
        <section className="service-page section">
          <div className="container service-page__inner">
            <span className="eyebrow">404</span>
            <h1 className="service-page__title">Page Not Found</h1>
            <p className="service-page__status">
              That page doesn’t exist or may have moved.{" "}
              <Link to="/" className="btn-text">
                Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
