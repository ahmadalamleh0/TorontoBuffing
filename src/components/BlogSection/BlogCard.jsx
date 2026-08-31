import { Link } from "react-router-dom";

/**
 * @param {{ post: import('../../data/blogData').BLOG_POSTS[number] }} props
 */
function BlogCard({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="blog-card">
      <div className="blog-card__media">
        <img src={post.image} alt={post.imageAlt} loading="lazy" />
        <span className="blog-card__read">Read More</span>
      </div>
      <div className="blog-card__body">
        <p className="blog-card__meta">{post.category}</p>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export default BlogCard;
