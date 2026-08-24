/**
 * Content for the quote wizard, kept separate from the components so
 * the service list, tags, and options can be edited without touching
 * any UI code.
 */

export const SERVICES = [
  { id: "paint-protection", label: "Paint Protection" },
  { id: "auto-body", label: "Auto Body Work" },
  { id: "headlight-restoration", label: "Headlight Restoration" },
  { id: "paint-chip-repair", label: "Paint Chip Repair" },
  { id: "scratch-repair", label: "Scratch Repair" },
  { id: "ceramic-coating", label: "Ceramic Coating" },
  { id: "paint-correction", label: "Paint Correction" },
  { id: "watersanding", label: "Watersanding" },
  { id: "panel-repainting", label: "Panel Repainting" },
];

export const ISSUE_TAGS = [
  { id: "scratches", label: "Scratches" },
  { id: "swirl-marks", label: "Swirl Marks" },
  { id: "chips", label: "Chips" },
  { id: "faded-paint", label: "Faded Paint" },
  { id: "collision-damage", label: "Collision Damage" },
  { id: "headlight-haze", label: "Headlight Haze" },
  { id: "peeling-wear", label: "Peeling / Wear" },
  { id: "inspection-request", label: "Inspection Request" },
  { id: "other", label: "Other" },
];

export const TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "this-week", label: "This Week" },
  { id: "two-weeks", label: "Within 2 Weeks" },
  { id: "exploring", label: "Just Exploring" },
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

export const TOTAL_STEPS = 5;

export const initialQuoteFormData = {
  services: [],
  vehicle: { year: "", make: "", model: "" },
  project: {
    description: "",
    issues: [],
    timeline: "",
  },
  photos: [],
  contact: {
    fullName: "",
    phone: "",
    email: "",
  },
};
