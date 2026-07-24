export function normalizeText(text: string) {
  return text
    .trim()
    .replace(/\s+/g, " ");
}

export function capitalizeWords(text: string) {
  return normalizeText(text)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}