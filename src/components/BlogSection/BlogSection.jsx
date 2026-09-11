import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../../data/blogData";
import { fetchFeaturedInsights } from "../../services/cms/seoPages";
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

// Featured Insights are controlled entirely from /admin (the
// "Featured" checkbox on an Insight, up to 3 shown here in
// display_order) — this never hardcodes which articles appear. If no
// Insight is marked featured yet (true today: none of the 24 drafts
// are published), it falls back to the original 3 posts rather than
// showing an empty homepage section.
function useFeaturedPosts() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    let cancelled = false;

    fetchFeaturedInsights(3).then((rows) => {
      if (cancelled || rows.length === 0) return;
      const withCover = rows.filter((r) => r.cover_image_url);
      if (withCover.length > 0) setPosts(withCover.map(toCardShape));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}

function BlogSection() {
  const posts = useFeaturedPosts();

  return (
    <section id="insights" className="blog-section section">
      <div className="container">
        <div className="blog-section__heading">
          <span className="eyebrow">From The Shop</span>
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
