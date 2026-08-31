import heroImage from "../../assets/images/services/paint-correction.jpg";
import garageBanner from "../../assets/images/banner/garage-showcase.jpg";

export const paintCorrectionPage = {
  hero: {
    title: "True Paint Correction.",
    copy:
      "Paint correction removes defects from the finish by carefully leveling a small amount of clearcoat through machine polishing, compounds and, where necessary, fine wet sanding.",
    image: heroImage,
    imageAlt: "A Porsche 911 being machine-polished during paint correction at Toronto Buffing",
    imageWidth: 1054,
    imageHeight: 1600,
  },
  sections: [
    {
      type: "intro",
      heading: "The Right Process, Not The Easy Process",
      body: [
        "We do not simply let customers choose a “light” correction if the paint requires more work. Every vehicle is assessed first, and the appropriate correction process is recommended based on its actual condition.",
        "Our goal is to remove as many defects as safely possible — without compromising the long-term integrity of the clearcoat.",
      ],
    },
    {
      type: "checklist-grid",
      heading: "What Paint Correction Can Address",
      items: [
        "Swirl marks",
        "Wash-induced scratches",
        "Haze",
        "Oxidation",
        "Water-spot etching",
        "Holograms / buffer trails",
        "Certain deeper isolated defects",
      ],
      note: "Damage that has gone through the clearcoat may require chip repair or panel refinishing instead.",
    },
    {
      type: "banner",
      image: garageBanner,
      alt: "Vehicles in the Toronto Buffing studio prepared for paint correction",
      imageWidth: 1564,
      imageHeight: 1564,
    },
    {
      type: "steps",
      heading: "Preparation Matters",
      steps: [
        "Chemical pre-wash",
        "Hand wash",
        "Clay-bar and bonded contaminant removal",
        "Iron and tar treatment when required",
        "Drying and compressed-air purge",
        "Masking sensitive trim",
        "Paint-thickness measurement where needed",
        "Test spot and correction strategy",
      ],
    },
    {
      type: "packages",
      heading: "Correction Levels",
      groups: [
        {
          tiers: [
            {
              name: "2-Stage Polish",
              priceNote: "Starting at",
              price: "$899.99",
              duration: "Approx. 1 day",
              description:
                "For minor to moderate defects on new or lightly used vehicles. A cutting and refinement process.",
            },
            {
              name: "3-Stage Cut & Polish",
              priceNote: "Starting at",
              price: "$1,099.99",
              duration: "Approx. 2 days",
              description:
                "Toronto Buffing’s most common restoration package. Three stages of machining, with approximately 90–95% removal of safely removable visible defects depending on the finish.",
              featured: true,
              badge: "Most Common",
            },
            {
              name: "Complete Paint Correction",
              priceNote: "Starting at",
              price: "$1,499.99",
              duration: "Approx. 3 days",
              description:
                "Designed for heavily defected finishes requiring maximum safe correction and additional finishing and jeweling.",
            },
            {
              name: "Full Vehicle 3000-Grit Watersand",
              priceNote: "Starting at",
              price: "$2,999.99",
              duration: "Approx. 4 days",
              description:
                "For severe defects, paint texture or compromised coatings where advanced correction is required.",
            },
          ],
        },
      ],
    },
    {
      type: "intro",
      heading: "3-Stage Is The Flagship",
      body: "A true 3-stage correction uses separate cutting and refinement combinations depending on the paint’s hardness and condition. It allows aggressive defects to be corrected first, then progressively refined to eliminate haze and maximize gloss.",
      note: "Depending on the vehicle and paint condition, a 3-stage correction can range from roughly 8 hours to over 30 hours.",
    },
    {
      type: "intro",
      heading: "Preserve The Clearcoat",
      body: "Correction does remove a small amount of clearcoat. We measure the paint and use the gentlest effective process for the job — and if safely removing a defect would compromise the finish, we stop and recommend an alternative repair.",
    },
    {
      type: "intro",
      heading: "Protect The Result",
      body: "Corrected paint should be protected. Every correction package includes a 30-day sealant, and ceramic coating or PPF can be added separately for longer-term protection.",
    },
  ],
  cta: {
    heading: "Your paint doesn’t need a quick polish. It needs the right correction.",
    buttonLabel: "Book An Assessment",
  },
};
