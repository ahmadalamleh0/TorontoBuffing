import pcHero from "../../assets/images/servicePages/paint-correction/pc-hero.jpeg";
import pc3 from "../../assets/images/servicePages/paint-correction/pc-3.webp";
import pc4 from "../../assets/images/servicePages/paint-correction/pc-4.jpeg";
import pc9 from "../../assets/images/servicePages/paint-correction/pc-9.jpg";
import pcBefore from "../../assets/images/servicePages/paint-correction/pc-1-after.jpg";
import pcAfter from "../../assets/images/servicePages/paint-correction/pc-1-before.jpg";
import pcBefore2 from "../../assets/images/servicePages/paint-correction/pc-before2.jpeg";
import pcAfter2 from "../../assets/images/servicePages/paint-correction/pc-after2.jpeg";
import garageBanner from "../../assets/images/banner/garage-showcase.jpg";

export const paintCorrectionPage = {
  hero: {
    title: "Paint Correction.",
    copy: "Paint correction uses machine polishing to cut away swirl marks and haze, restoring the paint's true depth and clarity.",
    centered: true,
    image: pcHero,
    imageAlt: "A technician machine-polishing swirl marks out of a BMW's trunk lid at Toronto Buffing",
    imageWidth: 1284,
    imageHeight: 2014,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Paint Correction",
      heading: "Depth and clarity, brought back to the surface.",
      body: "Every stage is judged by eye and by hand, only stopping once the reflection reads flawless, not just improved.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: pc9,
          alt: "Swirl-free reflections revealed during paint correction at Toronto Buffing",
          title: "Thorough Assessment",
          body: "Every vehicle is inspected first. The correction process is built around its actual paint condition, not a fixed package.",
        },
        {
          image: pc3,
          alt: "Machine polishing during a multi-stage paint correction at Toronto Buffing",
          title: "Multi-Stage Correction",
          body: "Separate cutting and refinement stages remove defects safely while preserving the long-term integrity of the clearcoat.",
        },
        {
          image: pc4,
          alt: "The finished, corrected result on a vehicle at Toronto Buffing",
          title: "Swirl-Free Clarity",
          body: "The result is depth and clarity restored, paint that reflects the way it did before it was ever touched by a wash mitt.",
        },
      ],
    },
    {
      type: "process",
      heading: "Correction Process",
      steps: [
        {
          title: "Preparation",
          body: "Chemical pre-wash, hand wash, clay-bar decontamination and paint-thickness measurement set the foundation.",
        },
        {
          title: "Test Spot & Strategy",
          body: "A test spot confirms the right correction strategy before work begins on the full vehicle.",
        },
        {
          title: "Multi-Stage Correction",
          body: "Cutting and refinement stages progressively remove defects and maximize gloss and clarity.",
        },
      ],
    },
    {
      type: "text-list",
      heading: "What Paint Correction Can Address",
      items: [
        "Swirl marks",
        "Wash-induced scratches",
        "Haze",
        "Oxidation",
        "Water-spot etching",
        "Holograms / buffer trails",
        "Certain deeper isolated defects",
      ],
      note: "Damage that has gone through the clearcoat may require chip repair or panel refinishing instead.",
    },
    {
      type: "banner",
      image: garageBanner,
      alt: "Vehicles in the Toronto Buffing studio prepared for paint correction",
      imageWidth: 1564,
      imageHeight: 1564,
      overlay: "16+ Years Craftsmanship",
    },
    {
      type: "stage-list",
      heading: "Correction Levels",
      stages: [
        {
          title: "Paint Enhancement",
          body: "Even brand-new vehicles arrive from the factory with paint defects. Our Stage 1 enhancement is typically enough to bring paint with little to no swirl marks up to our standard, depending on paint hardness and defect severity.",
        },
        {
          title: "Paint Correction",
          body: "If your vehicle has lived through automatic car washes and winter snow brushes and carries a moderate amount of swirls and scratches, a two-stage correction is typically what's required to return the paint to defect-free perfection.",
        },
        {
          title: "Heavy Correction",
          body: "For paint that has lost its depth of colour and gloss and is moderately to heavily swirled, three stages of correction cut through the defects to bring back its former shine and glory.",
        },
      ],
    },
    {
      type: "before-after",
      heading: "The Difference Correction Makes",
      before: { src: pcBefore, alt: "A dull, hazy roof panel before paint correction" },
      after: { src: pcAfter, alt: "The same panel after paint correction, with a clear, glossy reflection" },
    },
    {
      type: "before-after",
      before: { src: pcBefore2, alt: "A swirl-marked panel under work lights before paint correction" },
      after: { src: pcAfter2, alt: "The same panel after paint correction, with a clear, swirl-free reflection" },
    },
  ],
  cta: {
    heading: "Your paint doesn’t need a quick polish. It needs the right correction.",
    buttonLabel: "Book An Assessment",
  },
};
