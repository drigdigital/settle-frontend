"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { BackgroundMedia } from "@/components/shared/BackgroundMedia";
import { Container } from "@/components/shared/Container";
import { CtaLinks } from "@/components/shared/CtaLinks";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { ClosingCtaContent } from "@/types/banner";

/**
 * Full-width navy closing band: gold rule, eyebrow, heading, subtext and a
 * centred CTA pair, staggered in on scroll. Reusable as the last section of
 * any page.
 *
 * Background is solid navy with faint gold pinstripes and two soft gold
 * glows, or, when `content.image` is set, that photo under a 90% navy overlay
 * (with BackgroundMedia's subtle parallax). The eyebrow uses gold-light: plain
 * gold drops below 4.5:1 once any glow sits behind it.
 */
export function ClosingCta({
  content,
  className,
}: {
  content: ClosingCtaContent;
  className?: string;
}) {
  const headingId = useId();
  const { eyebrow, heading, subtext, primaryCta, secondaryCta, image } = content;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "bg-navy focus-ring-gold min-h-cta lg:min-h-cta-lg relative isolate flex items-center overflow-hidden",
        className,
      )}
    >
      {image ? (
        <>
          <BackgroundMedia media={{ poster: image }} />
          <div aria-hidden="true" className="bg-navy/90 absolute inset-0 -z-10" />
        </>
      ) : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="pinstripe-gold absolute inset-0 opacity-10" />
          {/* Glows capped at 15% gold so the eyebrow stays above 4.5:1 wherever they reach. */}
          <div className="bg-gold/15 absolute -bottom-56 left-1/2 size-96 -translate-x-1/2 rounded-full blur-3xl lg:size-128" />
          <div className="bg-gold/10 absolute -top-40 -right-40 size-80 rounded-full blur-3xl" />
        </div>
      )}

      <Container className="py-section-sm lg:py-section">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <span aria-hidden="true" className="bg-gold h-px w-12" />
              <p className="text-gold-light mt-6 text-sm font-medium tracking-widest uppercase">
                {eyebrow}
              </p>
            </motion.div>
          )}
          <motion.h2
            variants={fadeUp}
            id={headingId}
            className="text-paper mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl xl:text-5xl"
          >
            {heading}
          </motion.h2>
          {subtext && (
            <motion.p
              variants={fadeUp}
              className="text-paper/80 mx-auto mt-5 max-w-2xl text-base text-balance sm:text-lg"
            >
              {subtext}
            </motion.p>
          )}
          <motion.div variants={fadeUp} className="mt-10">
            <CtaLinks primary={primaryCta} secondary={secondaryCta} align="center" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
