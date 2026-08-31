import hl1 from "../../assets/images/servicePages/headlight-restoration/hl-1.jpg";
import hl2 from "../../assets/images/servicePages/headlight-restoration/hl-2.jpeg";
import hlBmwM4 from "../../assets/images/servicePages/headlight-restoration/hl-bmw-m4.jpg";
import hlGtr from "../../assets/images/servicePages/headlight-restoration/hl-gtr.jpeg";
import hlPorsche2 from "../../assets/images/servicePages/headlight-restoration/hl-porsche2.jpg";

export const headlightRestorationPage = {
  hero: {
    title: "Headlight Restoration.",
    copy:
      "Hazy, yellowed headlights are almost always a surface problem, not a hardware one. Multi-stage wet sanding and polishing restore true clarity in hours, without a parts order.",
    image: hlBmwM4,
    imageAlt: "A BMW M4 with its front bumper and headlight assembly removed at Toronto Buffing",
    imageWidth: 1440,
    imageHeight: 1800,
    centered: true,
  },
  sections: [
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
          image: hlGtr,
          alt: "A Nissan Skyline GT-R's headlight masked off for restoration at Toronto Buffing",
          title: "Crystal-Clear Results",
          body: "The result is clarity restored in hours, backed by a 2-year warranty against premature yellowing.",
        },
      ],
    },
    {
      type: "reveal-intro",
      spacious: true,
      eyebrow: "Headlight Restoration",
      heading: "Clear again, the right way.",
      body: "No shortcuts, no sprays. Just careful, hands-on polishing until the lens looks the way it did the day it left the factory.",
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
      type: "reveal-intro",
      eyebrow: "Our Approach",
      heading: "Restore, don’t hide.",
      body: "Toronto Buffing uses multi-stage wet sanding and polishing to physically remove the damaged exterior layer, rather than temporarily covering it with cheap sprays or DIY products.",
    },
    {
      type: "video-showcase",
      src: "/video/headlight-restoration-process.mp4",
    },
    {
      type: "checklist-grid",
      heading: "What It Can Address",
      items: ["Oxidation", "Yellowing", "Haze", "Pitting", "Scratches"],
      note: "With more advanced restoration, deeper gouges and stone-chip damage can also be addressed.",
    },
    {
      type: "banner",
      image: hlPorsche2,
      alt: "A restored, crystal-clear Porsche headlight lens at Toronto Buffing",
      imageWidth: 947,
      imageHeight: 1840,
      fit: "tall",
    },
    {
      type: "trust",
      heading: "Warranty",
      body: "Our headlight restoration services include a 2-year warranty against premature yellowing.",
      points: ["**2-Year** warranty against premature yellowing"],
    },
  ],
  cta: {
    heading: "Bring back the clarity.",
    buttonLabel: "Start Your Quote",
  },
};
