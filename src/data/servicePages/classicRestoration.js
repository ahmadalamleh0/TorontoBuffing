import heroImage from "../../assets/images/services/classic-restoration.jpg";
import supraDetail from "../../assets/images/projects/supra/1.webp";
import supraResult from "../../assets/images/projects/supra/2.webp";

export const classicRestorationPage = {
  hero: {
    title: "Classic Restoration.",
    copy:
      "Preservation, correction and protection for vehicles that deserve more than a standard detailing package.",
    image: heroImage,
    imageAlt: "A restored vintage green Ford Mustang fastback in the Toronto Buffing studio",
    imageWidth: 1400,
    imageHeight: 1400,
  },
  sections: [
    {
      type: "intro",
      heading: "Complex Restorations Are Our Specialty",
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
      type: "banner",
      image: supraDetail,
      alt: "Detail work during the Toronto Buffing 2001 Toyota Supra restoration",
      imageWidth: 1039,
      imageHeight: 1600,
    },
    {
      type: "intro",
      heading: "Built Around The Vehicle",
      body: "There is no fixed restoration package. Every vehicle is inspected and the process is built around the actual condition of the paint and the owner’s goals.",
      note: "Major restoration projects can involve well over 100 hours of work. Toronto Buffing’s documented 2001 Toyota Supra restoration exceeded 120 hours while retaining its original paint.",
    },
    {
      type: "banner",
      image: supraResult,
      alt: "The finished 2001 Toyota Supra, restored with its original paint retained",
      imageWidth: 1284,
      imageHeight: 1447,
    },
    {
      type: "intro",
      heading: "Preservation First",
      body: "The goal is not simply to make an older car shiny — it is to preserve, restore and protect as much of the original finish as safely possible.",
    },
  ],
  cta: {
    heading: "Special cars require a different standard.",
    buttonLabel: "Book An Assessment",
  },
};
