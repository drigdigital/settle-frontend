"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { IconBadge } from "@/components/ui/IconBadge";
import { ChevronRightIcon, FactoryIcon, HomeIcon, LayersIcon } from "@/components/ui/icons";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import type { PageHeroContent, PageHighlightIcon } from "@/types/page";

const ICONS: Record<PageHighlightIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  factory: FactoryIcon,
  layers: LayersIcon,
  home: HomeIcon,
};

/**
 * Page hero in a viewport section: breadcrumb, eyebrow, the page's h1, intro
 * and an optional three-item strip beside a photo (stacked below `lg`). From
 * `lg` the photo's height comes from the screen (`h-viewport-panel`), not a
 * fixed aspect ratio, so the hero always fits one viewport.
 * Animates on load, not on scroll, since it's above the fold. The photo is
 * the page's LCP element, so it's preloaded.
 */
export function SplitHero({
  content,
  breadcrumbLabel,
  headingId,
}: {
  content: PageHeroContent;
  /** Current page's name in the "Home › …" breadcrumb. */
  breadcrumbLabel: string;
  /** Unique id for the h1, referenced by the section's aria-labelledby. */
  headingId: string;
}) {
  const { eyebrow, heading, intro, image, highlights } = content;

  return (
    <ViewportSection labelledBy={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="visible">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="text-muted text-sm">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="size-3.5" />
              </li>
              <li aria-current="page" className="text-navy font-medium">
                {breadcrumbLabel}
              </li>
            </ol>
          </motion.nav>

          <motion.p
            variants={fadeUp}
            className="text-gold-deep mt-6 text-sm font-medium tracking-widest uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            id={headingId}
            className="text-navy mt-4 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-muted mt-5 text-base leading-relaxed sm:text-lg"
          >
            {intro}
          </motion.p>

          {highlights && highlights.length > 0 && (
            <motion.ul
              variants={fadeUp}
              className="border-navy/10 mt-8 grid gap-4 border-t pt-6 sm:grid-cols-3"
            >
              {highlights.map((highlight) => {
                const Icon = ICONS[highlight.icon];
                return (
                  <li
                    key={highlight.id}
                    className="group flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3"
                  >
                    <IconBadge tone="gold">
                      <Icon className="size-6" />
                    </IconBadge>
                    <div>
                      <p className="text-navy text-sm font-semibold">{highlight.title}</p>
                      <p className="text-muted mt-0.5 text-sm">{highlight.line}</p>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="bg-wood-sand lg:h-viewport-panel relative aspect-video overflow-hidden rounded-xl sm:aspect-21/9 lg:aspect-auto lg:max-h-180"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: image.objectPosition }}
          />
        </motion.div>
      </div>
    </ViewportSection>
  );
}
