import { useRef } from "react";
import { UploadIcon } from "../icons";
import { MAX_PHOTOS } from "../quoteData";

/**
 * @param {{
 *   photos: File[],
 *   onPhotosChange: (photos: File[]) => void,
 *   contact: { fullName: string, phone: string, email: string, notes: string },
 *   onContactChange: (field: string, value: string) => void,
 * }} props
 */
function PhotosAndDetailsStep({ photos, onPhotosChange, contact, onContactChange }) {
  const inputRef = useRef(null);

  const addFiles = (fileList) => {
    const room = Math.max(0, MAX_PHOTOS - photos.length);
    onPhotosChange([...photos, ...Array.from(fileList).slice(0, room)]);
  };

  const removePhoto = (index) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
  };

  const openPicker = () => inputRef.current?.click();
  const atMax = photos.length >= MAX_PHOTOS;

  return (
    <div className="quote-step quote-step--compact">
      <h3 className="quote-step__heading">Contact &amp; Details</h3>
      <p className="quote-step__helper">Where should we send your custom quote?</p>

      {/* 1. Full Name, Phone, Email */}
      <div className="quote-field-grid">
        <label className="quote-field">
          <span className="quote-field__label">Full Name</span>
          <input
            className="quote-field__input"
            type="text"
            value={contact.fullName}
            onChange={(e) => onContactChange("fullName", e.target.value)}
            required
          />
        </label>

        <label className="quote-field">
          <span className="quote-field__label">Phone Number</span>
          <input
            className="quote-field__input"
            type="tel"
            value={contact.phone}
            onChange={(e) => onContactChange("phone", e.target.value)}
            required
          />
        </label>
      </div>

      <div className="quote-field">
        <label className="quote-field">
          <span className="quote-field__label">Email</span>
          <input
            className="quote-field__input"
            type="email"
            value={contact.email}
            onChange={(e) => onContactChange("email", e.target.value)}
            required
          />
        </label>
      </div>

      {/* 2. Optional Notes */}
      <div className="quote-field">
        <label className="quote-field">
          <span className="quote-field__label">
            Notes / Vehicle Details <em>(optional)</em>
          </span>
          <textarea
            className="quote-field__input quote-field__textarea"
            rows={2}
            placeholder="Anything specific we should know about your vehicle's condition?"
            value={contact.notes}
            onChange={(e) => onContactChange("notes", e.target.value)}
          />
        </label>
      </div>

      {/* 3. Optional Photo Upload at Bottom */}
      <div className="quote-upload-block">
        <div className="quote-upload-block__header">
          <span className="quote-field__label">Vehicle Photos <em>(optional)</em></span>
          <span className="quote-upload-block__subtext">Photos are optional, but helpful for a more accurate quote.</span>
        </div>

        <div
          className={`quote-upload quote-upload--compact${atMax ? " is-disabled" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={atMax ? undefined : handleDrop}
          onClick={atMax ? undefined : openPicker}
          role="button"
          tabIndex={atMax ? -1 : 0}
          onKeyDown={(e) => {
            if (!atMax && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              openPicker();
            }
          }}
        >
          <span className="quote-upload__icon" aria-hidden="true">
            <UploadIcon />
          </span>
          <span className="quote-upload__title">
            {atMax ? `${MAX_PHOTOS} photos attached` : "Attach vehicle photos"}
          </span>
          <span className="quote-upload__sub">
            ({photos.length}/{MAX_PHOTOS}) &middot; JPG or PNG
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="visually-hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </div>

        {photos.length > 0 && (
          <ul className="quote-upload__list">
            {photos.map((file, i) => (
              <li key={`${file.name}-${i}`} className="quote-upload__item">
                <span className="quote-upload__item-name">{file.name}</span>
                <button
                  type="button"
                  className="quote-upload__item-remove"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PhotosAndDetailsStep;
