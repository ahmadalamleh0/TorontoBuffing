import heroImage from "../../assets/images/services/paint-chip-repair-new.jpeg";
import gtr from "../../assets/images/servicePages/paint-chip-repair/pcr-gtr.webp";
import rockchip from "../../assets/images/servicePages/paint-chip-repair/pcr-rockchip.webp";
import touchup from "../../assets/images/servicePages/paint-chip-repair/pcr-touchup.jpeg";
import craftsmanship from "../../assets/images/servicePages/paint-chip-repair/pcr-craftsmanship.jpg";

export const paintChipRepairPage = {
  hero: {
    title: "Paint Chip Repair.",
    copy:
      "A paint chip exposes bare metal to corrosion. Toronto Buffing seals the exposure first, then layers, levels and polishes the repair to blend into the surrounding finish.",
    image: heroImage,
    imageAlt: "A green BMW marked with yellow chip-repair spots during preparation at Toronto Buffing",
    imageWidth: 1252,
    imageHeight: 2048,
    centered: true,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Paint Chip Repair",
      heading: "Repaired first, protected always.",
      body: "Every chip is treated as a corrosion risk before it's treated as a cosmetic one, so what gets protected is worth protecting.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: gtr,
          alt: "A Nissan Skyline GT-R marked with chip-repair tabs across the front bumper at Toronto Buffing",
          title: "Seal The Exposure",
          body: "Every chip is marked, cleaned and decontaminated before any repair work begins. Corrosion risk is addressed first.",
        },
        {
          image: rockchip,
          alt: "A vehicle's front bumper and grille marked with chip-repair tabs at Toronto Buffing",
          title: "Layered, Not Patched",
          body: "Multiple layers of basecoat are leveled and wet sanded, then finished with clearcoat and machine polishing.",
        },
        {
          image: touchup,
          alt: "A technician hand-blending a touch-up repair into a vehicle's door panel at Toronto Buffing",
          title: "Precision Touch-Up",
          body: "Detail work is done by hand, blending each repair into the surrounding paint until the transition disappears.",
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
      type: "reveal-intro",
      compact: true,
      eyebrow: "Our Philosophy",
      heading: "More than a touch-up.",
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
      image: craftsmanship,
      alt: "Close-up of a freshly detailed Porsche 911's rear fender and wheel at Toronto Buffing",
      imageWidth: 947,
      imageHeight: 1840,
      overlay: "16+ Years Craftsmanship",
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
