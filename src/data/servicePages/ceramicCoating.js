import ceramic2 from "../../assets/images/servicePages/ceramic-coating/ceramic-2.jpg";
import ceramic4 from "../../assets/images/servicePages/ceramic-coating/ceramic-4.jpeg";
import ceramic6 from "../../assets/images/servicePages/ceramic-coating/ceramic-6.jpg";
import ceramic7 from "../../assets/images/servicePages/ceramic-coating/ceramic-7.jpg";
import ceramic8 from "../../assets/images/servicePages/ceramic-coating/ceramic-8.jpg";
import product1 from "../../assets/images/servicePages/ceramic-coating/products/product-1.webp";
import product2 from "../../assets/images/servicePages/ceramic-coating/products/product-2.webp";
import product3 from "../../assets/images/servicePages/ceramic-coating/products/product-3.webp";
import product4 from "../../assets/images/servicePages/ceramic-coating/products/product-4.webp";
import product5 from "../../assets/images/servicePages/ceramic-coating/products/product-5.webp";

export const ceramicCoatingPage = {
  hero: {
    title: "Ceramic Coating.",
    copy:
      "A finish that stays looking freshly detailed, long after the detail. Ceramic coating locks in gloss and clarity while making the paint dramatically easier to keep that way.",
    image: ceramic2,
    imageAlt: "Two finished Porsche 911 GT3s in the Toronto Buffing studio",
    imageWidth: 1290,
    imageHeight: 1720,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Ceramic Coating",
      heading: "A finish that stays freshly detailed, long after the detail.",
      body: "Ceramic coating locks in gloss and clarity while making the paint dramatically easier to maintain, with protection that keeps working long after you've left the studio.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: ceramic8,
          alt: "A close-up of a glossy black sedan's rear fender and wheel after ceramic coating at Toronto Buffing",
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
      type: "checklist-grid",
      heading: "Why Ceramic Coating",
      items: [
        "Enhanced gloss and depth",
        "Strong hydrophobic behaviour",
        "Easier washing",
        "Resistance to UV exposure",
        "Resistance to contaminants and chemical etching",
        "Reduced accumulation of minor wash-induced wear",
      ],
      note: "Ceramic coating does not protect against physical rock-chip impacts the way PPF does.",
    },
    {
      type: "banner",
      image: ceramic7,
      alt: "Freshly ceramic-coated BMWs finished at Toronto Buffing",
      imageWidth: 1440,
      imageHeight: 1800,
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
