import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import { getBlogPostBySlug } from "../../data/blogData";
import { buildBlogPostSchema, buildBlogBreadcrumbSchema } from "../../data/seoData";
import "../ServicePage/ServicePage.css";
import "./BlogPostPage.css";

function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <>
        <Seo
          title="Article Not Found | Toronto Buffing"
          description="This Toronto Buffing article couldn't be found."
          path={`/insights/${slug}`}
          noIndex
        />
        <NovaNavbar />
        <main>
          <section className="service-page section">
            <div className="container service-page__inner">
              <span className="eyebrow">Insights</span>
              <h1 className="service-page__title">Article Not Found</h1>
              <p className="service-page__status">
                That article doesn’t exist or may have moved.{" "}
                <Link to="/#insights" className="btn-text">
                  Back to Insights
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
      <Seo
        title={`${post.title} | Toronto Buffing`}
        description={post.excerpt}
        path={`/insights/${slug}`}
        type="article"
        jsonLd={[buildBlogPostSchema({ slug, post }), buildBlogBreadcrumbSchema({ slug, title: post.title })]}
      />
      <NovaNavbar />
      <main>
        <article className="blog-post section">
          <div className="container blog-post__inner">
            <Link to="/#insights" className="blog-post__back">
              &larr; Back to Insights
            </Link>

            <p className="blog-post__meta">{post.category}</p>
            <h1 className="blog-post__title">{post.title}</h1>

            <div className="blog-post__media">
              <img src={post.image} alt={post.imageAlt} loading="eager" fetchPriority="high" />
            </div>

            {post.body.map((block, i) => (
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

export default BlogPostPage;
