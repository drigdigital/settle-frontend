/** Up to two initials from a display name: "Priya S." → "PS", "Karthik" → "K". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^\p{L}\p{N}]/gu, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
