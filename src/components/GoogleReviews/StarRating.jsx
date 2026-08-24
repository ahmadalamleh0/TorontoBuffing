import "./StarRating.css";

const STARS = "★★★★★";

// Two stacked star strings; the filled layer is clipped to a width
// percentage so fractional ratings (e.g. 4.9) render a partial star.
function StarRating({ rating = 0, size = "md" }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const fillPercent = (clamped / 5) * 100;

  return (
    <span
      className={`star-rating star-rating--${size}`}
      role="img"
      aria-label={`${clamped.toFixed(1)} out of 5 stars`}
    >
      <span className="star-rating__track" aria-hidden="true">
        {STARS}
      </span>
      <span
        className="star-rating__fill"
        aria-hidden="true"
        style={{ width: `${fillPercent}%` }}
      >
        {STARS}
      </span>
    </span>
  );
}

export default StarRating;
