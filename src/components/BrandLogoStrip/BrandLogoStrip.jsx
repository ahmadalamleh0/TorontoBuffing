import xpelLogo from "../../assets/images/brands/xpel.png";
import suntekLogo from "../../assets/images/brands/suntek.svg";
import stekLogo from "../../assets/images/brands/stek.svg";
import hexisLogo from "../../assets/images/brands/hexis.svg";
import ceramicProLogo from "../../assets/images/brands/ceramic-pro.png";
import gtechniqLogo from "../../assets/images/brands/gtechniq.png";
import "./BrandLogoStrip.css";

// Industry product brands Toronto Buffing works with, using each
// brand's real logo artwork — no backing/chip behind any of them.
// Ceramic Pro's file renders dark linework, which will read
// low-contrast on this dark strip until a better-suited file replaces
// it; swap the import above when that artwork is ready.
//
// width/height here are each file's real intrinsic ratio (STEK has no
// absolute size of its own, so its viewBox ratio is used instead) —
// passed straight through as the <img>'s own width/height attributes.
// That's what lets the browser reserve each logo's correct final
// width immediately from layout, before the image byte data has
// actually arrived over the network, instead of guessing 0 (or a
// generic fallback box) and reflowing once it loads. Without that,
// .marqueeTrack's width: max-content — and therefore the running
// translate3d(-50%,...) animation's own reference distance — silently
// grows while images are still arriving, which is what caused the
// live "goes blank for several seconds" bug: the animation's -50%
// target kept being recalculated against a track that hadn't finished
// growing yet.
const LOGOS = [
  { name: "XPEL", src: xpelLogo, width: 500, height: 128 },
  { name: "Suntek", src: suntekLogo, width: 351, height: 74.561 },
  { name: "STEK", src: stekLogo, width: 99.66, height: 100, large: true },
  { name: "Hexis", src: hexisLogo, width: 694, height: 412, large: true },
  { name: "Ceramic Pro", src: ceramicProLogo, width: 575, height: 216, large: true },
  { name: "Gtechniq", src: gtechniqLogo, width: 600, height: 126 },
];

// One group's own content is repeated internally (not just the two
// top-level groups) purely so a single group is comfortably wider
// than any realistic viewport before the two groups are duplicated —
// unrelated to, and not a substitute for, the two-group loop
// structure itself.
const REPEAT = 4;
const GROUP_ITEMS = Array.from({ length: REPEAT }, () => LOGOS).flat();

function MarqueeGroup({ hidden }) {
  return (
    <div className="marqueeGroup" aria-hidden={hidden ? "true" : undefined}>
      {GROUP_ITEMS.map((brand, i) => (
        <span className={`marqueeLogo${brand.large ? " marqueeLogo--large" : ""}`} key={i}>
          <img src={brand.src} width={brand.width} height={brand.height} alt={brand.name} loading="eager" decoding="sync" />
        </span>
      ))}
    </div>
  );
}

function BrandLogoStrip() {
  return (
    <div className="marquee">
      <span className="visually-hidden">
        Brands Toronto Buffing works with: XPEL, Suntek, STEK, Hexis, Ceramic Pro, Gtechniq.
      </span>
      <div className="marqueeTrack">
        {/* complete logo set */}
        <MarqueeGroup />
        {/* exact duplicate of complete logo set */}
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}

export default BrandLogoStrip;
