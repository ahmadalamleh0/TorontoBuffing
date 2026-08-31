import heroImage from "../../assets/images/services/ppf.jpg";
import benefitsBanner from "../../assets/images/banner/ppf-benefits.webp";
import stekLogo from "../../assets/images/brands/stek.svg";
import suntekLogo from "../../assets/images/brands/suntek.svg";
import xpelLogo from "../../assets/images/brands/xpel.png";
import hexisLogo from "../../assets/images/brands/hexis.svg";

export const ppfPage = {
  hero: {
    title: "Paint Protection Film.",
    copy:
      "PPF is a clear physical barrier designed to protect automotive paint from rock chips, scratches, UV exposure and environmental damage. It is long-term, removable and self-healing.",
    image: heroImage,
    imageAlt: "Paint protection film being installed on a yellow BMW M4 at Toronto Buffing",
    imageWidth: 1120,
    imageHeight: 1400,
  },
  sections: [
    {
      type: "intro",
      heading: "Built For Real Protection",
      body: "Toronto Buffing recommends PPF especially for new vehicles, specialty vehicles and vehicles with complex or unique paint colours. Unlike ceramic coating, PPF provides physical impact protection — a barrier against rock chips and scratches that a coating alone cannot offer.",
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
      image: benefitsBanner,
      alt: "Toronto Buffing PPF benefits: self-healing protection, hydrophobic surface, warranty coverage, and crystal gloss finish",
      fit: "contain",
      imageWidth: 1448,
      imageHeight: 1086,
    },
    {
      type: "steps",
      heading: "Installation Process",
      steps: [
        "Vehicle cleaning and decontamination",
        "Paint inspection",
        "Paint correction, chip repair or refinishing where required",
        "PPF positioned using installation solution",
        "Film stretched and formed around contours",
        "Water removed and edges finished and tucked",
        "Final inspection",
      ],
    },
    {
      type: "brands",
      heading: "Film Matters",
      body: "Toronto Buffing does not use no-name or offshore film. We install premium, proven films — and stand behind every install.",
      brands: [
        { name: "STEK", logo: stekLogo },
        { name: "SunTek", logo: suntekLogo },
        { name: "XPEL", logo: xpelLogo },
        { name: "Hexis", logo: hexisLogo },
      ],
      highlight:
        "Our most trusted films, based on our own long-term use and testing, are STEK Dynoshield and SunTek Ultra.",
    },
    {
      type: "packages",
      heading: "Packages",
      groups: [
        {
          tiers: [
            {
              name: "Full Front End PPF",
              priceNote: "Starting at",
              price: "$2,100",
              duration: "Approx. 2–4 business days",
              features: [
                "Hood",
                "Fenders",
                "Front bumper",
                "One additional selected area",
                "Basic correction before installation",
                "Up to 5 basic chip repairs",
                "Wrapped and tucked edges",
                "Disassembly when required",
              ],
            },
            {
              name: "Full Body Custom PPF",
              priceNote: "Starting at",
              price: "$8,000",
              duration: "Normally 2+ weeks",
              features: [
                "All exterior painted panels",
                "Basic paint correction",
                "Up to 10 chip repairs",
                "Wrapped and tucked edges",
                "Professional disassembly when required",
              ],
            },
          ],
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
  ],
  cta: {
    heading: "Protect the finish before the damage starts.",
    buttonLabel: "Start Your Quote",
  },
};
