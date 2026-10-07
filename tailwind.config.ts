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
        linen: "var(--color-linen)",
        navy: "var(--color-navy)",
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
          deep: "var(--color-gold-deep)",
        },
        cream: "var(--color-cream)",
        danger: "var(--color-danger)",
        success: "var(--color-success)",
        wood: {
          sand: "var(--color-wood-sand)",
          oak: "var(--color-wood-oak)",
          teak: "var(--color-wood-teak)",
          cherry: "var(--color-wood-cherry)",
          walnut: "var(--color-wood-walnut)",
        },
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
      minHeight: {
        // Homepage hero; svh so mobile browser chrome doesn't push CTAs off-screen.
        hero: "85svh",
        // Full-width media banners (homepage Section 06).
        banner: "70svh",
        "banner-lg": "80svh",
        // Closing CTA band (homepage Section 08).
        cta: "50svh",
        "cta-lg": "55svh",
      },
      keyframes: {
        "ken-burns": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.08)" },
        },
        // Track holds two identical copies of the content; -50% is exactly one copy.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // Slow zoom per gallery slide; outlasts BackgroundMedia's slide interval + crossfade.
        "ken-burns": "ken-burns 9s linear forwards",
        marquee: "marquee 40s linear infinite",
      },
      flexBasis: {
        // Carousel slide widths: N whole cards plus a peek of the next, given the
        // track's gap (gap-5 / 1.25rem below `sm`, gap-6 / 1.5rem from `sm`).
        "peek-1": "calc((100% - 1.25rem) / 1.2)",
        "peek-2": "calc((100% - 2 * 1.5rem) / 2.5)",
        "peek-3": "calc((100% - 3 * 1.5rem) / 3.5)",
        // Exactly N whole cards, no peek (gap-6 / 1.5rem).
        "fit-2": "calc((100% - 1.5rem) / 2)",
        "fit-3": "calc((100% - 2 * 1.5rem) / 3)",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
        600: "600ms",
        700: "700ms",
      },
      transitionTimingFunction: {
        // Same curve as the Framer Motion presets in lib/animations.ts.
        gentle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
