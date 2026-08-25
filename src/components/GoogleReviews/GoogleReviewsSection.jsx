import { useEffect, useRef, useState } from "react";
import { fetchGoogleReviews, mergeManualReviews, selectFeaturedReviews } from "../../services/reviewsService";
import { MANUAL_REVIEWS } from "../../data/manualReviews";
import { SAMPLE_REVIEWS_SUMMARY } from "../../data/sampleReviews";
import GoogleReviewsSummary from "./GoogleReviewsSummary";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import ReviewMarqueeRow from "./ReviewMarqueeRow";
import "./GoogleReviewsSection.css";

const SKELETON_COUNT = 4;

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

    fetchGoogleReviews({ signal: controller.signal })
      .then((liveSummary) => {
        const merged = mergeManualReviews(liveSummary, MANUAL_REVIEWS);
        setState({ status: "ready", data: merged, isSample: false });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        // /api/google-reviews failed — log the real reason loudly so it's
        // never mistaken for "not implemented yet". In dev only, fall back
        // to sample data so the section stays visually buildable, but flag
        // it as sample data (both here and in the UI below) so a failing
        // endpoint is never mistaken for a working one during local dev.
        // Production never falls back — a real failure always shows the
        // error state instead of masking it with fake reviews.
        if (import.meta.env.DEV) {
          console.warn(
            "[GoogleReviewsSection] Live /api/google-reviews request failed — showing SAMPLE data instead. " +
              "This is a dev-only fallback; it does NOT mean the endpoint works. Real error:",
            error,
          );
          const merged = mergeManualReviews(SAMPLE_REVIEWS_SUMMARY, MANUAL_REVIEWS);
          setState({ status: "ready", data: merged, isSample: true });
          return;
        }

        console.error("[GoogleReviewsSection]", error);
        setState({ status: "error", data: null, isSample: false });
      });

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
          <h2 className="google-reviews__title">Our Reviews.</h2>
          <p className="google-reviews__rated">Rated 5 Stars</p>
        </div>

        <GoogleReviewsSummary
          averageRating={state.data?.averageRating ?? null}
          totalReviewCount={state.data?.totalReviewCount ?? null}
          writeReviewUrl={state.data?.writeReviewUrl ?? null}
          isLoading={isLoading}
        />

        {state.status === "error" && (
          <p className="google-reviews__error">
            We couldn't load reviews right now. Please check back soon.
          </p>
        )}

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
