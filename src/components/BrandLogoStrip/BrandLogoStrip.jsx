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
const LOGOS = [
  { name: "XPEL", src: xpelLogo },
  { name: "Suntek", src: suntekLogo },
  { name: "STEK", src: stekLogo, large: true },
  { name: "Hexis", src: hexisLogo, large: true },
  { name: "Ceramic Pro", src: ceramicProLogo, large: true },
  { name: "Gtechniq", src: gtechniqLogo },
];

// Repeated enough times that one group comfortably exceeds any
// realistic viewport width (including landscape phones and desktop),
// then rendered exactly twice back-to-back — the second, identical
// group animated into view as the first one exits. Both groups are
// the same array rendered the same way, so their widths, gaps and
// ordering are guaranteed identical; translateX(-50%) then always
// moves the track by exactly one group's width, never the viewport's,
// so the loop stays seamless at any screen size or orientation with
// no JS measurement involved.
const REPEAT = 4;
const GROUP = Array.from({ length: REPEAT }, () => LOGOS).flat();

function LogoGroup() {
  return (
    <div className="brand-strip__set">
      {GROUP.map((brand, i) => (
        <span className={`brand-strip__logo${brand.large ? " brand-strip__logo--large" : ""}`} key={i}>
          <img src={brand.src} alt={brand.name} loading="eager" />
        </span>
      ))}
    </div>
  );
}

function BrandLogoStrip() {
  return (
    <div className="brand-strip">
      <span className="visually-hidden">
        Brands Toronto Buffing works with: XPEL, Suntek, STEK, Hexis, Ceramic Pro, Gtechniq.
      </span>
      <div className="brand-strip__track" aria-hidden="true">
        <LogoGroup key="a" />
        <LogoGroup key="b" />
      </div>
    </div>
  );
}

export default BrandLogoStrip;
