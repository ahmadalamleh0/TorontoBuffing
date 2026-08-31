import ppfVsCeramicImage from "../assets/images/services/blog-ppf-vs-ceramic.jpg";
import paintCorrectionBlogImage from "../assets/images/services/blog-paint-correction.jpg";
import protectNewCarImage from "../assets/images/services/blog-protect-new-car-v2.png";

/**
 * Lightweight starter posts for the homepage's "Latest Insights"
 * section and their corresponding /insights/:slug pages. Content is
 * intentionally concise — a useful, complete answer, not a long-form
 * essay — and kept consistent with the facts already established on
 * the service pages and FAQ (nothing invented beyond what's stated
 * elsewhere on the site).
 */
export const BLOG_POSTS = [
  {
    slug: "ppf-vs-ceramic-coating",
    category: "Protection",
    date: "2026-08-28",
    dateDisplay: "Aug 28, 2026",
    title: "PPF vs Ceramic Coating: What's the Difference?",
    excerpt:
      "PPF is a physical barrier against rock chips and scratches. Ceramic coating is a chemical layer built for gloss and hydrophobic protection. Here's how they actually differ.",
    image: paintCorrectionBlogImage,
    imageAlt: "A Porsche and a Toyota Supra finished side by side in the Toronto Buffing studio",
    body: [
      {
        heading: "Two different kinds of protection",
        paragraphs: [
          "Paint protection film (PPF) is a thick, clear physical film installed over the paint. It's designed to absorb impact from rock chips, road debris and light scratches, and, on quality films, to self-heal minor marks with heat.",
          "Ceramic coating is an extremely thin liquid layer that chemically bonds to the paint. It doesn't stop physical impacts, but it creates a durable, hydrophobic surface with lasting gloss and strong resistance to UV exposure and chemical etching, and it makes the vehicle easier to keep clean.",
        ],
      },
      {
        heading: "Which one do you need?",
        paragraphs: [
          "If your priority is protecting against rock chips and scratches, on highway driving, new vehicles, high-value or hard-to-repair paint colours, PPF is the right tool. If your priority is gloss, easier maintenance and chemical resistance, ceramic coating covers that.",
          "The two aren't a choice between one or the other. Ceramic coating can be applied on top of PPF for added gloss and protection, and Toronto Buffing routinely combines both on the same vehicle. Either way, paint correction comes first. Coatings and film only lock in the condition the paint is already in.",
        ],
      },
    ],
  },
  {
    slug: "how-paint-correction-works",
    category: "Correction",
    date: "2026-08-24",
    dateDisplay: "Aug 24, 2026",
    title: "How Paint Correction Actually Works",
    excerpt:
      "Swirls, scratches and oxidation aren't fixed with a coating. They're removed with machine polishing. Here's what multi-stage correction actually involves.",
    image: ppfVsCeramicImage,
    imageAlt: "A Porsche 911 GT3 Cup race car finished at Toronto Buffing",
    body: [
      {
        heading: "It's removal, not concealment",
        paragraphs: [
          "Paint correction uses machine polishers, pads and abrasive compounds, and, where needed, fine-grit wet sanding, to level a small amount of clear coat around a defect. That's what actually removes swirl marks, surface scratches, oxidation and water-spot etching, rather than just hiding them under a wax or sealant.",
          "A traditional \"cut and polish\" is essentially a 2-stage correction: a cutting stage to remove the defect, followed by a refining polish to restore clarity. A 3-stage correction adds another machining pass, allowing more extensive defect removal and a higher level of finish when the paint needs it.",
        ],
      },
      {
        heading: "Why it comes before protection",
        paragraphs: [
          "Ceramic coating and PPF both lock in whatever condition the paint is already in. They don't remove existing defects, and in some cases can make them more visible once the surface is glossier. That's why Toronto Buffing only applies coatings and film to paint that's already been properly corrected.",
          "Correction is measured and controlled: Toronto Buffing evaluates paint thickness before starting and aims to remove as little clear coat as possible, since a standard correction only needs to remove a small percentage of the available clear coat to get real results.",
        ],
      },
    ],
  },
  {
    slug: "how-to-protect-a-new-cars-paint",
    category: "New Car",
    date: "2026-08-18",
    dateDisplay: "Aug 18, 2026",
    title: "How to Protect a New Car's Paint",
    excerpt:
      "The best time to protect paint is before it's damaged. Here's how PPF, ceramic coating and basic washing habits fit together on a new vehicle.",
    image: protectNewCarImage,
    imageAlt: "A two-tone black and white Mercedes-Maybach freshly detailed at Toronto Buffing",
    body: [
      {
        heading: "Protect before damage happens",
        paragraphs: [
          "New paint is the best-case scenario for protection. There are no existing swirls or chips to correct first, just a clean surface. PPF is particularly worth considering here: it's a physical barrier against the rock chips and scratches a car will start collecting from its very first highway drive, and it can be installed at any stage of ownership, ideally before that damage accumulates.",
          "Ceramic coating adds gloss, hydrophobic behaviour and chemical resistance on top of that, and can be applied over PPF rather than underneath it, since coating underneath film can interfere with how well the film bonds.",
        ],
      },
      {
        heading: "Everyday habits matter too",
        paragraphs: [
          "Whatever protection you choose, regular hand washing, at least monthly, or whenever the car is visibly dirty, does more for long-term paint condition than any single product. Avoid machine-polishing or waxing over PPF, and keep pressure washers away from film edges.",
          "For new vehicles with unique or hard-to-repair paint colours, or for anyone planning to keep a car long-term, combining PPF with ceramic coating from day one is the most complete option. It offers physical protection against impacts, plus a coating that keeps the finish easier to maintain.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
