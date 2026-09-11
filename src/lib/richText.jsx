import { Link } from "react-router-dom";

// **[link text](url)**, [link text](url), or **bold text** — matched
// in one pass so any convention can appear anywhere in the same field,
// in any order. The bold-wrapped-link alternative MUST come first: at
// a given "**" the plain-bold alternative (`\*\*([^*]+)\*\*`) would
// otherwise match greedily across an inner [label](url), since none of
// those characters are "*", swallowing the link syntax as literal bold
// text instead of rendering it as a link (the cause of raw "[label]
// (url)" text appearing on published pages).
const RICH_TEXT_PATTERN = /\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

function isSafeHref(href) {
  return href.startsWith("/") || href.startsWith("https://");
}

/**
 * Renders a plain-text CMS field with two inline conventions:
 * `**bold**` and `[link text](/services/ppf)` (or an `https://` URL
 * for an external link). This is the only "rich text" the content
 * blocks support — there's no WYSIWYG editor, no HTML — so a link is
 * always exactly this bracket-paren syntax, typed directly into the
 * admin's textarea.
 *
 * Internal paths (starting with "/") render as a React Router `Link`
 * so following one is a client-side navigation, not a full reload.
 * External `https://` links open in a new tab. Anything else
 * (`javascript:`, `data:`, a malformed value) renders as plain text
 * instead of a clickable link — CMS content comes from the one
 * trusted admin, but there's no reason to make an unexpected scheme
 * clickable regardless.
 *
 * @param {string} text
 * @returns {string | Array<string | import('react').ReactNode>}
 */
export function renderRichText(text) {
  if (!text) return text;

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  RICH_TEXT_PATTERN.lastIndex = 0;

  while ((match = RICH_TEXT_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    const boldLinkLabel = match[1];
    const plainLinkLabel = match[3];

    if (boldLinkLabel !== undefined || plainLinkLabel !== undefined) {
      const label = boldLinkLabel ?? plainLinkLabel;
      const href = boldLinkLabel !== undefined ? match[2] : match[4];
      const bold = boldLinkLabel !== undefined;

      let node;
      if (!isSafeHref(href)) {
        node = label;
      } else if (href.startsWith("https://")) {
        node = (
          <a href={href} key={key++} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      } else {
        node = (
          <Link to={href} key={key++}>
            {label}
          </Link>
        );
      }
      nodes.push(bold ? <strong key={key++}>{node}</strong> : node);
    } else {
      nodes.push(<strong key={key++}>{match[5]}</strong>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
