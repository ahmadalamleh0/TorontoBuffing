/**
 * Content for the quote configurator, kept separate from the
 * components so copy/options can be edited without touching UI code.
 *
 * Flow: 1 Vehicle -> 2 Service -> 3 Options (dynamic per service,
 * auto-skipped if nothing applies) -> 4 Photos + Details -> 5 Review.
 */
import coupeSedanIcon from "../../assets/images/quote/coupe-sedan.webp";
import suvTruckIcon from "../../assets/images/quote/suv-truck.webp";
import xlSuvIcon from "../../assets/images/quote/xl-suv.webp";
import exoticsIcon from "../../assets/images/quote/exotics.webp";
import ppfIcon from "../../assets/images/quote/services/ppf-icon.webp";
import paintCorrectionIcon from "../../assets/images/quote/services/paint-correction-icon.webp";
import ceramicCoatingIcon from "../../assets/images/quote/services/ceramic-coating-icon.webp";
import sprayGunIcon from "../../assets/images/quote/services/spray-gun-icon.webp";
import headlightIcon from "../../assets/images/quote/services/headlight-icon.webp";
import scratchRepairIcon from "../../assets/images/quote/services/scratch-repair-icon.webp";
import rockchipsIcon from "../../assets/images/quote/services/rockchips-icon.webp";
import autoBodyIcon from "../../assets/images/quote/services/auto-body-icon.webp";

export const TOTAL_STEPS = 5;

export const STEP_LABELS = ["Vehicle", "Service", "Options", "Details", "Review"];

export const VEHICLE_TYPES = [
  { id: "coupe-sedan", label: "Coupe / Sedan", image: coupeSedanIcon },
  { id: "suv-truck", label: "SUV / Truck", image: suvTruckIcon },
  { id: "xl-suv", label: "XL SUV", image: xlSuvIcon },
  { id: "exotics", label: "Exotics", image: exoticsIcon },
];

const CURRENT_YEAR = new Date().getFullYear();
export const VEHICLE_YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR + 1 - i);

export const VEHICLE_MAKES = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Other",
];

// Order here is the order dynamic Step 3 sections render in when
// multiple services are selected. Clean PNG/WebP icons are used.
export const SERVICES = [
  { id: "ppf", label: "Paint Protection Film (PPF)", image: ppfIcon },
  { id: "ceramic-coating", label: "Ceramic Coating", image: ceramicCoatingIcon },
  { id: "paint-correction", label: "Paint Correction", image: paintCorrectionIcon },
  { id: "auto-body", label: "Auto Body Work", image: autoBodyIcon },
  { id: "panel-repainting", label: "Panel Repainting", image: sprayGunIcon },
  { id: "headlight-restoration", label: "Headlight Restoration", image: headlightIcon },
  { id: "paint-chip-repair", label: "Paint Chip Repair", image: rockchipsIcon },
  { id: "scratch-repair", label: "Scratch Repair", image: scratchRepairIcon },
];

// Services with no Step 3 section at all — minimum relevant info only,
// straight through to photos/details.
export const SIMPLE_SERVICES = new Set([
  "headlight-restoration",
  "paint-chip-repair",
  "scratch-repair",
]);

export const PPF_COVERAGE_OPTIONS = [
  { id: "full-front", label: "Full Front" },
  { id: "track-package", label: "Track Package" },
  { id: "full-body", label: "Full Body" },
  { id: "rear", label: "Rear Coverage" },
];

export const CERAMIC_DURATION_OPTIONS = [
  { id: "2-year", label: "2-Year Coating" },
  { id: "3-year", label: "3-Year Coating" },
  { id: "5-year", label: "5-Year Protection" },
  { id: "9-year", label: "9-Year Protection" },
];

export const CERAMIC_CONDITION_OPTIONS = [
  { id: "new-excellent", label: "New / Excellent" },
  { id: "light-swirls", label: "Light Swirls" },
  { id: "moderate-defects", label: "Moderate Defects" },
  { id: "heavy-defects", label: "Heavy Defects" },
];

export const PAINT_CORRECTION_STAGES = [
  { id: "stage-1", label: "Stage 1 Paint Enhancement", description: "Light defects / newer paint" },
  { id: "stage-2", label: "Stage 2 Paint Correction", description: "Moderate swirls & scratches" },
  { id: "stage-3", label: "Stage 3 Paint Correction", description: "Heavy correction" },
];

export const BODY_WORK_AREAS = [
  { id: "front-bumper", label: "Front Bumper" },
  { id: "rear-bumper", label: "Rear Bumper" },
  { id: "hood", label: "Hood" },
  { id: "fender", label: "Fender" },
  { id: "door", label: "Door" },
  { id: "quarter-panel", label: "Quarter Panel" },
  { id: "other", label: "Other" },
];

export const MIN_PHOTOS = 2;
export const MAX_PHOTOS = 4;

export const initialQuoteFormData = {
  vehicleType: null,
  vehicle: { year: "", make: "", model: "" },
  services: [],
  options: {
    ppf: { coverage: "full-front" },
    ceramicCoating: { duration: null, condition: null },
    paintCorrection: { stage: null },
    bodyWork: { areas: [] },
  },
  photos: [],
  contact: { fullName: "", phone: "", email: "", notes: "" },
};
