import heroImage from "../../assets/images/services/panel-refinishing.jpg";
import banner from "../../assets/images/services/classic-restoration.jpg";

export const panelRefinishingPage = {
  hero: {
    title: "Panel Refinishing.",
    copy:
      "When damage is beyond what paint correction or isolated chip repair can safely improve, refinishing becomes the proper solution.",
    image: heroImage,
    imageAlt: "A vehicle masked and prepped for paint refinishing in the Toronto Buffing spray booth",
    imageWidth: 1200,
    imageHeight: 1600,
  },
  sections: [
    {
      type: "intro",
      heading: "When Correction Isn’t Enough",
      body: "Panel refinishing is recommended for damage that has gone through the clearcoat, extensive stone chipping, peeling paint, severe scratches, or areas where the existing finish can no longer be safely corrected.",
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
      image: banner,
      alt: "A freshly refinished vehicle in the Toronto Buffing studio",
      imageWidth: 1400,
      imageHeight: 1400,
    },
    {
      type: "intro",
      heading: "Match The Factory Finish",
      body: "Freshly refinished panels are wet sanded and polished where required to help match the texture and gloss of the surrounding factory paint. It's the next step when less invasive repair methods are no longer appropriate.",
    },
  ],
  cta: {
    heading: "When polishing isn’t enough, refinish it properly.",
    buttonLabel: "Start Your Quote",
  },
};
