import ReviewCard from "./ReviewCard";
import "./ReviewMarqueeRow.css";

// Repeat the row's reviews enough times that a single copy's
// rendered width comfortably exceeds any realistic viewport, then
// render that copy twice back-to-back and animate translateX(-50%).
// That's the whole trick: no gaps, no snapping, no per-frame JS —
// just one CSS animation on a track twice the width of what's shown.
function buildLoopSet(reviews) {
  const repeat = Math.max(1, Math.ceil(8 / reviews.length));
  return Array.from({ length: repeat }, () => reviews).flat();
}

/**
 * @param {{
 *   reviews: import('../../types/reviews').Review[],
 *   direction?: "left" | "right",
 *   speedSeconds?: number,
 * }} props
 */
function ReviewMarqueeRow({ reviews, direction = "left", speedSeconds = 45 }) {
  if (reviews.length === 0) return null;

  const loopSet = buildLoopSet(reviews);

  return (
    <div className="review-marquee" data-direction={direction}>
      <div className="review-marquee__track" style={{ animationDuration: `${speedSeconds}s` }}>
        {[0, 1].map((copy) =>
          loopSet.map((review, i) => <ReviewCard key={`${copy}-${review.id}-${i}`} review={review} />),
        )}
      </div>
    </div>
  );
}

export default ReviewMarqueeRow;
