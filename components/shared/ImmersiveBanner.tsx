"use client";

import { motion } from "framer-motion";
import { BackgroundMedia } from "@/components/shared/BackgroundMedia";
import { CtaLinks } from "@/components/shared/CtaLinks";
import { PinIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { BannerMedia, ImmersiveBannerContent } from "@/types/banner";

/**
 * Rounded full-width media banner with copy, CTAs and location chips on the left.
 *
 * Contrast is designed for the worst case, a pure-white frame of footage:
 * - From `lg`: navy runs 95% → 92% across the left 45%, then fades out. The
 *   copy column is capped (max-w-md at lg, max-w-xl at xl) so the gold
 *   eyebrow (needs 92%) and subtext (needs 75%) always sit in the dark zone.
 * - Below `lg`: the media shows through a window at the top, and the copy sits
 *   on a 92% navy panel that fades up into it.
 */
export function ImmersiveBanner({
  content,
  media,
  headingId,
  className,
}: {
  content: ImmersiveBannerContent;
  media: BannerMedia;
  /** Lets the parent <section> point aria-labelledby at the heading. */
  headingId?: string;
  className?: string;
}) {
  const { eyebrow, heading, subtext, primaryCta, secondaryCta, location, stat } = content;

  return (
    <div
      className={cn(
        "bg-navy focus-ring-gold min-h-banner lg:min-h-banner-lg relative isolate flex flex-col overflow-hidden rounded-xl",
        className,
      )}
    >
      <BackgroundMedia media={media} />

      <div
        aria-hidden="true"
        className="bg-navy/30 lg:from-navy/95 lg:via-navy/92 lg:to-navy/0 absolute inset-0 -z-10 lg:bg-transparent lg:bg-linear-to-r lg:via-45%"
      />

      {/* Below `lg`: media window, then a fade into the copy panel. */}
      <div aria-hidden="true" className="min-h-40 flex-1 sm:min-h-64 lg:hidden" />
      <div aria-hidden="true" className="from-navy/0 to-navy/92 h-16 bg-linear-to-b lg:hidden" />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="bg-navy/92 flex flex-col px-6 pb-8 sm:px-10 sm:pb-10 lg:flex-1 lg:bg-transparent lg:p-12 xl:px-20"
      >
        <div className="max-w-xl lg:my-auto lg:max-w-md xl:max-w-xl">
          <motion.p
            variants={fadeUp}
            className="text-gold-light text-sm font-medium tracking-widest uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id={headingId}
            className="text-paper mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl xl:text-5xl"
          >
            {heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-paper/80 mt-5 text-base xl:text-lg">
            {subtext}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <CtaLinks primary={primaryCta} secondary={secondaryCta} />
          </motion.div>
        </div>

        {(location || stat) && (
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            {location && (
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-paper/30 bg-navy/60 text-paper hover:bg-navy/80 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors duration-200"
              >
                <PinIcon className="text-gold-light size-4" />
                {location.label}
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            )}
            {stat && (
              <span className="border-gold/40 bg-navy/60 text-gold-light inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md">
                {stat}
              </span>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
