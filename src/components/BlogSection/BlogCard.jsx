import { Link } from "react-router-dom";

/**
 * @param {{ post: import('../../data/blogData').BLOG_POSTS[number] }} props
 */
function BlogCard({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="blog-card">
      <div className="blog-card__media">
        <img src={post.image} alt={post.imageAlt} loading="lazy" />
      </div>
      <div className="blog-card__body">
        <p className="blog-card__meta">
          {post.category} <span aria-hidden="true">&middot;</span> {post.dateDisplay}
        </p>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <span className="blog-card__link">
          Read More <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

export default BlogCard;
