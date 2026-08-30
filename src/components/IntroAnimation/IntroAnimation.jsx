import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./IntroAnimation.css";

const LOGO_SRC = "/images/logo/tb-logo-intro.png";
const SESSION_KEY = "tb-intro-seen";

function IntroAnimation() {
  const screenRef = useRef(null);
  const barFillRef = useRef(null);

  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    return true;
  });

  useLayoutEffect(() => {
    if (!active) return;

    document.body.classList.add("intro-lock");
    window.sessionStorage.setItem(SESSION_KEY, "1");

    let cancelled = false;
    let tl;

    function runIntro() {
      if (cancelled) return;

      tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("intro-lock");
          setActive(false);
        },
      });

      tl.fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.35, ease: "power2.out" }
      )
        .to({}, { duration: 0.35 }) // brief hold on the completed bar
        .to(screenRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" });
    }

    // Wait for the logo to actually be decoded before starting, so the
    // very first frame never shows a blank/broken image — on a fast
    // connection (it's already <link rel="preload">'d) this resolves
    // near-instantly.
    const preload = new Image();
    preload.src = LOGO_SRC;
    if (preload.complete) {
      runIntro();
    } else {
      preload.onload = runIntro;
      preload.onerror = runIntro;
    }

    return () => {
      cancelled = true;
      if (tl) tl.kill();
      document.body.classList.remove("intro-lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div className="intro" ref={screenRef} aria-hidden="true">
      <img className="intro__logo" src={LOGO_SRC} alt="" />
      <div className="intro__bar">
        <div className="intro__bar-fill" ref={barFillRef} />
      </div>
    </div>
  );
}

export default IntroAnimation;
