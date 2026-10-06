import type { Config } from "tailwindcss";

/**
 * Design tokens for Settle Furnitures.
 *
 * Color values live in app/globals.css as CSS variables (--color-*); this file
 * only maps them to Tailwind utility names. `primary` and `accent` are the
 * brand colors sampled from the logo (public/settle-logo.png) — see the
 * comment in globals.css for how each was derived. Never hardcode a color in
 * a component — add or adjust a token in globals.css instead.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        surface: "var(--color-surface)",
        danger: "var(--color-danger)",
        success: "var(--color-success)",
        // Fixed third-party brand color (WhatsApp), not a Settle design token.
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.04)",
        medium: "0 8px 24px 0 rgb(0 0 0 / 0.08)",
        large: "0 16px 48px 0 rgb(0 0 0 / 0.12)",
      },
      spacing: {
        section: "6rem",
        "section-sm": "3rem",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
        600: "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
