"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { IconBadge } from "@/components/ui/IconBadge";
import { ChevronRightIcon, FactoryIcon, HomeIcon, LayersIcon } from "@/components/ui/icons";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";
import type { AboutHeroContent, AboutHighlightIcon } from "@/types/about";

const ICONS: Record<AboutHighlightIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  factory: FactoryIcon,
  layers: LayersIcon,
  home: HomeIcon,
};

const HEADING_ID = "about-heading";

/**
 * About page Section 01: breadcrumb, eyebrow, the page's h1, intro and a
 * three-item strip beside the hero photo (stacked below `lg`). Animates on
 * load, not on scroll, since it's above the fold.
 */
export function AboutHero({ content }: { content: AboutHeroContent }) {
  const { eyebrow, heading, intro, image, highlights } = content;

  return (
    <ViewportSection labelledBy={HEADING_ID}>
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
                About
              </li>
            </ol>
          </motion.nav>

          <motion.p
            variants={fadeUp}
            className="text-gold-deep mt-8 text-sm font-medium tracking-widest uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            id={HEADING_ID}
            className="text-navy mt-4 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-muted mt-6 text-base leading-relaxed sm:text-lg"
          >
            {intro}
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="border-navy/10 mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3 sm:gap-4"
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
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="bg-wood-sand relative aspect-4/3 overflow-hidden rounded-xl lg:aspect-4/5 xl:aspect-square"
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
