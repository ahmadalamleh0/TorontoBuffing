import { useState } from "react";
import GoogleLogo from "./GoogleLogo";
import StarRating from "./StarRating";
import "./ReviewCard.css";

const TRUNCATE_LENGTH = 200;

const yearFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });

function formatYear(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  return yearFormatter.format(date);
}

function initialFrom(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "G";
}

/**
 * @param {{ review: import('../../types/reviews').Review }} props
 */
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);

  const hasComment = review.comment && review.comment.trim().length > 0;
  const isLong = hasComment && review.comment.length > TRUNCATE_LENGTH;
  const year = formatYear(review.createTime);
  const metaLabel = year ? `Google Review / ${year}` : "Google Review";

  return (
    <article className="review-card">
      <header className="review-card__header">
        {review.reviewerPhoto ? (
          <img
            className="review-card__avatar"
            src={review.reviewerPhoto}
            alt=""
            loading="lazy"
            width={40}
            height={40}
          />
        ) : (
          <span className="review-card__avatar review-card__avatar--fallback" aria-hidden="true">
            {initialFrom(review.reviewerName)}
          </span>
        )}

        <div className="review-card__identity">
          {review.reviewerProfileUrl ? (
            <a
              className="review-card__name"
              href={review.reviewerProfileUrl}
              target="_blank"
              rel="noreferrer"
            >
              {review.reviewerName}
            </a>
          ) : (
            <span className="review-card__name">{review.reviewerName}</span>
          )}
          <StarRating rating={review.rating} size="sm" />
        </div>

        <GoogleLogo className="review-card__google-mark" size={16} />
      </header>

      {hasComment ? (
        <p
          className={
            isLong && !expanded ? "review-card__comment review-card__comment--clamped" : "review-card__comment"
          }
        >
          {review.comment}
        </p>
      ) : (
        <p className="review-card__comment review-card__comment--empty">
          Left a rating without a written review.
        </p>
      )}

      {isLong && (
        <button
          type="button"
          className="review-card__read-more"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <span className="review-card__date">{metaLabel}</span>
    </article>
  );
}

export default ReviewCard;
