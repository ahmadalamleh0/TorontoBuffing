import { useEffect, useRef, useState } from "react";
import { fetchGoogleReviews, mergeManualReviews } from "../../services/reviewsService";
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
  const [state, setState] = useState({ status: "loading", data: null });
  const sectionRef = useSectionReveal();
  const isMobile = useMatchMedia("(max-width: 767px)");
  const prefersReducedMotion = useMatchMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const controller = new AbortController();

    fetchGoogleReviews({ signal: controller.signal })
      .then((liveSummary) => {
        const merged = mergeManualReviews(liveSummary, MANUAL_REVIEWS);
        setState({ status: "ready", data: merged });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        // TEMPORARY: /api/google-reviews doesn't exist yet, so this
        // always fails today. In dev, fall back to sample data so the
        // section can be built and reviewed visually. In production
        // this deliberately shows the error state instead — real
        // failures should never be masked with fake reviews.
        if (import.meta.env.DEV) {
          console.info(
            "[GoogleReviewsSection] /api/google-reviews not implemented yet — using temporary sample data.",
          );
          const merged = mergeManualReviews(SAMPLE_REVIEWS_SUMMARY, MANUAL_REVIEWS);
          setState({ status: "ready", data: merged });
          return;
        }

        console.error("[GoogleReviewsSection]", error);
        setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, []);

  const isLoading = state.status === "loading";
  // Only show reviews that actually have written text — a star-only
  // rating doesn't give visitors anything to read in this layout.
  const reviews = (state.data?.reviews ?? []).filter((review) => review.comment?.trim());
  const showRows = !isLoading && reviews.length > 0 && !prefersReducedMotion;
  const showStaticGrid = !isLoading && reviews.length > 0 && prefersReducedMotion;

  return (
    <section id="reviews" className="google-reviews section" ref={sectionRef}>
      <div className="container">
        <div className="google-reviews__heading">
          <span className="eyebrow google-reviews__eyebrow">Client Experiences</span>
          <h2 className="google-reviews__title">Our Reviews.</h2>
          <p className="google-reviews__subline">
            Real feedback from Toronto Buffing clients on Google.
          </p>
        </div>

        <GoogleReviewsSummary
          averageRating={state.data?.averageRating ?? null}
          totalReviewCount={state.data?.totalReviewCount ?? null}
          writeReviewUrl={state.data?.writeReviewUrl ?? null}
          mapsUrl={state.data?.mapsUrl ?? null}
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
