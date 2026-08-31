/**
 * Real, manually-entered Google reviews for Toronto Buffing.
 *
 * Google Places API only returns up to 5 "most relevant" reviews per
 * place — this file exists to supplement those with additional real
 * reviews (copied verbatim from Google) so the grid isn't limited to
 * 5 cards. These are merged with the live API reviews in
 * reviewsService.mergeManualReviews, tagged with source: "manual" so
 * the two stay clearly distinguishable in the data layer.
 *
 * Do not paraphrase or edit review text — copy it exactly as written
 * on Google, per Google's review attribution requirements.
 *
 * Google Places API (New) doesn't reliably expose customer-uploaded
 * review photos, and the Reviews section only features reviews that
 * have one (see reviewsService.selectFeaturedReviews) — so entries
 * added here are the only way a review appears there today. Each
 * entry's `reviewImage` is the real customer car photo supplied for
 * that specific review (originally dropped in the project's top-level
 * Reviews/ folder, copied into src/assets/images/reviews/).
 */
import waqasHussainPhoto from "../assets/images/reviews/waqas-hussain-thumb.webp";
import alisherIssabekovPhoto from "../assets/images/reviews/alisher-issabekov.webp";
import carGuyPhoto from "../assets/images/reviews/car-guy.webp";
import matthewSobkowskiPhoto from "../assets/images/reviews/matthew-sobkowski.webp";
import asifHusainPhoto from "../assets/images/reviews/asif-husain.webp";
import edgarPrudcoiPhoto from "../assets/images/reviews/edgar-prudcoi.webp";

export const MANUAL_REVIEWS = [
  {
    reviewerName: "Waqas Hussain",
    rating: 5,
    comment:
      "I can't recommend Toronto Buffing highly enough. I brought in my Tesla Model S in Ultra Red for paint correction, a full ceramic coating, and PPF, and the results are stunning. The Ultra Red has incredible depth now — a flawless, glass-like finish with not a swirl mark in sight. It honestly looks better than the day I picked the car up.",
    reviewImage: waqasHussainPhoto,
  },
  {
    reviewerName: "Alisher Issabekov",
    rating: 5,
    comment:
      "Saw amazing reviews online and decided to call Toronto Buffing to get a quote for paint correction and ceramic coating back in October 2025. Let me just say all the reviews are well deserved. Chris and his team went above and beyond and made my new-to-me car look like it just rolled off the factory! I ended up getting a PPF as well as front bumper refinish on top of my original requests based on Chris' advice, and results speak for themselves.",
    reviewImage: alisherIssabekovPhoto,
  },
  {
    reviewerName: "Car Guy",
    rating: 5,
    comment:
      "Came in with my 2025 Nissan Z for a PPF removal and application, paint correction and ceramic coating. Chris did a very good job detailing and fixing all the little imperfections! Highly recommend this place to anyone! Very professional work! Thank you!",
    reviewImage: carGuyPhoto,
  },
  {
    reviewerName: "Matthew Sobkowski",
    rating: 5,
    comment:
      "If you want the best work get it done here. Chris is incredibly knowledgeable and kept me updated every step of the way. I've received similar services from other shops and the quality of work done isn't even comparable. Both pictures were taken two weeks after the job was done. I would 100% recommend them for any ceramic/ppf/paint correction.",
    reviewImage: matthewSobkowskiPhoto,
  },
  {
    reviewerName: "Asif Husain",
    rating: 5,
    comment:
      "I recently brought my 2014 Porsche 911 Turbo S to Toronto Buffing Inc. to have the old front-end PPF removed, new PPF installed, and a Ceramic Pro Silver package applied. I couldn't be happier with the results. Chris was fantastic to deal with from start to finish. His attention to detail, professionalism, and knowledge were evident throughout the entire process. He kept me updated with photos every step of the way, which gave me complete confidence that my car was in good hands.",
    reviewImage: asifHusainPhoto,
  },
  {
    reviewerName: "Edgar Prudcoi",
    rating: 5,
    comment:
      "From my personal experience I could not recommend Toronto Buffing more. From my initial contact with Chris right to the very end I could not have asked for a better experience. With transportation delays in my car being delivered to the dealer Chris was flexible, communicative, and responsive to have the car brought right to him. I never felt rushed and all of my questions and concerns were answered with care. Chris and his team performed 2 stage paint correction, full front end PPF, and ceramic coating. He also added a few additional complimentary pieces of PPF in high traffic areas. After two weeks the vehicle was brought back for a complimentary inspection of their work and professional wash. This is a shop that takes pride in their work and the results clearly demonstrate that. Your vehicle will be treated as if their own and will look better than the day you purchased it.",
    reviewImage: edgarPrudcoiPhoto,
  },
];
