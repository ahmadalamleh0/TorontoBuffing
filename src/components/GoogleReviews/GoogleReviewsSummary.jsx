import GoogleLogo from "./GoogleLogo";
import StarRating from "./StarRating";
import "./GoogleReviewsSummary.css";

/**
 * @param {{
 *   averageRating: number | null,
 *   totalReviewCount: number | null,
 *   writeReviewUrl: string | null,
 *   isLoading: boolean,
 * }} props
 */
function GoogleReviewsSummary({ averageRating, totalReviewCount, writeReviewUrl }) {
  const ratingVal = averageRating ?? 5.0;
  const countVal = totalReviewCount ?? 397;

  return (
    <div className="reviews-bar">
      <div className="reviews-bar__content">
        {/* Official Google G Logo & Brand Name */}
        <div className="reviews-bar__brand">
          <GoogleLogo size={20} className="reviews-bar__google-logo" />
          <span className="reviews-bar__brand-name">Google</span>
        </div>

        <span className="reviews-bar__dot" aria-hidden="true">·</span>

        {/* Solid Gold Stars */}
        <div className="reviews-bar__stars">
          <StarRating rating={ratingVal} size="md" />
        </div>

        <span className="reviews-bar__dot" aria-hidden="true">·</span>

        {/* Numerical rating score */}
        <span className="reviews-bar__score">{ratingVal.toFixed(1)}</span>

        <span className="reviews-bar__dot" aria-hidden="true">·</span>

        {/* Review count */}
        <span className="reviews-bar__count">{countVal.toLocaleString()} reviews</span>
      </div>

      {writeReviewUrl && (
        <a href={writeReviewUrl} target="_blank" rel="noreferrer" className="reviews-bar__cta">
          Write a review
        </a>
      )}
    </div>
  );
}

export default GoogleReviewsSummary;
