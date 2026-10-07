import { animate, type Variants } from "framer-motion";

/**
 * Shared Framer Motion presets. Animate transform/opacity only (CLAUDE.md §3).
 * Reduced-motion is handled globally via <MotionConfig reducedMotion="user">
 * in app/layout.tsx — these variants don't need to branch on it themselves.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;

/**
 * Eased scroll to an in-page anchor, slower than the browser's native
 * `scroll-behavior: smooth` so an in-page "jump to section" CTA reads as a
 * deliberate reveal rather than an instant cut. Offsets by the sticky
 * Navbar's actual height so the target section's own heading lands fully
 * visible below it, not hidden underneath. Falls back to an instant jump
 * under prefers-reduced-motion (CLAUDE.md §3).
 */
export function smoothScrollTo(elementId: string, duration = 1.2): void {
  const target = document.getElementById(elementId);
  if (!target) return;

  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + 24;
  const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  animate(window.scrollY, targetY, {
    duration,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (value) => window.scrollTo(0, value),
  });
}
