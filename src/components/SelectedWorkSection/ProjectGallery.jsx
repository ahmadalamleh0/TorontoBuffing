import { useEffect, useState } from "react";
import "./ProjectGallery.css";

/**
 * Full-screen lightbox for viewing every photo in a project — opened
 * from a SelectedWorkSection card. `project.images[0]` is already
 * shown as the card cover, so the gallery starts there too.
 *
 * @param {{ project: import('./projectsData').PROJECTS[number], initialIndex?: number, onClose: () => void }} props
 */
function ProjectGallery({ project, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const { images, vehicle } = project;

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function handleKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="project-gallery" role="dialog" aria-modal="true" aria-label={`${vehicle} photos`}>
      <button type="button" className="project-gallery__backdrop" onClick={onClose} aria-label="Close gallery" />

      <div className="project-gallery__body">
        <button type="button" className="project-gallery__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="project-gallery__stage">
          {images.length > 1 && (
            <div className="project-gallery__segments" aria-hidden="true">
              {images.map((_, i) => (
                <span key={i} className={`project-gallery__segment${i === index ? " is-active" : ""}`} />
              ))}
            </div>
          )}

          {images.length > 1 && (
            <button type="button" className="project-gallery__nav project-gallery__nav--prev" onClick={goPrev} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="15 6 9 12 15 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <img src={images[index]} alt={`${vehicle} — photo ${index + 1} of ${images.length}`} className="project-gallery__image" />

          {images.length > 1 && (
            <button type="button" className="project-gallery__nav project-gallery__nav--next" onClick={goNext} aria-label="Next photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="9 6 15 12 9 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="project-gallery__footer">
          <span className="project-gallery__title">{vehicle}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectGallery;
