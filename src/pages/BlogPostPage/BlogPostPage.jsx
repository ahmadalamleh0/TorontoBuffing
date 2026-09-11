import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import { getBlogPostBySlug } from "../../data/blogData";
import { buildBlogPostSchema, buildBlogBreadcrumbSchema } from "../../data/seoData";
import { fetchSeoPageBySlug } from "../../services/cms/seoPages";
import InsightArticle from "./InsightArticle";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "../ServicePage/ServicePage.css";
import "./BlogPostPage.css";

// undefined = still checking the CMS, null = not found there either,
// object = the seo_pages row.
function useCmsInsight(slug, skip) {
  const [insight, setInsight] = useState(undefined);

  useEffect(() => {
    if (skip) return;
    let cancelled = false;
    setInsight(undefined);

    fetchSeoPageBySlug(slug, "insights").then((row) => {
      if (!cancelled) setInsight(row ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug, skip]);

  return insight;
}

// /insights/:slug serves two sources through one route, not two blog
// engines: the 3 original hand-written posts in src/data/blogData.js
// (checked first, rendered exactly as before — zero risk to content
// that's already indexed) and, for any other slug, a CMS Insight
// (seo_pages, path_prefix "insights") rendered through the same
// ServiceHero/ServiceSection block system every other CMS page uses.
function BlogPostPage() {
  const { slug } = useParams();
  const staticPost = getBlogPostBySlug(slug);
  const cmsInsight = useCmsInsight(slug, Boolean(staticPost));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (staticPost) {
    return (
      <>
        <Seo
          title={`${staticPost.title} | Toronto Buffing`}
          description={staticPost.excerpt}
          path={`/insights/${slug}`}
          type="article"
          jsonLd={[buildBlogPostSchema({ slug, post: staticPost }), buildBlogBreadcrumbSchema({ slug, title: staticPost.title })]}
        />
        <NovaNavbar />
        <main>
          <article className="blog-post section">
            <div className="container blog-post__inner">
              <Link to="/insights" className="blog-post__back">
                &larr; Back to Insights
              </Link>

              <p className="blog-post__meta">{staticPost.category}</p>
              <h1 className="blog-post__title">{staticPost.title}</h1>

              <div className="blog-post__media">
                <img src={staticPost.image} alt={staticPost.imageAlt} loading="eager" fetchPriority="high" />
              </div>

              {staticPost.body.map((block, i) => (
                <section className="blog-post__block" key={i}>
                  <h2 className="blog-post__block-heading">{block.heading}</h2>
                  {block.paragraphs.map((p, j) => (
                    <p className="blog-post__paragraph" key={j}>
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              <div className="blog-post__cta">
                <p className="blog-post__cta-text">Ready to get started?</p>
                <Link to="/#contact" className="btn btn-primary">
                  Start Your Quote
                </Link>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  if (cmsInsight === null) return <NotFoundPage />;
  if (!cmsInsight) return null;

  return <InsightArticle insight={cmsInsight} slug={slug} />;
}

export default BlogPostPage;
