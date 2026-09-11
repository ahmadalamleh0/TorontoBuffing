/**
 * QA-passed launch-batch content, dev-only preview copy — expanded
 * version (6 to 8 sections per page).
 *
 * This is the exact page content scripts/publish-launch-batch.mjs
 * will write to Supabase — duplicated here (not imported from that
 * script) because that script is Node-only (reads files from disk,
 * uploads to Supabase Storage) and can't run in the browser. Local
 * image imports stand in for the Supabase Storage URLs the real
 * script resolves via its img() helper, so this preview needs no
 * network/database access at all.
 *
 * If you change a page's copy here after approving it, make the same
 * edit in scripts/publish-launch-batch.mjs before publishing — this
 * file is preview-only and is never read by the live site.
 */
import ppfCraftsmanship2 from "../../assets/images/servicePages/ppf/ppf-craftsmanship2.jpeg";
import ceramic2 from "../../assets/images/servicePages/ceramic-coating/ceramic-2.jpg";
import ppf1 from "../../assets/images/servicePages/ppf/ppf-1.jpeg";

const CREDIBILITY_POINTS = [
  "Correction work recognized at Porsche Centre Concours events",
  "Recognition at the Cobble Beach Concours d'Elegance",
  "A completed restoration featured in Speedhunters",
  "Ceramic Pro certified technicians",
];

