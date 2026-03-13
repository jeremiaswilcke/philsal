import sanitize from "sanitize-html";

const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "b", "i", "u",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li",
  "blockquote", "a", "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "span", "div", "figure", "figcaption",
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title", "class"],
  "*": ["class"],
};

export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}
