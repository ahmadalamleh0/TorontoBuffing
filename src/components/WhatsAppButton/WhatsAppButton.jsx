import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "../../config/whatsapp";
import "./WhatsAppButton.css";

// Steps aside whenever the quote wizard's own Back/Continue bar is
// anywhere on screen, so the two buttons never overlap. (The success
// screen's single "Start a New Request" button isn't covered by this
// — it only exists after submission, so there's no reliable DOM node
// to observe until then — but it sits in the same safe spot lower on
// the card, away from the corner.)
function useYieldsNearQuoteWizard() {
  const [yielded, setYielded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".quote-wizard__nav");
    if (!nav || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setYielded(entry.isIntersecting));
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return yielded;
}

function WhatsAppButton() {
  const yielded = useYieldsNearQuoteWizard();

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button${yielded ? " whatsapp-button--yield" : ""}`}
      aria-label="Chat with Toronto Buffing on WhatsApp"
      tabIndex={yielded ? -1 : 0}
    >
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path
          fill="#ffffff"
          d="M16.02 4C9.4 4 4 9.37 4 15.98c0 2.13.56 4.14 1.63 5.94L4 28l6.28-1.6a12 12 0 0 0 5.74 1.46h.01c6.63 0 12.02-5.37 12.02-11.98C28.05 9.37 22.66 4 16.02 4Zm0 21.9a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.95 1-3.63-.24-.37a9.9 9.9 0 0 1-1.53-5.28c0-5.47 4.46-9.92 9.94-9.92 5.47 0 9.92 4.45 9.92 9.92 0 5.48-4.45 9.92-9.95 9.92Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
        />
      </svg>
      <span className="whatsapp-button__label">WhatsApp</span>
    </a>
  );
}

export default WhatsAppButton;
