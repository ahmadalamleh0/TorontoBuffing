import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPostBySlug } from "../../data/blogData";
import { fetchSeoPageBySlug } from "../../services/cms/seoPages";
import BlogCard from "./BlogCard";
import "./BlogSection.css";

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

function legacyToCardShape(post) {
  return {
    slug: post.slug,
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
  };
}

// The homepage "Latest Insights" section is a fixed, hand-picked
// curation, not the newest-published or admin "Featured" articles —
// edit this list directly to change what shows here. Mixes the
// original static posts (data/blogData.js) with CMS Insights by
// slug, in this exact order.
const HOMEPAGE_INSIGHT_SLUGS = ["ppf-vs-ceramic-coating", "how-paint-correction-works", "good-ppf-vs-bad-ppf"];

function useCuratedPosts() {
  const [posts, setPosts] = useState(() =>
    HOMEPAGE_INSIGHT_SLUGS.map((slug) => {
      const legacy = getBlogPostBySlug(slug);
      return legacy ? legacyToCardShape(legacy) : null;
    }).filter(Boolean)
  );

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      HOMEPAGE_INSIGHT_SLUGS.map(async (slug) => {
        const legacy = getBlogPostBySlug(slug);
        if (legacy) return legacyToCardShape(legacy);
        const row = await fetchSeoPageBySlug(slug, "insights");
        return row ? toCardShape(row) : null;
      })
    ).then((cards) => {
      if (cancelled) return;
      const filled = cards.filter(Boolean);
      if (filled.length > 0) setPosts(filled);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}

function BlogSection() {
  const posts = useCuratedPosts();

  return (
    <section id="insights" className="blog-section section">
      <div className="container">
        <div className="blog-section__heading">
          <h2 className="blog-section__title">Latest Insights</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="blog-section__more">
          <Link to="/insights" className="btn-text">
            View All Insights &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