export const PREVIEW_GEO_PAGES = [
  {
    slug: "vaughan-paint-correction-and-protection",
    title: "Vaughan Paint Correction and Protection Studio",
    hero: {
      title: "Based In Vaughan. Built For The Work, Not Just The Address.",
      copy: "Toronto Buffing operates from one studio in Vaughan, Ontario. Every paint correction, ceramic coating and paint protection film install starts with an in person look at the actual vehicle, not a quote guessed from a photo.",
      centered: true,
      image: ppfCraftsmanship2,
      imageAlt: "Vehicles staged for paint correction and protection work at Toronto Buffing's Vaughan, Ontario studio",
      imageWidth: 1281,
      imageHeight: 1998,
    },
    sections: [
      {
        type: "reveal-intro",
        eyebrow: "Vaughan, Ontario",
        heading: "A Studio Built Around Getting The Assessment Right First",
        body: "Paint correction and ceramic coating cannot be quoted accurately from a photo or a phone call. The condition of the clear coat, the depth of any swirl marks, and the history of the paint all have to be checked in person before a real plan can be made. Vaughan sits along Highway 400 and Highway 407, and the studio itself is easy to reach from either.",
      },
      {
        type: "intro",
        heading: "Why Paint Correction Comes First",
        body: [
          "A ceramic coating or a film cannot fix a scratch, a swirl mark or years of oxidation underneath it. It simply seals in whatever is already there. That is why every protection plan at Toronto Buffing starts with an honest look at the paint itself, and **[Paint Correction](/services/paint-correction)** is applied before anything is sealed on top of it.",
          "Correction uses machine polishers, foam or wool pads and graded compounds to level the smallest possible amount of clear coat, removing marks such as swirl marks, water spot etching, oxidation and light scratching. The number of stages used depends on how much correction the paint actually needs, not a fixed package.",
        ],
        list: [
          "Removes swirl marks and wash induced scratching",
          "Corrects oxidation and clear coat haze",
          "Levels water spot etching where the clear coat allows it",
          "Prepares the surface properly for ceramic coating or PPF",
        ],
        note: "This is also the standard behind our Detailers With Integrity approach. We correct the paint properly first, then protect it, rather than protecting a problem that is still there.",
      },
      {
        type: "benefits",
        heading: "Paint Protection Film, Explained",
        items: [
          { title: "What It Actually Protects Against", body: "**[PPF](/services/ppf)** is a clear polyurethane film applied over vulnerable panels. It absorbs the physical impact of stone chips, road debris and light scratching that a ceramic coating alone cannot stop, since a coating is a thin chemical layer rather than a physical barrier." },
          { title: "Coverage Options", body: "Coverage ranges from a front end package covering the hood, front bumper, fenders and mirrors, up to full body coverage. The right amount depends on how the vehicle is driven and what level of risk feels acceptable to the owner." },
          { title: "Why Installer Quality Matters", body: "Film that is hand cut and wrapped around a panel's edges sits differently than film cut from a generic template and stopped short at a visible seam. Wrapped edges reduce the chance of dirt or moisture working underneath the film over time." },
          { title: "Curing Takes Time", body: "The adhesive bonding film to paint keeps hardening for weeks after install, not hours. Early inspections exist to catch anything that needs attention while the film is still settling, which is why Toronto Buffing includes a complimentary two week inspection with every PPF install." },
        ],
      },
      {
        type: "intro",
        heading: "Where Ceramic Coating Fits",
        body: [
          "**[Ceramic Coating](/services/ceramic-coating)** is a liquid layer that chemically bonds to the clear coat, creating a hard, glossy, hydrophobic surface that is easier to keep clean and more resistant to chemical staining and UV fading.",
          "It is not a substitute for paint correction and it is not a substitute for PPF. A coating locks in whatever condition the paint is already in, and it does not stop a stone chip the way a physical film does. Many owners apply ceramic coating over PPF, which adds gloss and easier maintenance on top of the film's physical protection.",
        ],
        list: ["Adds gloss and a hydrophobic finish", "Makes regular washing easier", "Does not correct existing paint defects", "Does not replace PPF as physical chip protection"],
      },
      {
        type: "stage-list",
        heading: "Matching Protection To How The Vehicle Is Actually Used",
        stages: [
          { title: "New Vehicles", body: "The paint is usually in its best condition on day one. The priority is preventing damage rather than correcting it, so PPF and ceramic coating are often applied with little or no correction needed first." },
          { title: "Daily Drivers", body: "Vehicles used year round benefit from front end PPF where road debris actually lands, paired with ceramic coating to make regular washing and winter cleanup easier." },
          { title: "Enthusiast And Collector Vehicles", body: "Cars kept for years rather than a few, or vehicles with real history, are usually better served by a full assessment and a correction plan matched to the paint's actual condition, followed by full body protection." },
        ],
      },
      {
        type: "trust",
        heading: "Why Toronto Buffing",
        body: "Detailers With Integrity is not a slogan we treat lightly. It means correcting paint properly before protecting it, using premium films and coatings rather than the cheapest available option, and telling a client honestly when a service is not the right fit for their vehicle.",
        points: CREDIBILITY_POINTS,
      },
      {
        type: "benefits",
        heading: "Common Questions",
        items: [
          { title: "Do I need paint correction before ceramic coating or PPF?", body: "Not always, but any existing swirl marks, oxidation or scratching will still be visible underneath a coating or film. If the paint already looks close to its best, correction may be minimal or unnecessary." },
          { title: "Can PPF be removed later without damaging the paint?", body: "In most cases yes, when it was installed correctly and the paint underneath was in good condition to begin with. Removal is more difficult on paint that was already compromised before the film went on." },
          { title: "How long does ceramic coating actually last?", body: "Depending on the product used and how the vehicle is maintained, a professionally applied ceramic coating can last anywhere from one to several years." },
          { title: "Can ceramic coating go over PPF?", body: "Yes. Applying ceramic coating over PPF is common and adds gloss and easier maintenance on top of the film's physical protection." },
        ],
      },
    ],
    seo_title: "Paint Correction, PPF and Ceramic Coating in Vaughan | Toronto Buffing",
    seo_description: "Toronto Buffing has operated from Vaughan, Ontario for over sixteen years. See how paint correction, ceramic coating and paint protection film fit together, and how to choose the right protection for your vehicle.",
  },
  {
    slug: "markham-luxury-import-paint-correction",
    title: "Markham Import and Luxury Vehicle Paint Correction",
    hero: {
      title: "Paint Condition That Actually Gets Noticed",
      copy: "Between vehicles returned at the end of a lease, cars prepared for resale, and vehicles bought specifically for how they look, paint condition carries real weight here. Toronto Buffing corrects, protects and maintains that finish properly rather than covering it up.",
      centered: true,
      image: ceramic2,
      imageAlt: "Two finished Porsche 911 GT3s at Toronto Buffing's studio",
      imageWidth: 1290,
      imageHeight: 1720,
    },
    sections: [
      {
        type: "reveal-intro",
        eyebrow: "Markham",
        heading: "Paint Condition Is Not Only About Appearance",
        body: "A vehicle returned at the end of a lease with visible swirl marks or etching can cost money in inspection fees. A resale listing with dull or scratched paint sets a lower first impression before a buyer even sees the interior. Correction and protection address that directly, not only the shine.",
      },
      {
        type: "intro",
        heading: "Correction Before Protection, Always",
        body: [
          "**[Paint Correction](/services/paint-correction)** removes the swirl marks, oxidation and light scratching that a coating or film would otherwise seal in rather than fix. This matters most when paint condition has a direct financial consequence, such as a lease return inspection or a resale listing.",
          "The number of stages used is matched to the paint's actual condition rather than a fixed package, which is part of what our Detailers With Integrity approach means in practice.",
        ],
        list: ["Removes swirl marks before they get sealed under a coating", "Corrects oxidation and etching where the clear coat allows it", "Improves how a vehicle presents in resale photography", "Matched to the paint's condition rather than a flat package"],
      },
      {
        type: "benefits",
        heading: "Paint Protection Film On A Vehicle You May Not Keep Forever",
        items: [
          { title: "Protecting Value, Not Just Appearance", body: "**[PPF](/services/ppf)** is a clear film that absorbs stone chips and light scratching physically, rather than only chemically resisting them. On a leased or soon to be resold vehicle, that protection can be the difference between a clean inspection and a deduction." },
          { title: "Coverage Options", body: "A front end package covers the hood, front bumper, fenders and mirrors, where most highway debris actually lands. Full body coverage extends that protection to every exterior panel." },
          { title: "Why Installation Quality Matters", body: "Film that is hand cut and wrapped around a panel's edges holds up differently than film stopped short at a visible seam from a generic template. On an imported or specialty finish, a clean installation matters even more, since colour matching a damaged panel can be difficult." },
          { title: "Curing Takes Real Time", body: "The bond between film and paint continues to harden for weeks, not hours. Toronto Buffing includes a complimentary two week inspection with every install to catch anything that needs attention early." },
        ],
      },
      {
        type: "intro",
        heading: "Where Ceramic Coating Fits",
        body: [
          "**[Ceramic Coating](/services/ceramic-coating)** bonds to the clear coat and creates a glossy, hydrophobic layer that is easier to maintain and more resistant to chemical staining and UV fading.",
          "It does not correct existing defects and it does not physically stop a stone chip the way PPF does. On imported and luxury finishes in particular, coating is best applied after correction, and it pairs well over PPF rather than replacing it.",
        ],
        list: ["Improves gloss and ease of maintenance", "Resists chemical staining and UV fading", "Does not correct existing paint defects", "Works best applied after correction, not instead of it"],
      },
      {
        type: "stage-list",
        heading: "Choosing Protection Around How The Vehicle Will Be Used",
        stages: [
          { title: "Leased Vehicles", body: "The goal is usually preventing deductions at return, which makes front end PPF and a coating a practical combination without needing full correction on a newer vehicle." },
          { title: "Vehicles Prepared For Resale", body: "A short correction pass followed by a coating can meaningfully improve how a vehicle presents in listing photography and in person viewings." },
          { title: "Imported And Specialty Vehicles", body: "Finishes that are harder to colour match benefit from a careful, correctly sequenced plan, since a mistake is more costly to fix than on a common colour." },
        ],
      },
      {
        type: "trust",
        heading: "Why Toronto Buffing",
        body: "Detailers With Integrity means correcting paint properly, using premium materials, and telling a client honestly what their vehicle actually needs rather than what is easiest to sell.",
        points: CREDIBILITY_POINTS,
      },
      {
        type: "benefits",
        heading: "Common Questions",
        items: [
          { title: "Will correction help before a lease return inspection?", body: "In many cases yes. Removing visible swirl marks or light scratching before an inspection can help the vehicle present better, though correction cannot fix deeper damage such as dents or deep scratches." },
          { title: "Does PPF interfere with paint colour on an imported vehicle?", body: "No. PPF is a clear film applied over the existing paint. It does not alter colour, and a correctly installed film is not visible under normal lighting." },
          { title: "Is ceramic coating worth it on a leased vehicle?", body: "It can be, since it makes regular washing easier and helps resist staining, though the value depends on how long the lease term is and how the vehicle is used." },
          { title: "Can a swirl marked finish be fully corrected?", body: "Most swirl marks can be significantly improved or removed through machine polishing. Very deep marks may require more aggressive correction or, in rare cases, are beyond what correction alone can fix." },
        ],
      },
    ],
    seo_title: "Paint Correction and PPF for Luxury and Import Vehicles in Markham | Toronto Buffing",
    seo_description: "Paint correction, ceramic coating and paint protection film for Markham vehicles, including lease return and resale ready detailing from Toronto Buffing.",
  },
  {
    slug: "richmond-hill-new-car-protection",
    title: "Richmond Hill New Vehicle Paint Protection",
    hero: {
      title: "New Vehicle. No Damage Yet. Keep It That Way.",
      copy: "The best time to protect a vehicle's paint is before it has been driven at all, not after the first stone chip appears. Toronto Buffing applies paint protection film and ceramic coating to lock in factory condition from day one.",
      centered: true,
      image: ppf1,
      imageAlt: "A technician installing paint protection film on a vehicle at Toronto Buffing",
      imageWidth: 1278,
      imageHeight: 2048,
    },
    sections: [
      {
        type: "reveal-intro",
        eyebrow: "Richmond Hill",
        heading: "Protection Before Damage, Not Instead Of Repair",
        body: "Factory paint is usually at its best the day a vehicle is picked up. Applying PPF and ceramic coating early means the goal is prevention rather than correcting damage that never needed to happen in the first place.",
      },
      {
        type: "intro",
        heading: "Where Correction Still Matters On A New Vehicle",
        body: [
          "Most new vehicles do not need full **[Paint Correction](/services/paint-correction)**, since the clear coat has not yet been exposed to years of washing, sun or road debris. That said, factory paint can still show light marks from transport, dealer preparation or handling before delivery.",
          "When correction is needed on a newer vehicle, it is usually light, focused on removing those early marks rather than a full multi stage process. This keeps as much of the original clear coat intact as possible before protection is applied on top.",
        ],
        list: ["Removes light transport or handling marks before protection is applied", "Preserves as much original clear coat as possible", "Confirms the paint is actually ready for coating or film"],
      },
      {
        type: "benefits",
        heading: "Locking In Factory Condition With PPF",
        items: [
          { title: "Protecting Paint That Is Already At Its Best", body: "**[PPF](/services/ppf)** is a clear film that physically absorbs stone chips and light scratching. Applied to a vehicle with no existing damage, it protects paint that is already in its best possible condition." },
          { title: "Coverage Options", body: "A front end package covers the hood, front bumper, fenders and mirrors. Full body coverage extends protection to the entire exterior for owners who want to minimize risk everywhere." },
          { title: "Why A Clean Install Matters More On New Paint", body: "Film that is hand cut and wrapped around panel edges avoids the visible seams that come from a generic template. On paint with zero existing wear, a poor installation is the only thing that would introduce a flaw." },
          { title: "Curing Still Takes Weeks", body: "The adhesive bond between film and paint keeps hardening for weeks after install. A complimentary two week inspection is included with every PPF install to check on that process." },
        ],
      },
      {
        type: "intro",
        heading: "Ceramic Coating On A New Vehicle",
        body: [
          "**[Ceramic Coating](/services/ceramic-coating)** bonds to the clear coat and creates a glossy, hydrophobic finish that is easier to keep clean. On a new vehicle, it is often applied at the same time as PPF, coating the film itself as well as any uncovered panels.",
          "It is not a substitute for PPF. A coating resists chemical staining and UV fading, but it will not stop a stone chip the way a physical film does.",
        ],
        list: ["Adds gloss and makes cleaning easier", "Resists chemical staining and UV fading", "Does not physically stop stone chips", "Often applied together with PPF on new vehicles"],
      },
      {
        type: "stage-list",
        heading: "Deciding How Much Coverage Makes Sense",
        stages: [
          { title: "Front End Only", body: "A practical starting point for owners who mainly want to protect the panels most exposed to highway debris, without covering the entire vehicle." },
          { title: "Full Body Coverage", body: "The most complete option, suited to owners who want to minimize risk everywhere and plan to keep the vehicle for a longer period." },
          { title: "Coating Alone", body: "A reasonable choice for owners mainly focused on easier maintenance and gloss, who accept that a coating will not stop a physical impact the way film does." },
        ],
      },
      {
        type: "trust",
        heading: "Why Toronto Buffing",
        body: "Detailers With Integrity means recommending what a vehicle actually needs, not the largest package available. On a new vehicle that often means light or no correction at all, paired with the right protection.",
        points: CREDIBILITY_POINTS,
      },
      {
        type: "benefits",
        heading: "Common Questions",
        items: [
          { title: "Does a brand new vehicle need paint correction?", body: "Usually not a full process, though light marks from transport or dealer handling are common enough to check for before applying protection." },
          { title: "Is it too early to apply PPF to a new vehicle?", body: "No. Applying PPF before the first real drive is one of the more effective times to do it, since there is no existing damage to work around." },
          { title: "Should I get PPF, ceramic coating, or both?", body: "Many new vehicle owners choose both, since PPF handles physical impacts and ceramic coating adds gloss and easier maintenance on top of it." },
          { title: "How soon after delivery should protection be applied?", body: "As soon as reasonably possible. Every day without protection is a day the paint is exposed to avoidable risk." },
        ],
      },
    ],
    seo_title: "New Vehicle PPF and Ceramic Coating in Richmond Hill | Toronto Buffing",
    seo_description: "Protect a new vehicle's paint from day one. Paint protection film and ceramic coating for Richmond Hill drivers, applied before the first chip, not after.",
  },
];
