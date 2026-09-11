import { useEffect, useState } from "react";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import BlogCard from "../../components/BlogSection/BlogCard";
import { BLOG_POSTS } from "../../data/blogData";
import { fetchPublishedInsights } from "../../services/cms/seoPages";
import "./InsightsHubPage.css";

// A CMS Insight row and a legacy blogData.js post have different
// shapes underneath, but BlogCard only needs these five fields — same
// card, same route (/insights/:slug), regardless of which source an
// article actually came from.
function toCardShape(insight) {
  return {
    slug: insight.slug,
    image: insight.cover_image_url,
    imageAlt: insight.title,
    category: insight.category || "Insights",
    title: insight.title,
    excerpt: insight.excerpt || insight.seo_description || "",
  };
}

function useInsightsList() {
  const [state, setState] = useState({ posts: BLOG_POSTS, ready: false });

  useEffect(() => {
    let cancelled = false;

    fetchPublishedInsights().then((rows) => {
      if (cancelled) return;
      const cmsPosts = rows.filter((r) => r.cover_image_url).map(toCardShape);
      // Legacy posts first (already live/indexed), then published CMS
      // Insights — never an empty hub, and nothing is hidden once an
      // admin actually publishes an Insight.
      setState({ posts: [...BLOG_POSTS, ...cmsPosts], ready: true });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function InsightsHubPage() {
  const { posts } = useInsightsList();
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [activeTab, setActiveTab] = useState("All");

  const effectiveTab = categories.includes(activeTab) ? activeTab : "All";
  const filtered = effectiveTab === "All" ? posts : posts.filter((p) => p.category === effectiveTab);

  return (
    <>
      <Seo
        title="Insights | Toronto Buffing"
        description="Toronto Buffing's knowledge library on paint correction, paint protection film, ceramic coating and vehicle care, written by the studio that does the work."
        path="/insights"
      />
      <NovaNavbar />
      <main>
        <section className="insights-hub section">
          <div className="container insights-hub__inner">
            <span className="eyebrow insights-hub__eyebrow">Toronto Buffing Knowledge Library</span>
            <h1 className="insights-hub__title">Insights</h1>
            <p className="insights-hub__intro">
              Straightforward explanations of paint correction, paint protection film, ceramic coating and vehicle
              care, written by the studio that actually does the work.
            </p>

            {categories.length > 2 && (
              <div className="insights-hub__tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`insights-hub__tab${effectiveTab === cat ? " is-active" : ""}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="blog-grid insights-hub__grid">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default InsightsHubPage;
