import { useRef } from "react";
import { UploadIcon } from "../icons";
import { MIN_PHOTOS, MAX_PHOTOS } from "../quoteData";

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
    <div className="quote-step">
      <h3 className="quote-step__heading">Photos &amp; Details</h3>
      <p className="quote-step__helper">
        Add {MIN_PHOTOS}–{MAX_PHOTOS} photos of the vehicle so we can quote accurately, then leave your details.
      </p>

      <div
        className={`quote-upload${atMax ? " is-disabled" : ""}`}
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
          {atMax ? `${MAX_PHOTOS} photos added` : "Drop photos here or click to browse"}
        </span>
        <span className="quote-upload__hint">
          {photos.length} of {MAX_PHOTOS} added &middot; JPG or PNG
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

      <label className="quote-field">
        <span className="quote-field__label">
          Notes <em>(optional)</em>
        </span>
        <textarea
          className="quote-field__input quote-field__textarea"
          rows={3}
          placeholder="Anything else we should know?"
          value={contact.notes}
          onChange={(e) => onContactChange("notes", e.target.value)}
        />
      </label>
    </div>
  );
}

export default PhotosAndDetailsStep;
