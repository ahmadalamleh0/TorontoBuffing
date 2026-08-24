/**
 * Single source of truth for the WhatsApp contact link.
 *
 * WHATSAPP_NUMBER reuses the real phone number already on file
 * elsewhere on the site (Footer, QuoteWizardSection: 647-985-8630),
 * in the digits-only international format wa.me requires — no "+",
 * spaces, or punctuation. If Toronto Buffing's WhatsApp Business
 * number is different from that general contact line, replace the
 * value below; nothing else needs to change.
 */
export const WHATSAPP_NUMBER = "16479858630";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Toronto Buffing, I'm interested in getting a quote for my vehicle.";

/**
 * Builds a wa.me deep link that opens a chat with WHATSAPP_NUMBER and
 * pre-fills (but does not lock) a message.
 * @param {string} [message]
 */
export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
