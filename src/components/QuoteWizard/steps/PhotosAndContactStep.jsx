import { useRef } from "react";
import { UploadIcon } from "../icons";

/**
 * @param {{
 *   photos: File[],
 *   onPhotosChange: (photos: File[]) => void,
 *   contact: { fullName: string, phone: string, email: string },
 *   onContactChange: (field: string, value: string) => void,
 * }} props
 */
function PhotosAndContactStep({ photos, onPhotosChange, contact, onContactChange }) {
  const inputRef = useRef(null);

  const addFiles = (fileList) => {
    onPhotosChange([...photos, ...Array.from(fileList)]);
  };

  const removePhoto = (index) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="quote-step">
      <h3 className="quote-step__heading">Add photos and your details</h3>
      <p className="quote-step__helper">
        Photos help us quote faster and more accurately. Optional, but appreciated.
      </p>

      <div
        className="quote-upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={openPicker}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
      >
        <span className="quote-upload__icon" aria-hidden="true">
          <UploadIcon />
        </span>
        <span className="quote-upload__title">Drop photos here or click to browse</span>
        <span className="quote-upload__hint">Optional: JPG or PNG, multiple photos supported</span>
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
    </div>
  );
}

export default PhotosAndContactStep;
