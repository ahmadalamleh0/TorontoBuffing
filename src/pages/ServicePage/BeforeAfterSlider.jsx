import { useCallback, useRef, useState } from "react";

const STEP = 5;

/**
 * Draggable before/after comparison — Pointer Events cover mouse drag
 * and touch swipe with one set of handlers (no separate touch/mouse
 * code paths). The "before" image sits on top of the "after" image,
 * clipped to the handle position, so dragging reveals/hides it as a
 * wipe rather than a crossfade.
 *
 * @param {{
 *   before: { src: string, alt?: string },
 *   after: { src: string, alt?: string },
 * }} props
 */
function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (event) => {
    draggingRef.current = true;
    // Capture is a nice-to-have (keeps the drag tracking if the
    // pointer leaves the container mid-drag) — a small purpose to
    // fail on some inputs, and must never block the position update
    // below, which is the part that actually matters.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // ignored — see above
    }
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const stopDragging = (event) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((p) => Math.max(0, p - STEP));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((p) => Math.min(100, p + STEP));
    }
  };

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <div className="ba-slider__pane">
        <img src={after.src} alt={after.alt ?? ""} loading="lazy" draggable={false} />
        <span className="ba-slider__label ba-slider__label--after">After</span>
      </div>

      <div className="ba-slider__pane ba-slider__pane--before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before.src} alt={before.alt ?? ""} loading="lazy" draggable={false} />
        <span className="ba-slider__label">Before</span>
      </div>

      <div
        className="ba-slider__handle"
        style={{ left: `${position}%` }}
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <span className="ba-slider__grip" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M8 7 3 12l5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
