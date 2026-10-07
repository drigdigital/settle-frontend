import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

const TONE_CLASSES = {
  // Section 02 value strip: tinted accent disc, accent icon.
  accent: {
    badge: "bg-accent/10 ring-accent/20 text-accent",
    hover: "bg-accent group-hover:opacity-10",
  },
  // Partner band (Section 05): solid gold disc, navy icon; brightens on hover.
  gold: {
    badge: "bg-gold ring-gold-deep/20 text-navy",
    hover: "bg-gold-light group-hover:opacity-100",
  },
} as const;

export type IconBadgeTone = keyof typeof TONE_CLASSES;

/**
 * Circular badge for a decorative line icon. Lifts and shifts its fill when
 * an ancestor with the `group` class is hovered — transform and opacity only
 * (CLAUDE.md §3).
 */
export function IconBadge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: IconBadgeTone;
  className?: string;
}) {
  const classes = TONE_CLASSES[tone];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-300 motion-safe:group-hover:-translate-y-1",
        classes.badge,
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          classes.hover,
        )}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
