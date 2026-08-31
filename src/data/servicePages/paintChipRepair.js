import heroImage from "../../assets/images/services/paint-chip-repair-new.jpeg";
import banner from "../../assets/images/banner/garage-showcase.jpg";

export const paintChipRepairPage = {
  hero: {
    title: "Paint Chip Repair.",
    copy:
      "Small chips can become much bigger problems when exposed metal or primer is left vulnerable to corrosion.",
    image: heroImage,
    imageAlt: "A green BMW marked with yellow chip-repair spots during preparation at Toronto Buffing",
    imageWidth: 1252,
    imageHeight: 2048,
  },
  sections: [
    {
      type: "intro",
      heading: "More Than A Touch-Up",
      body: "Toronto Buffing does not use a simple “dab and walk away” approach. Our process includes:",
      list: [
        "Cleaning and decontamination",
        "Scuff preparation",
        "Addressing corrosion where required",
        "Multiple layers of basecoat",
        "Leveling and wet sanding",
        "Clearcoat",
        "Final sanding and machine polishing",
      ],
      note: "Chip repair is designed to stop corrosion and greatly improve appearance — not every repair will be made completely invisible.",
    },
    {
      type: "banner",
      image: banner,
      alt: "A vehicle prepared for detail work in the Toronto Buffing studio",
      imageWidth: 1564,
      imageHeight: 1564,
    },
    {
      type: "intro",
      heading: "When Chip Repair Makes Sense",
      body: [
        "Chip repair is best for isolated chips where the surrounding paint is still healthy.",
        "If a panel has extensive chipping, chips larger than roughly a pencil eraser, peeling paint, microchipping or severe sandblasting, panel refinishing may be the better solution.",
      ],
      note: "Chip repair is not offered as a standalone booking. It must be combined with a larger service such as Paint Correction, PPF or Ceramic Coating.",
    },
    {
      type: "packages",
      heading: "Pricing",
      groups: [
        {
          tiers: [
            {
              name: "Per-Chip Repair",
              priceNote: "Starting at",
              price: "$69.99",
              description: "Priced per chip. Must be combined with Paint Correction, PPF or Ceramic Coating.",
            },
            {
              name: "Full-Body Chip Repair",
              description: "Available for more extensive projects — contact us for a quote.",
            },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Repair it before you protect it.",
    buttonLabel: "Start Your Quote",
  },
};
