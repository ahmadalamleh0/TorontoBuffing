/**
 * Real completed Toronto Buffing projects. Each vehicle is one card;
 * `images[0]` is the cover shown on the card, the rest are swipeable/
 * open in the gallery.
 */
import gtr1 from "../../assets/images/projects/gtr/1.webp";
import gtr2 from "../../assets/images/projects/gtr/2.webp";
import gtr3 from "../../assets/images/projects/gtr/3.webp";
import gtr4 from "../../assets/images/projects/gtr/4.webp";

import corvette1 from "../../assets/images/projects/corvette/1.webp";
import corvette2 from "../../assets/images/projects/corvette/2.webp";
import corvette3 from "../../assets/images/projects/corvette/3.webp";
import corvette4 from "../../assets/images/projects/corvette/4.webp";

import porsche1 from "../../assets/images/projects/porsche/1.webp";
import porsche2 from "../../assets/images/projects/porsche/2.webp";
import porsche3 from "../../assets/images/projects/porsche/3.webp";
import porsche4 from "../../assets/images/projects/porsche/4.webp";

import porscheSilver1 from "../../assets/images/projects/porsche-silver/1.webp";
import porscheSilver2 from "../../assets/images/projects/porsche-silver/2.webp";
import porscheSilver3 from "../../assets/images/projects/porsche-silver/3.webp";

import ferrari2 from "../../assets/images/projects/ferrari/2.webp";
import ferrari3 from "../../assets/images/projects/ferrari/3.webp";
import ferrari4 from "../../assets/images/projects/ferrari/4.jpeg";

import supra1 from "../../assets/images/projects/supra/1.webp";
import supra2 from "../../assets/images/projects/supra/2.webp";
import supra3 from "../../assets/images/projects/supra/3.jpg";

import bmw1 from "../../assets/images/projects/bmw/1.webp";
import bmw2 from "../../assets/images/projects/bmw/2.webp";
import bmw3 from "../../assets/images/projects/bmw/3.webp";
import bmw4 from "../../assets/images/projects/bmw/4.webp";

import corvetteBlack1 from "../../assets/images/projects/corvette-black/1.webp";
import corvetteBlack2 from "../../assets/images/projects/corvette-black/2.jpeg";
import corvetteBlack3 from "../../assets/images/projects/corvette-black/3.webp";

import acura1 from "../../assets/images/projects/acura/1.webp";
import acura2 from "../../assets/images/projects/acura/2.webp";
import acura3 from "../../assets/images/projects/acura/3.webp";

// Order matters: the carousel lays these out with grid-auto-flow:
// column across 3 rows, so every 3rd entry starts a new row (indices
// 0,3,6 = row 1; 1,4,7 = row 2; 2,5,8 = row 3).
export const PROJECTS = [
  { id: "gtr", vehicle: "Nissan Skyline R34 GT-R V-Spec", images: [gtr1, gtr2, gtr3, gtr4] },
  { id: "corvette", vehicle: "Chevrolet Corvette C7", images: [corvette1, corvette2, corvette3, corvette4] },
  {
    id: "porsche-silver",
    vehicle: "Porsche 911 GT3 RS",
    images: [porscheSilver1, porscheSilver2, porscheSilver3],
  },
  { id: "porsche", vehicle: "Porsche 911 GT3 RS", images: [porsche1, porsche2, porsche3, porsche4] },
  { id: "ferrari", vehicle: "Ferrari 360", images: [ferrari4, ferrari2, ferrari3] },
  { id: "supra", vehicle: "Toyota Supra", images: [supra1, supra2, supra3] },
  { id: "bmw", vehicle: "BMW E30", images: [bmw1, bmw2, bmw3, bmw4] },
  { id: "corvette-black", vehicle: "Chevrolet Corvette Z06", images: [corvetteBlack1, corvetteBlack2, corvetteBlack3] },
  { id: "acura", vehicle: "Acura Integra", images: [acura1, acura2, acura3] },
];
