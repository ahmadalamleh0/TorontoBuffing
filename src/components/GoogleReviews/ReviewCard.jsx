import { useState } from "react";
import GoogleLogo from "./GoogleLogo";
import StarRating from "./StarRating";
import "./ReviewCard.css";

const TRUNCATE_LENGTH = 200;

function initialFrom(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "G";
}

// Google's own "verified" treatment for genuine reviews — a filled
// blue circle with a white check, matching the reference design.
function VerifiedBadge() {
  return (
    <svg
      className="review-card__verified"
      viewBox="0 0 16 16"
      role="img"
      aria-label="Verified review"
    >
      <circle cx="8" cy="8" r="8" fill="var(--color-accent-on-dark)" />
      <path
        d="M4.5 8.2l2.2 2.2 4.8-4.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @param {{ review: import('../../types/reviews').Review }} props
 */
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);

  const hasComment = review.comment && review.comment.trim().length > 0;
  const isLong = hasComment && review.comment.length > TRUNCATE_LENGTH;

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
          <span className="review-card__rating-row">
            <StarRating rating={review.rating} size="sm" />
            <VerifiedBadge />
          </span>
        </div>

        <GoogleLogo className="review-card__google-mark" size={18} />
      </header>

      <div className="review-card__body">
        <div className="review-card__text-col">
          {hasComment ? (
            <p
              className={
                isLong && !expanded
                  ? "review-card__comment review-card__comment--clamped"
                  : "review-card__comment"
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
        </div>

        {review.reviewImage && (
          <img className="review-card__media" src={review.reviewImage} alt="" loading="lazy" />
        )}
      </div>
    </article>
  );
}

export default ReviewCard;
