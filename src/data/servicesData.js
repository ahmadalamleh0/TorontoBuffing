import paintCorrectionImage from "../assets/images/services/paint-correction.jpg";
import ppfImage from "../assets/images/services/ppf.jpg";
import classicRestorationImage from "../assets/images/services/classic-restoration.jpg";
import ceramicCoatingImage from "../assets/images/services/ceramic-coating.jpg";
import panelRefinishingImage from "../assets/images/services/panel-refinishing.jpg";
import headlightRestorationImage from "../assets/images/services/headlight-restoration.jpg";
import paintChipRepairImage from "../assets/images/services/paint-chip-repair.webp";

/**
 * Toronto Buffing service catalogue for the editorial Services
 * section. `image` is null until real photography is supplied — each
 * card falls back to a consistent dark placeholder treatment (same
 * gradient language as the Hero) until then. Swap in an imported
 * image per entry and nothing else about the layout needs to change.
 */

export const FEATURED_SERVICES = [
  { id: "ppf", title: "PPF", subtitle: "Full-Body Protection", image: ppfImage },
  { id: "paint-correction", title: "Paint Correction", subtitle: "Surface Refinement", image: paintCorrectionImage },
  { id: "ceramic-coating", title: "Ceramic Coating", subtitle: "Long-Term Surface Protection", image: ceramicCoatingImage },
];

export const SUPPORTING_SERVICES = [
  { id: "panel-refinishing", title: "Panel Refinishing", subtitle: "Restoration & Repair", image: panelRefinishingImage },
  { id: "headlight-restoration", title: "Headlight Restoration", subtitle: "Lens Clarity", image: headlightRestorationImage },
  { id: "paint-chip-repair", title: "Paint Chip Repair", subtitle: "Precision Touch-Up", image: paintChipRepairImage },
  { id: "classic-restoration", title: "Classic Restoration", subtitle: "Heritage Vehicle Care", image: classicRestorationImage },
];

/** Every service across both groups, for lookups by id/slug (e.g. the per-service page route). */
export const ALL_SERVICES = [...FEATURED_SERVICES, ...SUPPORTING_SERVICES];
