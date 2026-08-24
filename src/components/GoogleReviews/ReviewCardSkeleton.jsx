function ReviewCardSkeleton() {
  return (
    <div className="review-card review-card--skeleton" aria-hidden="true">
      <div className="review-card__header">
        <span className="review-card__avatar review-card__avatar--fallback" />
        <div className="review-card__identity">
          <span className="review-card__skeleton-line" style={{ width: "60%" }} />
          <span className="review-card__skeleton-line" style={{ width: "40%" }} />
        </div>
      </div>
      <span className="review-card__skeleton-line" style={{ width: "100%" }} />
      <span className="review-card__skeleton-line" style={{ width: "85%" }} />
      <span className="review-card__skeleton-line" style={{ width: "45%" }} />
    </div>
  );
}

export default ReviewCardSkeleton;
