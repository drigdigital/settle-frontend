import type { ReactNode } from "react";
import { Container } from "@/components/shared/Container";
import { cn } from "@/utils/cn";
import type { SectionTone } from "@/types/page";

const TONE_CLASSES: Record<SectionTone, string> = {
  paper: "bg-paper",
  linen: "bg-linen",
  navy: "bg-navy focus-ring-gold",
};

/**
 * A focused, one-screen section: at least the viewport height below the
 * sticky Navbar, content vertically centred, and a snap point for pages that
 * opt in with [data-snap-page]. min-height, never a fixed height, so content
 * that needs more room (phones, large text) grows the section instead of
 * being clipped.
 */
export function ViewportSection({
  id,
  tone = "paper",
  labelledBy,
  className,
  children,
}: {
  /** Anchor target, e.g. "enquiry" for /business#enquiry. */
  id?: string;
  tone?: SectionTone;
  /** id of the section's heading, for aria-labelledby. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "min-h-viewport py-section-sm lg:py-section flex snap-start items-center overflow-hidden",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
