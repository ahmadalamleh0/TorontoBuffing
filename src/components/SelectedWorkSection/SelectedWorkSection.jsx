import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./projectsData";
import WorkCard from "./WorkCard";
import ProjectGallery from "./ProjectGallery";
import "./SelectedWorkSection.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Pinning the image banner for exactly its own natural height's
// worth of scroll is the entire effect — no separate transform on the
// panel itself, and no artificial height added to the image.
//
// pinSpacing MUST be false here. GSAP's default pinSpacing reserves
// (natural height + hold distance) of document space, not just the
// hold distance — measured and confirmed. That pushes the panel's
// natural position down by an extra `natural height` worth of gap
// before it ever reaches the image's bottom edge, which is exactly
// the empty-space bug this was rewritten to fix. With pinSpacing
// off, nothing reserves that gap: the panel's natural top already
// sits flush against the image's bottom edge document-wise, so at
// the very first pixel of scroll into the pin it's already touching
// the image, and by the time the pin's `end` is reached (one image-
// height of scroll later) it has risen exactly `bannerHeight` and
// fully covers it. Once the pin releases, normal document flow takes
// over for the rest of the page.
function usePinBanner() {
  useEffect(() => {
    const banner = document.querySelector(".image-banner");
    if (!banner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: banner,
        start: "top top",
        end: () => "+=" + banner.offsetHeight,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    // `end` is computed from the banner's rendered height at creation
    // time — if its <img> hasn't finished loading yet, that height
    // reads as 0 and the pin gets a zero-length (broken) duration.
    // Refresh once the image's real height is in.
    const img = banner.querySelector("img");
    const handleLoad = () => ScrollTrigger.refresh();
    if (img && !img.complete) {
      img.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      if (img) img.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);
}

// Native overflow-x + scroll-snap already gives touch swipe and
// trackpad/wheel scrolling for free. This only adds click-and-drag
// for plain mouse users, and — critically — suppresses the click
// that would otherwise fire on the card right under the pointer when
// a drag ends, so dragging never accidentally opens the gallery.
function useCarouselDrag(trackRef) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let dragDistance = 0;

    // Plain mouse events (not Pointer Events / setPointerCapture) —
    // capturing the pointer on the track interfered with the click
    // event that should otherwise land on the card underneath.
    function onMouseDown(event) {
      dragging = true;
      dragDistance = 0;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
    }

    function onMouseMove(event) {
      if (!dragging) return;
      const delta = event.clientX - startX;
      dragDistance = Math.max(dragDistance, Math.abs(delta));
      track.scrollLeft = startScroll - delta;
    }

    function onMouseUp() {
      dragging = false;
      track.classList.remove("is-dragging");
    }

    function onClickCapture(event) {
      if (dragDistance > 6) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("click", onClickCapture, { capture: true });
    };
  }, [trackRef]);
}

function SelectedWorkSection() {
  usePinBanner();
  const trackRef = useRef(null);
  useCarouselDrag(trackRef);
  const [openProjectId, setOpenProjectId] = useState(null);
  const project = PROJECTS.find((p) => p.id === openProjectId) ?? null;

  return (
    <section id="work" className="selected-work">
      <div className="container selected-work__inner">
        <h2 className="selected-work__heading">Recent Projects</h2>

        <div className="selected-work__grid" ref={trackRef}>
          {PROJECTS.map((p) => (
            <WorkCard key={p.id} project={p} onOpen={() => setOpenProjectId(p.id)} />
          ))}
        </div>
      </div>

      {project && <ProjectGallery project={project} onClose={() => setOpenProjectId(null)} />}
    </section>
  );
}

export default SelectedWorkSection;
