import ceramic2 from "../../assets/images/servicePages/ceramic-coating/ceramic-2.jpg";
import ccRolls from "../../assets/images/servicePages/ceramic-coating/cc-rolls.jpg";
import ceramic4 from "../../assets/images/servicePages/ceramic-coating/ceramic-4.jpeg";
import ceramic6 from "../../assets/images/servicePages/ceramic-coating/ceramic-6.jpg";
import ceramic7 from "../../assets/images/servicePages/ceramic-coating/ceramic-7.jpg";
import product1 from "../../assets/images/servicePages/ceramic-coating/products/product-1.webp";
import product2 from "../../assets/images/servicePages/ceramic-coating/products/product-2.webp";
import product3 from "../../assets/images/servicePages/ceramic-coating/products/product-3.webp";
import product4 from "../../assets/images/servicePages/ceramic-coating/products/product-4.webp";
import product5 from "../../assets/images/servicePages/ceramic-coating/products/product-5.webp";

export const ceramicCoatingPage = {
  hero: {
    title: "Ceramic Coating.",
    copy:
      "Ceramic coating bonds a durable layer of protection to the clearcoat, locking in gloss and clarity while making the paint significantly easier to maintain against dirt, water and UV exposure.",
    image: ceramic2,
    imageAlt: "Two finished Porsche 911 GT3s in the Toronto Buffing studio",
    imageWidth: 1290,
    imageHeight: 1720,
    centered: true,
  },
  sections: [
    {
      type: "feature-cards",
      cards: [
        {
          image: ccRolls,
          alt: "A purple Rolls-Royce Wraith with a glossy ceramic-coated finish at Toronto Buffing",
          title: "Correction Comes First",
          body: "Every coating goes on paint that has already been corrected to the right level. Protection is never used to lock in existing defects.",
        },
        {
          image: ceramic4,
          alt: "Detail work during ceramic coating installation on a BMW M3 at Toronto Buffing",
          title: "Precision Application",
          body: "Coating is applied in a controlled environment, panel by panel, for even coverage and a flawless cure.",
        },
        {
          image: ceramic6,
          alt: "Water beading on a ceramic-coated finish at Toronto Buffing",
          title: "Hydrophobic, Long-Term Gloss",
          body: "A durable hydrophobic layer keeps the paint beading, self-cleaning and glossy for years, not weeks.",
        },
      ],
    },
    {
      type: "reveal-intro",
      spacious: true,
      eyebrow: "Ceramic Coating",
      heading: "A showroom finish that keeps its edge.",
      body: "Applied panel by panel in a controlled environment, the result is a deep, glass-like clarity that keeps working long after you've left the studio.",
    },
    {
      type: "process",
      heading: "Coating Process",
      steps: [
        {
          title: "Assessment & Correction",
          body: "Paint is inspected and corrected to the appropriate level before any coating is applied.",
        },
        {
          title: "Ceramic Installation",
          body: "The coating is applied in a controlled environment and worked evenly across every panel.",
        },
        {
          title: "Cure & Inspection",
          body: "Vehicles cure indoors before a complimentary 2-week inspection confirms a flawless result.",
        },
      ],
    },
    {
      type: "benefits",
      heading: "Why Ceramic Coating",
      items: [
        {
          title: "Enhanced Gloss & Depth",
          body: "Brings out a deeper, richer finish while keeping the paint looking freshly detailed.",
        },
        {
          title: "Hydrophobic Protection",
          body: "Creates a water-repelling surface that makes maintenance easier.",
        },
        {
          title: "UV & Chemical Resistance",
          body: "Helps protect the finish from environmental damage and contaminants.",
        },
        {
          title: "Long-Term Paint Preservation",
          body: "Reduces daily wear and keeps the surface easier to maintain over time.",
        },
      ],
    },
    {
      type: "banner",
      image: ceramic7,
      alt: "Freshly ceramic-coated BMWs finished at Toronto Buffing",
      imageWidth: 1440,
      imageHeight: 1800,
      overlay: "16+ Years Craftsmanship",
    },
    {
      type: "product-marquee",
      products: [
        { src: product1, alt: "Ceramic Pro 9H coating" },
        { src: product2, alt: "Ceramic Pro Top Coat" },
        { src: product3, alt: "Ceramic Pro Glass coating" },
        { src: product4, alt: "Ceramic Pro Wheel & Caliper coating" },
        { src: product5, alt: "Ceramic Pro Sport spray sealant" },
      ],
    },
  ],
  cta: {
    heading: "Correct it. Coat it. Preserve it.",
    buttonLabel: "Start Your Quote",
  },
};
