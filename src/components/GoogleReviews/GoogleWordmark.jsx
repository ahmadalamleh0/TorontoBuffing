import "./GoogleWordmark.css";

// Google's brand wordmark, approximated with the official per-letter
// colors on a bold sans-serif (Google's own "Product Sans" isn't a
// freely distributable web font). Used once, on the reviews summary
// card — the small "G" mark (GoogleLogo.jsx) is used everywhere else.
const LETTERS = [
  { char: "G", color: "#4285F4" },
  { char: "o", color: "#EA4335" },
  { char: "o", color: "#FBBC05" },
  { char: "g", color: "#4285F4" },
  { char: "l", color: "#34A853" },
  { char: "e", color: "#EA4335" },
];

function GoogleWordmark({ className }) {
  return (
    <span className={`google-wordmark${className ? ` ${className}` : ""}`} role="img" aria-label="Google">
      {LETTERS.map((letter, i) => (
        <span key={i} aria-hidden="true" style={{ color: letter.color }}>
          {letter.char}
        </span>
      ))}
    </span>
  );
}

export default GoogleWordmark;
