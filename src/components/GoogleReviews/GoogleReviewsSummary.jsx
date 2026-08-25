import GoogleWordmark from "./GoogleWordmark";
import StarRating from "./StarRating";
import "./GoogleReviewsSummary.css";

// Matches Google's own qualitative labeling convention closely enough
// for a marketing summary bar — this isn't pulled from the API.
function ratingLabelFor(rating) {
  if (rating == null) return null;
  if (rating >= 4.5) return "Excellent";
  if (rating >= 3.5) return "Great";
  if (rating >= 2.5) return "Good";
  return "Average";
}

/**
 * @param {{
 *   averageRating: number | null,
 *   totalReviewCount: number | null,
 *   writeReviewUrl: string | null,
 *   isLoading: boolean,
 * }} props
 */
function GoogleReviewsSummary({ averageRating, totalReviewCount, writeReviewUrl, isLoading }) {
  const label = ratingLabelFor(averageRating);

  return (
    <div className="reviews-bar">
      <div className="reviews-bar__info">
        <GoogleWordmark className="reviews-bar__logo" />
        {isLoading ? (
          <span className="reviews-bar__loading">Loading reviews…</span>
        ) : (
          <>
            {label && <span className="reviews-bar__label">{label}</span>}
            <StarRating rating={averageRating ?? 0} size="md" />
            {averageRating != null && (
              <span className="reviews-bar__value">{averageRating.toFixed(1)}</span>
            )}
            {totalReviewCount != null && (
              <>
                <span className="reviews-bar__sep" aria-hidden="true">
                  |
                </span>
                <span className="reviews-bar__count">{totalReviewCount.toLocaleString()} reviews</span>
              </>
            )}
          </>
        )}
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
