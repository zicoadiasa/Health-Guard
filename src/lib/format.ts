export function formatDisplayName(name: string): string {
  return name
    .trim()
    .replace(/[-–—]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}
