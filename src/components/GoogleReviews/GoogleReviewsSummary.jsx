import GoogleLogo from "./GoogleLogo";
import StarRating from "./StarRating";
import "./GoogleReviewsSummary.css";

/**
 * @param {{
 *   averageRating: number | null,
 *   totalReviewCount: number | null,
 *   writeReviewUrl: string | null,
 *   mapsUrl: string | null,
 *   isLoading: boolean,
 * }} props
 */
function GoogleReviewsSummary({ averageRating, totalReviewCount, writeReviewUrl, mapsUrl, isLoading }) {
  return (
    <div className="reviews-summary">
      <div className="reviews-summary__rating">
        <StarRating rating={averageRating ?? 0} size="md" />
        <span className="reviews-summary__value">
          {isLoading ? "…" : averageRating != null ? averageRating.toFixed(1) : "N/A"}
        </span>
        <span className="reviews-summary__sep" aria-hidden="true">
          •
        </span>
        <span className="reviews-summary__count">
          {isLoading
            ? "Loading reviews…"
            : totalReviewCount != null
              ? `${totalReviewCount.toLocaleString()} Google Reviews`
              : "Review count unavailable"}
        </span>
        <GoogleLogo size={16} className="reviews-summary__mark" />
      </div>

      <div className="reviews-summary__actions">
        {writeReviewUrl && (
          <a href={writeReviewUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            Write a Review
          </a>
        )}
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-text">
            View All Reviews
          </a>
        )}
      </div>
    </div>
  );
}

export default GoogleReviewsSummary;
