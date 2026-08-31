import heroImage from "../../assets/images/servicePages/ppf/ppf-1.jpeg";
import ppf2 from "../../assets/images/servicePages/ppf/ppf-2.jpeg";
import ppf4 from "../../assets/images/servicePages/ppf/ppf-4.jpg";
import ppf5 from "../../assets/images/servicePages/ppf/ppf-5.webp";
import ppf6 from "../../assets/images/servicePages/ppf/ppf-6.webp";
import ppfCraftsmanship from "../../assets/images/servicePages/ppf/ppf-craftsmanship2.jpeg";

export const ppfPage = {
  hero: {
    title: "Paint Protection Film.",
    copy: "Paint protection film applies a clear, self-healing layer over vulnerable panels, shielding the paint from stone chips, road debris and daily wear without changing its appearance.",
    centered: true,
    titleNoWrap: true,
    image: heroImage,
    imageAlt: "Technicians installing paint protection film on a vehicle at Toronto Buffing",
    imageWidth: 1278,
    imageHeight: 2048,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Paint Protection Film",
      heading: "Protected paint, untouched appearance.",
      body: "Precision-cut and hand-finished, every panel is wrapped to disappear into the factory line, so the protection never announces itself.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: ppf2,
          alt: "Detail work during a paint protection film installation at Toronto Buffing",
          title: "Precision Installation",
          body: "Every panel is carefully measured, cut, and installed to create seamless protection while preserving the original design of the vehicle.",
        },
        {
          image: ppf4,
          alt: "A fully wrapped vehicle finished with paint protection film at Toronto Buffing",
          title: "Invisible Defense",
          body: "Advanced paint protection film shields against chips, scratches, and daily road damage while keeping the original finish untouched.",
        },
        {
          image: ppf5,
          alt: "A technician preparing paint protection film for a precise, lasting install at Toronto Buffing",
          title: "Long-Term Protection",
          body: "Self-healing technology and premium materials help maintain a flawless finish for years to come.",
        },
      ],
    },
    {
      type: "banner",
      image: ppfCraftsmanship,
      alt: "A row of vehicles staged for detail work in the Toronto Buffing studio",
      imageWidth: 1281,
      imageHeight: 1998,
      overlay: "16+ Years Craftsmanship",
    },
    {
      type: "approach",
      eyebrow: "The Toronto Buffing Approach",
      heading: ["Built different.", "Installed right."],
      body: "What sets our installations apart: the process, the standards, and the care in every detail.",
      items: [
        { text: "**Veteran** PPF installation experience" },
        { text: "**Bulk** installations with **wrapped and tucked edges**" },
        { text: "**Minimal use** of primers and adhesion promoters" },
        { text: "Mandatory complimentary **2-week inspection** after installation" },
      ],
    },
    {
      type: "process",
      heading: "Installation Process",
      steps: [
        {
          title: "Preparation",
          body: "Vehicle inspection, cleaning, and surface preparation to ensure the perfect foundation.",
        },
        {
          title: "Precision Installation",
          body: "Film is carefully positioned and installed to follow the vehicle's exact contours.",
        },
        {
          title: "Final Refinement",
          body: "Edges are finished and the installation is inspected for a seamless result.",
        },
      ],
    },
    {
      type: "trust",
      heading: "Warranty & Trust",
      body: "Our films carry a minimum 10-year material warranty, backed by Toronto Buffing's own in-house workmanship guarantee.",
      points: [
        "**10-Year** minimum material warranty",
        "In-house workmanship guarantee",
        "Complimentary **2-week** post-install inspection",
      ],
    },
    {
      type: "banner",
      image: ppf6,
      alt: "Diagram of PPF's layered construction: cap sheet, self-healing top coat, TPU, adhesive and release liner",
      fit: "contain",
      imageWidth: 600,
      imageHeight: 300,
    },
  ],
  cta: {
    heading: "Protect the finish before the damage starts.",
    buttonLabel: "Start Your Quote",
  },
};
