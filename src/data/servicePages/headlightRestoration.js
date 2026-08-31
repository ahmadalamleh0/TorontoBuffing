import heroImage from "../../assets/images/services/headlight-restoration.jpg";
import hl1 from "../../assets/images/servicePages/headlight-restoration/hl-1.jpg";
import hl2 from "../../assets/images/servicePages/headlight-restoration/hl-2.jpeg";
import hl3 from "../../assets/images/servicePages/headlight-restoration/hl-3.jpeg";

export const headlightRestorationPage = {
  hero: {
    title: "Headlight Restoration.",
    copy:
      "Clarity restored, not replaced. Hazy, yellowed lenses are almost always a finish problem, not a hardware problem, solved in hours, without a parts order.",
    image: heroImage,
    imageAlt: "A hazy headlight lens being machine-polished during restoration at Toronto Buffing",
    imageWidth: 861,
    imageHeight: 950,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Headlight Restoration",
      heading: "Clarity restored in hours, not replaced with parts.",
      body: "Hazy, yellowed lenses are almost always a finish problem, not a hardware problem, solved through multi-stage polishing that brings back true clarity.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: hl1,
          alt: "A pair of hazy, oxidized headlight lenses removed for restoration at Toronto Buffing",
          title: "Assess & Prepare",
          body: "Lens condition is assessed and prepared before any sanding begins.",
        },
        {
          image: hl2,
          alt: "A restored, crystal-clear headlight lens reinstalled on a vehicle at Toronto Buffing",
          title: "Multi-Stage Restoration",
          body: "Progressive wet sanding and multi-stage polishing physically remove the damaged layer, not cover it up.",
        },
        {
          image: hl3,
          alt: "A pair of finished, crystal-clear headlight lenses at Toronto Buffing",
          title: "Crystal-Clear Results",
          body: "The result is clarity restored in hours, backed by a 2-year warranty against premature yellowing.",
        },
      ],
    },
    {
      type: "process",
      heading: "Restoration Process",
      steps: [
        {
          title: "Assess & Prepare",
          body: "Lens condition is assessed, cleaned and prepared for restoration.",
        },
        {
          title: "Wet Sand & Polish",
          body: "Progressive wet sanding and multi-stage polishing remove the damaged exterior layer.",
        },
        {
          title: "Protect & Inspect",
          body: "Final protection is applied and the result is quality-inspected before hand-back.",
        },
      ],
    },
    {
      type: "intro",
      heading: "Restore, Don’t Hide",
      body: "Toronto Buffing uses multi-stage wet sanding and polishing to physically remove the damaged exterior layer, rather than temporarily covering it with cheap sprays or DIY products.",
    },
    {
      type: "banner",
      image: hl1,
      alt: "A pair of hazy, oxidized headlight lenses removed for restoration at Toronto Buffing",
      imageWidth: 1440,
      imageHeight: 1440,
    },
    {
      type: "checklist-grid",
      heading: "What It Can Address",
      items: ["Oxidation", "Yellowing", "Haze", "Pitting", "Scratches"],
      note: "With more advanced restoration, deeper gouges and stone-chip damage can also be addressed.",
    },
    {
      type: "banner",
      image: hl2,
      alt: "A restored, crystal-clear headlight lens reinstalled on a vehicle at Toronto Buffing",
      imageWidth: 1277,
      imageHeight: 1879,
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
    {
      type: "banner",
      image: hl3,
      alt: "A pair of finished, crystal-clear headlight lenses at Toronto Buffing",
      imageWidth: 1260,
      imageHeight: 2048,
    },
  ],
  cta: {
    heading: "Bring back the clarity.",
    buttonLabel: "Start Your Quote",
  },
};
