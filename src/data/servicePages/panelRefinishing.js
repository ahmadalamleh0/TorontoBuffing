import heroImage from "../../assets/images/services/panel-refinishing.jpg";
import ceramic1 from "../../assets/images/servicePages/ceramic-coating/ceramic-1.jpg";
import pr1 from "../../assets/images/servicePages/panel-refinishing/pr-1.jpg";
import pr2 from "../../assets/images/servicePages/panel-refinishing/pr-2.jpg";
import pr3 from "../../assets/images/servicePages/panel-refinishing/pr-3.webp";
import pr4 from "../../assets/images/servicePages/panel-refinishing/pr-4.jpg";
import pr5 from "../../assets/images/servicePages/panel-refinishing/pr-5.jpg";

export const panelRefinishingPage = {
  hero: {
    title: "Panel Refinishing.",
    copy:
      "When correction has reached its limit, refinishing picks up where it stops. A properly matched, factory-level finish, not a patch that reads as one.",
    image: heroImage,
    imageAlt: "A vehicle masked and prepped for paint refinishing in the Toronto Buffing spray booth",
    imageWidth: 1200,
    imageHeight: 1600,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Panel Refinishing",
      heading: "A factory-level finish, not a patch that reads as one.",
      body: "When correction has reached its limit, refinishing picks up where it stops. Matched, blended and finished to disappear seamlessly into the surrounding paint.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: ceramic1,
          alt: "A Porsche 911 undergoing paint correction and wheel-off prep at Toronto Buffing",
          title: "Careful Assessment",
          body: "Every panel is assessed to confirm refinishing, not correction, is the right call before any work begins.",
        },
        {
          image: pr3,
          alt: "A bumper in primer, prepped for panel refinishing at Toronto Buffing",
          title: "Factory-Matched Refinishing",
          body: "Panels are properly repaired, primed and colour-matched for a finish that reads as factory, not repaired.",
        },
        {
          image: pr5,
          alt: "A rear bumper removed for panel refinishing at Toronto Buffing",
          title: "Wet Sanded & Polished",
          body: "Freshly refinished panels are wet sanded and polished to match the texture and gloss of the surrounding paint.",
        },
      ],
    },
    {
      type: "process",
      heading: "Refinishing Process",
      steps: [
        {
          title: "Assessment & Prep",
          body: "Panels are inspected, removed where required, and underlying damage is properly repaired.",
        },
        {
          title: "Refinish & Match",
          body: "Appropriate primers and colour-matched paint are applied for a seamless factory-level result.",
        },
        {
          title: "Wet Sand & Polish",
          body: "Clearcoat is wet sanded and polished to match the texture and gloss of the surrounding finish.",
        },
      ],
    },
    {
      type: "intro",
      heading: "When Correction Isn’t Enough",
      body: "Panel refinishing is recommended for damage that has gone through the clearcoat, extensive stone chipping, peeling paint, severe scratches, or areas where the existing finish can no longer be safely corrected.",
    },
    {
      type: "before-after",
      heading: "The Difference Refinishing Makes",
      before: { src: pr2, alt: "Damage and wear on a vehicle's rear bumper before panel refinishing" },
      after: { src: pr1, alt: "A freshly refinished rear bumper finished at Toronto Buffing" },
    },
    {
      type: "intro",
      heading: "Do It Right The First Time",
      body: "Toronto Buffing’s philosophy is to avoid the shortcuts often found in poor repaint work. Our process can involve:",
      list: [
        "Panel and accessory removal when required",
        "Proper repair of underlying damage",
        "Appropriate fillers and primers",
        "Adhesion promoter where necessary",
        "Accurate colour matching",
        "High-quality clearcoat",
        "Wet sanding and polishing after paint",
      ],
    },
    {
      type: "banner",
      image: pr4,
      alt: "Freshly finished vehicles in the Toronto Buffing studio",
      imageWidth: 1440,
      imageHeight: 1800,
    },
  ],
  cta: {
    heading: "When polishing isn’t enough, refinish it properly.",
    buttonLabel: "Start Your Quote",
  },
};
