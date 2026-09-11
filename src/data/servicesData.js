import paintCorrectionImage from "../assets/images/services/paint-correction-new.webp";
import ppfImage from "../assets/images/services/ppf.jpg";
import classicRestorationImage from "../assets/images/services/classic-restoration-new.jpg";
import ceramicCoatingImage from "../assets/images/services/ceramic-coating.jpg";
import panelRefinishingImage from "../assets/images/services/panel-refinishing.jpg";
import headlightRestorationImage from "../assets/images/services/headlight-restoration.jpg";
import paintChipRepairImage from "../assets/images/services/paint-chip-repair-new.jpeg";
import { ppfPage } from "./servicePages/ppf";
import { paintCorrectionPage } from "./servicePages/paintCorrection";
import { ceramicCoatingPage } from "./servicePages/ceramicCoating";
import { headlightRestorationPage } from "./servicePages/headlightRestoration";
import { paintChipRepairPage } from "./servicePages/paintChipRepair";
import { panelRefinishingPage } from "./servicePages/panelRefinishing";
import { classicRestorationPage } from "./servicePages/classicRestoration";

/**
 * Toronto Buffing service catalogue for the editorial Services
 * section. `image` is null until real photography is supplied — each
 * card falls back to a consistent dark placeholder treatment (same
 * gradient language as the Hero) until then. Swap in an imported
 * image per entry and nothing else about the layout needs to change.
 */

export const FEATURED_SERVICES = [
  { id: "ppf", title: "PPF", subtitle: "Full-Body Protection", image: ppfImage, page: ppfPage },
  {
    id: "paint-correction",
    title: "Paint Correction",
    subtitle: "Surface Refinement",
    image: paintCorrectionImage,
    page: paintCorrectionPage,
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    subtitle: "Long-Term Surface Protection",
    image: ceramicCoatingImage,
    page: ceramicCoatingPage,
  },
];

export const SUPPORTING_SERVICES = [
  {
    id: "panel-refinishing",
    title: "Panel Refinishing",
    subtitle: "Restoration & Repair",
    image: panelRefinishingImage,
    page: panelRefinishingPage,
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    subtitle: "Lens Clarity",
    image: headlightRestorationImage,
    page: headlightRestorationPage,
  },
  {
    id: "paint-chip-repair",
    title: "Paint Chip Repair",
    subtitle: "Precision Touch-Up",
    image: paintChipRepairImage,
    page: paintChipRepairPage,
  },
  {
    id: "classic-restoration",
    title: "Classic Restoration",
    subtitle: "Heritage Vehicle Care",
    image: classicRestorationImage,
    page: classicRestorationPage,
  },
];

// Linked from the footer/nav service menus but not shown as a homepage
// card yet — kept out of FEATURED/SUPPORTING so it doesn't add a card
// to that grid, while still resolving to a real title on its /services/:slug page.
const UNLISTED_SERVICES = [
  { id: "plastic-restoration", title: "Plastic Restoration", subtitle: "Trim & Plastic Renewal", image: null },
];

/** Every service across all groups, for lookups by id/slug (e.g. the per-service page route). */
export const ALL_SERVICES = [...FEATURED_SERVICES, ...SUPPORTING_SERVICES, ...UNLISTED_SERVICES];
