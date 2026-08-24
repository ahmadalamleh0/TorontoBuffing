import { ISSUE_TAGS, TIMELINE_OPTIONS } from "../quoteData";

/**
 * @param {{
 *   project: { description: string, issues: string[], timeline: string },
 *   onChange: (field: string, value: unknown) => void,
 * }} props
 */
function ProjectDetailsStep({ project, onChange }) {
  const toggleIssue = (id) => {
    const next = project.issues.includes(id)
      ? project.issues.filter((issue) => issue !== id)
      : [...project.issues, id];
    onChange("issues", next);
  };

  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">What should we know about the job?</h3>
      <p className="quote-step__helper">
        Add a few details so we can better understand the condition and scope.
      </p>

      <label className="quote-field">
        <span className="quote-field__label">
          Description <em>(optional)</em>
        </span>
        <textarea
          className="quote-field__input quote-field__textarea"
          rows={4}
          placeholder="Tell us a bit about the condition of the vehicle or what you're looking to have done..."
          value={project.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </label>

      <div className="quote-field">
        <span className="quote-field__label">
          What's going on? <em>(optional)</em>
        </span>
        <div className="quote-tag-group">
          {ISSUE_TAGS.map((tag) => (
            <button
              type="button"
              key={tag.id}
              className={`quote-tag${project.issues.includes(tag.id) ? " is-selected" : ""}`}
              onClick={() => toggleIssue(tag.id)}
              aria-pressed={project.issues.includes(tag.id)}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      <div className="quote-field">
        <span className="quote-field__label">
          Timeline <em>(optional)</em>
        </span>
        <div className="quote-tag-group">
          {TIMELINE_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`quote-tag${project.timeline === option.id ? " is-selected" : ""}`}
              onClick={() => onChange("timeline", option.id)}
              aria-pressed={project.timeline === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsStep;
