import { BUSINESS_LOCATION } from "../../data/locationData";
import "./LocationSection.css";

// Google's no-API-key embed format — keeps native Google Maps
// controls (zoom, pan, map-type toggle, "View larger map") without
// any client-side key or billing setup. t=h locks the default view
// to satellite + labels (hybrid); the native toggle can still switch
// it, since Google doesn't expose a way to disable that control.
function LocationSection() {
  const { lat, lng, zoom, name } = BUSINESS_LOCATION;
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&t=h&output=embed`;

  return (
    <section id="location" className="location-section" aria-label="Toronto Buffing location">
      <iframe
        className="location-map__frame"
        src={src}
        title={`Map showing ${name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}

export default LocationSection;
