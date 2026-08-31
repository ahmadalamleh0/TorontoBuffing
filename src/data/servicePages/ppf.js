import heroImage from "../../assets/images/servicePages/ppf/ppf-1.jpeg";
import ppf2 from "../../assets/images/servicePages/ppf/ppf-2.jpeg";
import ppf4 from "../../assets/images/servicePages/ppf/ppf-4.jpg";
import ppf5 from "../../assets/images/servicePages/ppf/ppf-5.webp";
import ppf6 from "../../assets/images/servicePages/ppf/ppf-6.webp";
import ppfInstallShowcase from "../../assets/images/services/ppf.jpg";

export const ppfPage = {
  hero: {
    title: "Paint Protection Film.",
    copy:
      "Protection without changing the character of the car. Premium PPF creates an invisible barrier against stone chips, road debris and daily wear while preserving the depth and finish of the paint beneath it.",
    image: heroImage,
    imageAlt: "Technicians installing paint protection film on a vehicle at Toronto Buffing",
    imageWidth: 1278,
    imageHeight: 2048,
  },
  sections: [
    {
      type: "reveal-intro",
      eyebrow: "Paint Protection Film",
      heading: "Invisible protection built for the road ahead.",
      body: "Premium PPF creates a durable, self-healing barrier that protects the vehicle's finish while preserving its original appearance.",
    },
    {
      type: "feature-cards",
      cards: [
        {
          image: ppfInstallShowcase,
          alt: "A technician carefully applying paint protection film to a BMW M4 at Toronto Buffing",
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
      type: "intro",
      heading: "The Toronto Buffing Approach",
      body: "What sets our installations apart:",
      list: [
        "Veteran PPF installation experience",
        "Bulk installations with wrapped and tucked edges",
        "Paint defects repaired before film is installed",
        "Licensed autobody technicians available for disassembly when required",
        "Minimal use of primers and adhesion promoters",
        "Strict quality control",
        "Mandatory complimentary 2-week inspection after installation",
      ],
    },
    {
      type: "banner",
      image: ppf2,
      alt: "Detail work during a paint protection film installation at Toronto Buffing",
      imageWidth: 1188,
      imageHeight: 2048,
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
        "10-Year minimum material warranty",
        "In-house workmanship guarantee",
        "Complimentary 2-week post-install inspection",
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
