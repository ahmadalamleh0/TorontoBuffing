import { useEffect, useRef, useState } from "react";
import { fetchGoogleReviews, mergeManualReviews, selectFeaturedReviews } from "../../services/reviewsService";
import { fetchPublishedReviews } from "../../services/cms/reviews";
import { MANUAL_REVIEWS } from "../../data/manualReviews";
import { SAMPLE_REVIEWS_SUMMARY } from "../../data/sampleReviews";
import GoogleReviewsSummary from "./GoogleReviewsSummary";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import ReviewMarqueeRow from "./ReviewMarqueeRow";
import "./GoogleReviewsSection.css";

const SKELETON_COUNT = 4;

// Used when the live Places request fails in production — no rating,
// count, or links to enrich the bar with, but reviews still gets
// filled in by mergeManualReviews so the curated cards always render.
const EMPTY_LIVE_SUMMARY = {
  averageRating: null,
  totalReviewCount: null,
  mapsUrl: null,
  writeReviewUrl: null,
  reviews: [],
};

function useSectionReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useMatchMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function GoogleReviewsSection() {
  const [state, setState] = useState({ status: "loading", data: null, isSample: false });
  const sectionRef = useSectionReveal();
  const isMobile = useMatchMedia("(max-width: 767px)");
  const prefersReducedMotion = useMatchMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const controller = new AbortController();

    // Curated reviews (CMS `reviews` table, falling back to
    // manualReviews.js) and the live Google Places summary are
    // independent — fetch both in parallel and merge once both have
    // settled, rather than letting one block the other.
    Promise.allSettled([fetchGoogleReviews({ signal: controller.signal }), fetchPublishedReviews()]).then(
      ([liveResult, manualResult]) => {
        if (controller.signal.aborted) return;

        const manualReviews =
          manualResult.status === "fulfilled" && manualResult.value?.length ? manualResult.value : MANUAL_REVIEWS;

        if (liveResult.status === "fulfilled") {
          const merged = mergeManualReviews(liveResult.value, manualReviews);
          setState({ status: "ready", data: merged, isSample: false });
          return;
        }

        // The live Places request only ever *enriches* this section
        // (rating, review count, reviewer profile data, links) — the
        // curated reviews must render regardless of whether that
        // request succeeds. So a failure here never drops to an error
        // state; it just merges the curated reviews onto an empty
        // summary instead of the live one, same design either way.
        console.error(
          "[GoogleReviewsSection] Live /api/google-reviews request failed — showing curated reviews without " +
            "live rating/count/links. Error:",
          liveResult.reason,
        );

        // Dev-only: also lets the section preview with a rating/count
        // instead of the section looking rating-less locally.
        const baseSummary = import.meta.env.DEV ? SAMPLE_REVIEWS_SUMMARY : EMPTY_LIVE_SUMMARY;
        const merged = mergeManualReviews(baseSummary, manualReviews);
        setState({ status: "ready", data: merged, isSample: import.meta.env.DEV });
      },
    );

    return () => controller.abort();
  }, []);

  const isLoading = state.status === "loading";
  // Only reviews with both written text and a customer-uploaded photo
  // are featured here — see reviewsService.selectFeaturedReviews.
  const reviews = selectFeaturedReviews(state.data?.reviews ?? []);
  const showRows = !isLoading && reviews.length > 0 && !prefersReducedMotion;
  const showStaticGrid = !isLoading && reviews.length > 0 && prefersReducedMotion;

  return (
    <section id="reviews" className="google-reviews section" ref={sectionRef}>
      <div className="container">
        <div className="google-reviews__heading">
          <span className="eyebrow google-reviews__eyebrow">Client Experiences</span>
          <h2 className="google-reviews__title">Testimonials.</h2>
        </div>

        <GoogleReviewsSummary
          averageRating={state.data?.averageRating ?? null}
          totalReviewCount={state.data?.totalReviewCount ?? null}
          writeReviewUrl={state.data?.writeReviewUrl ?? null}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="google-reviews__grid">
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        )}

        {showStaticGrid && (
          <div className="google-reviews__grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {state.status === "ready" && reviews.length === 0 && (
          <p className="google-reviews__empty">No reviews yet.</p>
        )}
      </div>

      {showRows && (
        <div className="google-reviews__rows">
          <ReviewMarqueeRow reviews={reviews} direction="left" speedSeconds={isMobile ? 34 : 42} />
        </div>
      )}
    </section>
  );
}

export default GoogleReviewsSection;
