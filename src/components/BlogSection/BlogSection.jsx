import { BLOG_POSTS } from "../../data/blogData";
import BlogCard from "./BlogCard";
import "./BlogSection.css";

function BlogSection() {
  return (
    <section id="insights" className="blog-section section">
      <div className="container">
        <div className="blog-section__heading">
          <span className="eyebrow">From The Shop</span>
          <h2 className="blog-section__title">Latest Insights</h2>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
