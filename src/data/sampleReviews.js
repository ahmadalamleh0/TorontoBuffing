/**
 * TEMPORARY sample data — for building/reviewing the Google Reviews
 * section visually before the /api/google-reviews backend exists.
 *
 * This is used ONLY as a local dev fallback (see GoogleReviewsSection)
 * and is never shown in a production build. Delete this file once the
 * real endpoint is live.
 *
 * A few entries below carry a `reviewPhoto` (reusing existing shop
 * photography as a stand-in) purely so the featured-photo-review
 * layout can be reviewed locally — these are not real customer photos
 * and none of this ever reaches production.
 */
import paintCorrectionPhoto from "../assets/images/services/paint-correction.jpg";
import ceramicCoatingPhoto from "../assets/images/services/ceramic-coating.jpg";
import panelRefinishingPhoto from "../assets/images/services/panel-refinishing.jpg";

/** @type {import('../types/reviews').ReviewsSummary} */
export const SAMPLE_REVIEWS_SUMMARY = {
  averageRating: 4.9,
  totalReviewCount: 397,
  mapsUrl: "#",
  writeReviewUrl: "#",
  reviews: [
    {
      id: "sample-1",
      reviewerName: "Alex Chen",
      reviewerPhoto: null,
      rating: 5,
      comment:
        "Excellent experience from start to finish. The team was professional, communicated clearly throughout, and the final result exceeded what I expected. Would go back without hesitation.",
      reviewPhoto: paintCorrectionPhoto,
      createTime: "2026-06-02T00:00:00.000Z",
    },
    {
      id: "sample-2",
      reviewerName: "Priya Nair",
      reviewerPhoto: null,
      rating: 5,
      comment:
        "Really happy with how everything turned out. Booking was easy and the team explained the whole process before getting started.",
      createTime: "2026-05-14T00:00:00.000Z",
    },
    {
      id: "sample-3",
      reviewerName: "Marco Rossi",
      reviewerPhoto: null,
      rating: 5,
      comment: "Great attention to detail and fair pricing. Highly recommend.",
      createTime: "2026-04-29T00:00:00.000Z",
    },
    {
      id: "sample-4",
      reviewerName: "Sarah Thompson",
      reviewerPhoto: null,
      rating: 4,
      comment:
        "Solid work overall and friendly staff. Turnaround took a little longer than I expected, but the quality made up for it.",
      createTime: "2026-04-11T00:00:00.000Z",
    },
    {
      id: "sample-5",
      reviewerName: "Daniel Osei",
      reviewerPhoto: null,
      rating: 5,
      comment: "",
      createTime: "2026-03-22T00:00:00.000Z",
    },
    {
      id: "sample-6",
      reviewerName: "Emily Zhao",
      reviewerPhoto: null,
      rating: 5,
      comment:
        "Very impressed with the level of care put into the work. It's clear they take pride in what they do. Will be back for future services.",
      reviewPhoto: ceramicCoatingPhoto,
      createTime: "2026-03-05T00:00:00.000Z",
    },
    {
      id: "sample-7",
      reviewerName: "James Whitfield",
      reviewerPhoto: null,
      rating: 5,
      comment: "Professional, punctual, and the results speak for themselves.",
      createTime: "2026-02-18T00:00:00.000Z",
    },
    {
      id: "sample-8",
      reviewerName: "Fatima Al-Sayed",
      reviewerPhoto: null,
      rating: 5,
      comment:
        "Top-tier service. They took the time to answer all of my questions before booking and the end result was worth every penny.",
      reviewPhoto: panelRefinishingPhoto,
      createTime: "2026-01-27T00:00:00.000Z",
    },
  ],
};
