import heroImage from "../../assets/images/services/ceramic-coating.jpg";
import showcaseBanner from "../../assets/images/projects/porsche-silver/1.webp";
import ceramicProLogo from "../../assets/images/brands/ceramic-pro.png";

export const ceramicCoatingPage = {
  hero: {
    title: "Ceramic Coating.",
    copy:
      "A professional ceramic coating chemically bonds with the paint to create a durable, hydrophobic sacrificial layer that increases gloss and helps resist UV exposure, contamination, chemicals and minor wash-induced wear.",
    image: heroImage,
    imageAlt: "A purple BMW being wiped down after ceramic coating application at Toronto Buffing",
    imageWidth: 853,
    imageHeight: 1600,
  },
  sections: [
    {
      type: "intro",
      heading: "Protection Starts With The Paint Underneath",
      body: "Toronto Buffing only installs ceramic coatings on finishes that have first been corrected to the appropriate level. We do not believe in locking defects underneath a long-term coating.",
      quote: "Protecting paint is one thing. Making it worthy of protection comes first.",
    },
    {
      type: "checklist-grid",
      heading: "Why Ceramic Coating",
      items: [
        "Enhanced gloss and depth",
        "Strong hydrophobic behaviour",
        "Easier washing",
        "Resistance to UV exposure",
        "Resistance to contaminants and chemical etching",
        "Reduced accumulation of minor wash-induced wear",
      ],
      note: "Ceramic coating does not protect against physical rock-chip impacts the way PPF does.",
    },
    {
      type: "banner",
      image: showcaseBanner,
      alt: "A freshly corrected and coated vehicle finished in the Toronto Buffing studio",
      imageWidth: 1120,
      imageHeight: 1600,
    },
    {
      type: "steps",
      heading: "Toronto Buffing Installation Process",
      steps: ["Assessment", "Preparation", "Paint Correction", "Ceramic Installation", "Cure"],
    },
    {
      type: "brands",
      heading: "Tested, Not Just Marketed",
      body: "We’ve tested many noteworthy coating brands and evaluate products primarily on strength and hardness, abrasion resistance, chemical and environmental resistance, longevity, and long-term clarity.",
      brands: [{ name: "Ceramic Pro", logo: ceramicProLogo }, { name: "Fireball Korea" }],
    },
    {
      type: "packages",
      heading: "Packages",
      note: "Ceramic coating pricing does not include paint correction. An assessment is required to determine what correction is needed first.",
      groups: [
        {
          label: "Entry & Fireball Korea Coatings",
          tiers: [
            {
              name: "Entry Level Coating",
              price: "$899.99",
              description: "Single-layer coating with approximately 2-year longevity.",
            },
            {
              name: "Fireball Korea 5-Year",
              price: "$1,199.99",
              description: "Single-layer 9H high-solids coating.",
            },
            {
              name: "Fireball Korea 8-Year",
              price: "$2,199.99",
              description: "Two-layer 9H high-solids coating.",
            },
          ],
        },
        {
          label: "Ceramic Pro Complete-Surface Packages",
          tiers: [
            {
              name: "Ceramic Pro Silver",
              price: "$1,599.99",
              priceSuffix: "+ Paint Correction",
              description:
                "5-year warranty with multiple paint layers plus windshield, wheel/caliper and exhaust-tip protection.",
            },
            {
              name: "Ceramic Pro Gold",
              price: "$2,399.99",
              priceSuffix: "+ Paint Correction",
              description: "10-year warranty with expanded multi-layer protection.",
              featured: true,
            },
            {
              name: "Ceramic Pro ION Lifetime",
              price: "$3,499",
              priceSuffix: "+ Paint Correction",
              description: "Their highest-tier Ceramic Pro system with lifetime warranty.",
            },
          ],
        },
      ],
    },
    {
      type: "intro",
      heading: "Cure & Quality Control",
      body: "Vehicles remain indoors for their required drying period and are inspected for imperfections. Toronto Buffing also performs a complimentary mandatory 2-week inspection after coating.",
      note: "Most Ceramic Pro systems require approximately 10–14 days for full cure, while Fireball Korea systems cure in roughly 7 days.",
    },
    {
      type: "intro",
      heading: "Ceramic + PPF",
      body: "Ceramic coating can be applied on top of PPF for added gloss, hydrophobicity and ease of maintenance. It should not be applied beneath PPF because it can interfere with bonding.",
    },
  ],
  cta: {
    heading: "Correct it. Coat it. Preserve it.",
    buttonLabel: "Start Your Quote",
  },
};
