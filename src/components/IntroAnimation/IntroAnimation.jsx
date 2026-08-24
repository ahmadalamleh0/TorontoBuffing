import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./IntroAnimation.css";

const LOGO_SRC = "/images/logo/tb-logo.png";

// Conceptual x-bands within the logo artwork (% of full image width),
// measured from the source file itself and chosen to union to exactly
// 0-100% with no gaps/overlap — so however the seams line up, the
// three layers together always reconstruct the exact original image.
const WORD_BAND = { left: 0, right: 45 }; // TORONTO / BUFFING
const TOWER_BAND = { left: 45, right: 55 }; // CN Tower — center seam sits at 50%
const B_BAND = { left: 55, right: 100 }; // main B

const SESSION_KEY = "tb-intro-seen";

function insetString({ top, right, bottom, left }) {
  return `inset(${top}% ${right}% ${bottom}% ${left}%)`;
}

function IntroAnimation() {
  const rootRef = useRef(null);
  const logoWrapRef = useRef(null);
  const bRef = useRef(null);
  const wordRef = useRef(null);
  const towerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

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

    function buildTimeline() {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const speed = isMobile ? 0.82 : 1; // mobile runs slightly faster overall

      const bEl = bRef.current;
      const wordEl = wordRef.current;
      const towerEl = towerRef.current;
      const leftPanel = leftPanelRef.current;
      const rightPanel = rightPanelRef.current;
      const logoWrap = logoWrapRef.current;

      // Start states: each layer clipped down to nothing, at the edge
      // it will grow from.
      const bStart = { top: 0, right: 0, bottom: 0, left: 100 };
      const bEnd = { top: 0, right: 0, bottom: 0, left: B_BAND.left };

      const wordStart = { top: 0, right: 100, bottom: 0, left: 0 };
      const wordEnd = { top: 0, right: 100 - WORD_BAND.right, bottom: 0, left: 0 };

      const towerStart = { top: 100, right: 100 - TOWER_BAND.right, bottom: 0, left: TOWER_BAND.left };
      const towerEnd = { top: 0, right: 100 - TOWER_BAND.right, bottom: 0, left: TOWER_BAND.left };

      bEl.style.clipPath = insetString(bStart);
      wordEl.style.clipPath = insetString(wordStart);
      towerEl.style.clipPath = insetString(towerStart);

      const toClipAnim = (el, from, target) => ({ el, state: { ...from }, target });

      const bAnim = toClipAnim(bEl, bStart, bEnd);
      const wordAnim = toClipAnim(wordEl, wordStart, wordEnd);
      const towerAnim = toClipAnim(towerEl, towerStart, towerEnd);

      // Target: the header's logo slot, so the intro logo can dock into
      // its exact position/size before handing off via opacity.
      const target = document.getElementById("site-logo-target");
      const targetRect = target ? target.getBoundingClientRect() : null;
      const startRect = logoWrap.getBoundingClientRect();

      let dockX = 0;
      let dockY = 0;
      let dockScale = 0.22;

      if (targetRect) {
        const startCenterX = startRect.left + startRect.width / 2;
        const startCenterY = startRect.top + startRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        dockX = targetCenterX - startCenterX;
        dockY = targetCenterY - startCenterY;
        dockScale = Math.min(0.6, Math.max(0.16, targetRect.height / startRect.height));
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.classList.remove("intro-lock");
          setActive(false);
        },
      });

      timeline
        .to(bAnim.state, {
          ...bAnim.target,
          duration: 1.0 * speed,
          onUpdate: () => {
            bAnim.el.style.clipPath = insetString(bAnim.state);
          },
        })
        .to(
          wordAnim.state,
          {
            ...wordAnim.target,
            duration: 0.85 * speed,
            onUpdate: () => {
              wordAnim.el.style.clipPath = insetString(wordAnim.state);
            },
          },
          "-=0.4"
        )
        .to(
          towerAnim.state,
          {
            ...towerAnim.target,
            duration: 0.85 * speed,
            ease: "power2.out",
            onUpdate: () => {
              towerAnim.el.style.clipPath = insetString(towerAnim.state);
            },
          },
          "-=0.3"
        )
        .to({}, { duration: 0.4 * speed }) // hold on the completed mark
        .to([leftPanel], { xPercent: -100, duration: 0.8 * speed, ease: "power2.inOut" }, "doors")
        .to([rightPanel], { xPercent: 100, duration: 0.8 * speed, ease: "power2.inOut" }, "doors")
        .to(
          logoWrap,
          {
            x: dockX,
            y: dockY,
            scale: dockScale,
            duration: 0.8 * speed,
            ease: "power2.inOut",
          },
          "doors"
        )
        .to(logoWrap, { opacity: 0, duration: 0.3 * speed, ease: "power1.out" }, "doors+=" + 0.5 * speed);

      return timeline;
    }

    function runIntro() {
      if (cancelled) return;
      tl = buildTimeline();
    }

    // The reveal is driven by clip-path, so nothing shows until the
    // (identical, thrice-referenced) source image has actually
    // loaded — wait for it first so the timing is never at the mercy
    // of network latency.
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
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__logo-wrap" ref={logoWrapRef}>
        <img className="intro__layer" ref={bRef} src={LOGO_SRC} alt="" />
        <img className="intro__layer" ref={wordRef} src={LOGO_SRC} alt="" />
        <img className="intro__layer" ref={towerRef} src={LOGO_SRC} alt="" />
      </div>
      <div className="intro__panel intro__panel--left" ref={leftPanelRef} />
      <div className="intro__panel intro__panel--right" ref={rightPanelRef} />
    </div>
  );
}

export default IntroAnimation;
