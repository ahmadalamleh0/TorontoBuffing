import heroImage from "../../assets/images/services/paint-chip-repair-new.jpeg";
import banner from "../../assets/images/banner/garage-showcase.jpg";

export const paintChipRepairPage = {
  hero: {
    title: "Paint Chip Repair.",
    copy:
      "A small chip left alone becomes a corrosion problem. Toronto Buffing closes the exposure before it spreads, and refines the repair so it disappears into the finish.",
    image: heroImage,
    imageAlt: "A green BMW marked with yellow chip-repair spots during preparation at Toronto Buffing",
    imageWidth: 1252,
    imageHeight: 2048,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Paint Chip Repair",
      heading: "Closing the exposure before it becomes corrosion.",
      body: "A small chip left alone spreads. Toronto Buffing seals the damage and refines the repair until it disappears into the surrounding finish.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: heroImage,
          alt: "A green BMW marked with yellow chip-repair spots during preparation at Toronto Buffing",
          title: "Seal The Exposure",
          body: "Every chip is marked, cleaned and decontaminated before any repair work begins. Corrosion risk is addressed first.",
        },
        {
          image: banner,
          alt: "A vehicle prepared for detail work in the Toronto Buffing studio",
          title: "Layered, Not Patched",
          body: "Multiple layers of basecoat are leveled and wet sanded, then finished with clearcoat and machine polishing.",
        },
      ],
    },
    {
      type: "process",
      heading: "Repair Process",
      steps: [
        {
          title: "Clean & Prepare",
          body: "The chip is cleaned, decontaminated and scuff-prepared, with any corrosion addressed first.",
        },
        {
          title: "Layered Repair",
          body: "Multiple layers of basecoat are applied, leveled and wet sanded to rebuild the finish.",
        },
        {
          title: "Clearcoat & Polish",
          body: "A final clearcoat and machine polishing refine the repair until it blends into the surrounding paint.",
        },
      ],
    },
    {
      type: "intro",
      heading: "More Than A Touch-Up",
      body: "Toronto Buffing does not use a simple “dab and walk away” approach. Our process includes:",
      list: [
        "Cleaning and decontamination",
        "Scuff preparation",
        "Addressing corrosion where required",
        "Multiple layers of basecoat",
        "Leveling and wet sanding",
        "Clearcoat",
        "Final sanding and machine polishing",
      ],
      note: "Chip repair is designed to stop corrosion and greatly improve appearance. Not every repair will be made completely invisible.",
    },
    {
      type: "banner",
      image: banner,
      alt: "A vehicle prepared for detail work in the Toronto Buffing studio",
      imageWidth: 1564,
      imageHeight: 1564,
    },
    {
      type: "intro",
      heading: "When Chip Repair Makes Sense",
      body: [
        "Chip repair is best for isolated chips where the surrounding paint is still healthy.",
        "If a panel has extensive chipping, chips larger than roughly a pencil eraser, peeling paint, microchipping or severe sandblasting, panel refinishing may be the better solution.",
      ],
      note: "Chip repair is not offered as a standalone booking. It must be combined with a larger service such as Paint Correction, PPF or Ceramic Coating.",
    },
    {
      type: "trust",
      heading: "Protection First, Appearance Second",
      body: "A paint chip that exposes primer or bare metal is a corrosion risk before it's a cosmetic one. Toronto Buffing addresses that risk first, then refines the repair for appearance.",
      points: [
        "Corrosion addressed before cosmetic finishing",
        "Multiple basecoat layers, leveled and wet sanded",
        "Finished with clearcoat and machine polishing",
      ],
    },
  ],
  cta: {
    heading: "Repair it before you protect it.",
    buttonLabel: "Start Your Quote",
  },
};
