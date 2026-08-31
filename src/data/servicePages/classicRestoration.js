import oldHeroImage from "../../assets/images/servicePages/classic-restoration/classic-1.jpg";
import classic2 from "../../assets/images/servicePages/classic-restoration/classic-2.jpg";
import classic3 from "../../assets/images/servicePages/classic-restoration/classic-3.jpg";
import classic4 from "../../assets/images/servicePages/classic-restoration/classic-4.jpg";
import classic5 from "../../assets/images/servicePages/classic-restoration/classic-5.jpg";
import classic7 from "../../assets/images/servicePages/classic-restoration/classic-7.webp";
import classic8 from "../../assets/images/servicePages/classic-restoration/classic-8.jpg";
import heroImage from "../../assets/images/servicePages/classic-restoration/classic-9.jpg";

export const classicRestorationPage = {
  hero: {
    title: "Classic Restoration.",
    copy:
      "Classic restoration corrects decades of wear and prior workmanship while preserving as much of the vehicle's original paint as possible, with a plan built around its actual condition.",
    image: classic7,
    imageAlt: "Detail of a restored Chevrolet Corvette Sting Ray's rear end",
    imageWidth: 1280,
    imageHeight: 960,
  },
  sections: [
    {
      type: "feature-cards",
      cards: [
        {
          image: heroImage,
          alt: "A restored green Lada 1300S sedan finished at Toronto Buffing",
          title: "Built Around The Vehicle",
          body: "There is no fixed restoration package. Every classic is inspected and the process is built around its actual condition and history.",
        },
        {
          image: classic5,
          alt: "A mint green Ford Mustang Mach 1 finished at Toronto Buffing",
          title: "Decades Of Craftsmanship",
          body: "Full-body wet sanding, multi-stage correction and touch-up repair combine to correct decades of wear and prior workmanship.",
        },
        {
          image: classic8,
          alt: "Close-up of a freshly corrected red muscle car's fender and wheel",
          title: "Preservation First",
          body: "The goal isn't just shine. It's preserving and protecting as much of the original finish as safely possible.",
        },
      ],
    },
    {
      type: "reveal-intro",
      spacious: true,
      eyebrow: "Classic Restoration",
      heading: "Some cars aren't just driven. They're preserved.",
      body: "Every classic gets the patience, respect, and time it takes to protect a finish decades in the making.",
    },
    {
      type: "process",
      heading: "Restoration Process",
      steps: [
        {
          title: "Assessment",
          body: "Every vehicle is inspected and a plan is built around its actual paint condition and the owner's goals.",
        },
        {
          title: "Restoration Work",
          body: "Wet sanding, multi-stage correction and repair combine to correct decades of wear and prior workmanship.",
        },
        {
          title: "Preservation & Protection",
          body: "The finish is preserved and protected, with PPF or ceramic coating added where it serves the vehicle long-term.",
        },
      ],
    },
    {
      type: "reveal-intro",
      compact: true,
      eyebrow: "Our Specialty",
      heading: "Complex restorations, done right.",
      body: "Toronto Buffing takes on intricate and delicate vehicles where the goal is often to preserve original paint while correcting decades of wear, defects and previous poor workmanship. Our restoration work can combine services such as:",
      list: [
        "Full-body wet sanding",
        "Multi-stage paint correction",
        "Chip and touch-up repair",
        "Isolated corrosion repair",
        "Headlight restoration",
        "Panel refinishing where required",
        "Polishing of jambs, glass and smaller painted areas",
        "PPF",
        "Ceramic coating",
      ],
    },
    {
      type: "gallery",
      heading: "The Restoration Journey",
      images: [
        { src: oldHeroImage, alt: "A restored dark green Ford Mustang fastback in the Toronto Buffing studio" },
        { src: classic2, alt: "A navy blue Chevrolet Corvette Sting Ray convertible finished at Toronto Buffing" },
        { src: classic3, alt: "A Shelby Mustang finished with fresh racing stripes at Toronto Buffing" },
        { src: classic4, alt: "A restored Chevrolet Corvette Sting Ray coupe in the Toronto Buffing studio" },
        { src: classic5, alt: "A mint green Ford Mustang Mach 1 finished at Toronto Buffing" },
        { src: classic7, alt: "Detail of a restored Chevrolet Corvette Sting Ray's rear end" },
        { src: classic8, alt: "Close-up of a freshly corrected red muscle car's fender and wheel" },
        { src: heroImage, alt: "A restored green Lada 1300S sedan finished at Toronto Buffing" },
      ],
    },
    {
      type: "reveal-intro",
      compact: true,
      eyebrow: "Our Philosophy",
      heading: "Built around the vehicle.",
      body: "There is no fixed restoration package. Every vehicle is inspected and the process is built around the actual condition of the paint and the owner’s goals.",
      note: "Major restoration projects can involve well over 100 hours of work. Toronto Buffing’s documented 2001 Toyota Supra restoration exceeded 120 hours while retaining its original paint.",
    },
  ],
  cta: {
    heading: "Special cars require a different standard.",
    buttonLabel: "Book An Assessment",
  },
};
