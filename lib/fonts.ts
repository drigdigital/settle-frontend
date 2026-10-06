import { Geist } from "next/font/google";

/**
 * PLACEHOLDER TYPEFACE — brand fonts are selected in Phase 1 (CLAUDE.md §3).
 * Geist stands in for both UI and heading text until that's approved.
 */
export const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
