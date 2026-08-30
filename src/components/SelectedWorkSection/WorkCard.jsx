/**
 * One project's card in the Selected Work carousel — cover image plus
 * an in-image vehicle name. A plain click/tap opens the full gallery
 * for that project (see ProjectGallery, which owns the multi-photo
 * segmented indicator); the carousel itself only ever shows the
 * cover, so there's no second swipe interaction competing with the
 * carousel's own drag/scroll.
 *
 * @param {{ project: import('./projectsData').PROJECTS[number], onOpen: () => void }} props
 */
function WorkCard({ project, onOpen }) {
  return (
    <button type="button" className="selected-work__card" onClick={onOpen}>
      <div className="selected-work__media">
        <img src={project.images[0]} alt="" className="selected-work__image" loading="lazy" draggable={false} />
        <span className="selected-work__vehicle-tag">{project.vehicle}</span>
      </div>
    </button>
  );
}

export default WorkCard;
