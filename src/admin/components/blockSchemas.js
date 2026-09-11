/**
 * Declarative field schema for every content-editable section-block
 * type rendered by src/pages/ServicePage/ServiceSections.jsx. Drives
 * both FixedSectionsEditor (existing service pages — content only,
 * block order/type is locked) and ComposableSectionsEditor (new SEO
 * pages — blocks can be added/removed/reordered from this same list).
 *
 * A handful of exotic block types used on one existing page each
 * (video-showcase, intro, steps, brands) have no schema here on
 * purpose — they're rendered read-only/pass-through in the admin so a
 * non-technical edit can never corrupt their shape, and they're left
 * out of COMPOSABLE_BLOCK_TYPES since they don't make sense as a
 * generic building block for a brand-new page.
 */

export const BLOCK_SCHEMAS = {
  "reveal-intro": {
    label: "Intro (eyebrow + heading + body)",
    fields: [
      { key: "eyebrow", label: "Eyebrow", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Body", kind: "textarea" },
      { key: "note", label: "Note", kind: "textarea", optional: true },
      {
        key: "list",
        label: "Checklist items — supports **bold** and [link text](/services/ppf)",
        kind: "stringList",
        optional: true,
      },
    ],
  },
  "feature-cards": {
    label: "Feature Cards (3-up)",
    fields: [
      {
        key: "cards",
        label: "Cards",
        kind: "itemList",
        itemLabel: "Card",
        itemFields: [
          { key: "image", label: "Image", kind: "image" },
          { key: "alt", label: "Image alt text", kind: "text" },
          { key: "title", label: "Title", kind: "text" },
          { key: "body", label: "Body", kind: "textarea" },
        ],
      },
    ],
  },
  banner: {
    label: "Full-Width Banner Image",
    fields: [
      { key: "image", label: "Image", kind: "image" },
      { key: "alt", label: "Image alt text", kind: "text" },
      { key: "overlay", label: "Overlay caption", kind: "text", optional: true },
    ],
  },
  process: {
    label: "Process Steps",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      {
        key: "steps",
        label: "Steps",
        kind: "itemList",
        itemLabel: "Step",
        itemFields: [
          { key: "title", label: "Title", kind: "text" },
          { key: "body", label: "Body", kind: "textarea" },
        ],
      },
    ],
  },
  trust: {
    label: "Trust / Warranty",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Body", kind: "textarea" },
      {
        key: "points",
        label: "Points — **bold** a phrase, or link with [link text](/services/ppf)",
        kind: "stringList",
        optional: true,
      },
    ],
  },
  approach: {
    label: "Approach (\"why we're different\")",
    fields: [
      { key: "eyebrow", label: "Eyebrow", kind: "text", optional: true },
      { key: "heading", label: "Heading (one line per row)", kind: "textLines" },
      { key: "body", label: "Body", kind: "textarea", optional: true },
      {
        key: "items",
        label: "Rows",
        kind: "itemList",
        itemLabel: "Row",
        itemFields: [
          { key: "text", label: "Text — **bold** a phrase, or link with [link text](/services/ppf)", kind: "text" },
        ],
      },
    ],
  },
  benefits: {
    label: "Benefits Grid",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      {
        key: "items",
        label: "Benefits",
        kind: "itemList",
        itemLabel: "Benefit",
        itemFields: [
          { key: "title", label: "Title", kind: "text" },
          { key: "body", label: "Body", kind: "textarea" },
        ],
      },
      { key: "note", label: "Note", kind: "textarea", optional: true },
    ],
  },
  "text-list": {
    label: "Text List",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "items", label: "Items", kind: "stringList" },
      { key: "note", label: "Note", kind: "textarea", optional: true },
    ],
  },
  "checklist-grid": {
    label: "Checklist Grid",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "items", label: "Items", kind: "stringList" },
      { key: "note", label: "Note", kind: "textarea", optional: true },
    ],
  },
  "stage-list": {
    label: "Stage List",
    fields: [
      { key: "heading", label: "Heading", kind: "text", optional: true },
      {
        key: "stages",
        label: "Stages",
        kind: "itemList",
        itemLabel: "Stage",
        itemFields: [
          { key: "title", label: "Title", kind: "text" },
          { key: "body", label: "Body", kind: "textarea" },
        ],
      },
    ],
  },
  gallery: {
    label: "Photo Gallery (scrolling rows)",
    fields: [
      { key: "heading", label: "Heading", kind: "text", optional: true },
      {
        key: "images",
        label: "Images",
        kind: "itemList",
        itemLabel: "Image",
        itemFields: [
          { key: "src", label: "Image", kind: "image" },
          { key: "alt", label: "Alt text", kind: "text" },
        ],
      },
    ],
  },
  "before-after": {
    label: "Before / After",
    fields: [
      { key: "heading", label: "Heading", kind: "text", optional: true },
      { key: "before", label: "Before", kind: "imageGroup" },
      { key: "after", label: "After", kind: "imageGroup" },
    ],
  },
  "product-marquee": {
    label: "Product Marquee",
    fields: [
      {
        key: "products",
        label: "Products",
        kind: "itemList",
        itemLabel: "Product",
        itemFields: [
          { key: "src", label: "Image", kind: "image" },
          { key: "alt", label: "Alt text", kind: "text" },
        ],
      },
    ],
  },
  "two-image": {
    label: "Two Images Side-by-Side",
    fields: [
      {
        key: "images",
        label: "Images",
        kind: "itemList",
        itemLabel: "Image",
        itemFields: [
          { key: "src", label: "Image", kind: "image" },
          { key: "alt", label: "Alt text", kind: "text" },
        ],
      },
    ],
  },
};

// Types a brand-new SEO page can be composed from. A subset of
// BLOCK_SCHEMAS's keys — deliberately excludes nothing right now, but
// kept as an explicit allow-list (not "every key") so a future schema
// addition doesn't silently become choosable without a decision.
export const COMPOSABLE_BLOCK_TYPES = [
  "reveal-intro",
  "feature-cards",
  "banner",
  "process",
  "trust",
  "approach",
  "benefits",
  "text-list",
  "checklist-grid",
  "stage-list",
  "gallery",
  "before-after",
  "product-marquee",
  "two-image",
];

function emptyValueForField(field) {
  switch (field.kind) {
    case "stringList":
      return [];
    case "textLines":
      return [""];
    case "itemList":
      return [];
    case "imageGroup":
      return { src: "", alt: "" };
    default:
      return "";
  }
}

export function createEmptyBlock(type) {
  const schema = BLOCK_SCHEMAS[type];
  if (!schema) return { type };

  const block = { type };
  for (const field of schema.fields) {
    block[field.key] = emptyValueForField(field);
  }
  return block;
}
