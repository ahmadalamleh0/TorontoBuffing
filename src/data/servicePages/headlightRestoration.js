import heroImage from "../../assets/images/services/headlight-restoration.jpg";
import banner from "../../assets/images/projects/corvette-black/1.webp";

export const headlightRestorationPage = {
  hero: {
    title: "Headlight Restoration.",
    copy:
      "Restore clarity to oxidized, yellowed, scratched and weathered headlight lenses without unnecessarily replacing expensive assemblies.",
    image: heroImage,
    imageAlt: "A hazy headlight lens being machine-polished during restoration at Toronto Buffing",
    imageWidth: 861,
    imageHeight: 950,
  },
  sections: [
    {
      type: "intro",
      heading: "Restore, Don’t Hide",
      body: "Toronto Buffing uses multi-stage wet sanding and polishing to physically remove the damaged exterior layer — rather than temporarily covering it with cheap sprays or DIY products.",
    },
    {
      type: "steps",
      heading: "The Process",
      steps: [
        "Assess lens condition",
        "Clean and prepare",
        "Progressive wet sanding based on severity",
        "Multi-stage polishing",
        "Final protection and quality inspection",
      ],
    },
    {
      type: "checklist-grid",
      heading: "What It Can Address",
      items: ["Oxidation", "Yellowing", "Haze", "Pitting", "Scratches"],
      note: "With more advanced restoration, deeper gouges and stone-chip damage can also be addressed.",
    },
    {
      type: "banner",
      image: banner,
      alt: "A vehicle finished in the Toronto Buffing studio",
      imageWidth: 1284,
      imageHeight: 1571,
    },
    {
      type: "intro",
      heading: "Protection Options",
      body: "Restored headlights can be protected with SunTek Ultra PPF, ceramic lens coating, or a full clearcoat system, depending on the vehicle and desired longevity.",
    },
    {
      type: "trust",
      heading: "Warranty",
      body: "Our headlight restoration services include a 2-year warranty against premature yellowing.",
      points: ["2-Year warranty against premature yellowing"],
    },
  ],
  cta: {
    heading: "Bring back the clarity.",
    buttonLabel: "Start Your Quote",
  },
};
