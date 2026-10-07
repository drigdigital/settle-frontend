"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  HandshakeIcon,
  MegaphoneIcon,
  MonitorIcon,
  StoreIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { fadeInLeft, fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { PartnerHighlightContent, PartnerPillar, PartnerPillarIcon } from "@/types/partner";

const ICONS: Record<PartnerPillarIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  handshake: HandshakeIcon,
  monitor: MonitorIcon,
  store: StoreIcon,
  megaphone: MegaphoneIcon,
  "badge-check": BadgeCheckIcon,
  truck: TruckIcon,
};

/**
 * Navy pitch panel + cream grid of support pillars in one contained card.
 * 40/60 side by side from `lg`; stacked (navy on top) below that, with the
 * pillars in 2 columns from `sm` and 1 column on phones. Like the Section 02
 * ValueGrid, a 1px gap over a tinted background draws the dividers. The panel
 * and the pillar list each reveal on their own, so stacked pillars still
 * animate when they actually scroll into view.
 */
export function PartnerSupportBand({
  content,
  pillars,
  headingId,
  className,
}: {
  content: PartnerHighlightContent;
  pillars: PartnerPillar[];
  /** Lets the parent <section> point aria-labelledby at the heading. */
  headingId?: string;
  className?: string;
}) {
  return (
    <div className={cn("shadow-medium grid overflow-hidden rounded-xl lg:grid-cols-5", className)}>
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="bg-navy focus-ring-gold relative isolate flex flex-col justify-center overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:col-span-2 lg:px-12 xl:px-16"
      >
        {/* Soft gold glow, top-right corner. */}
        <div
          aria-hidden="true"
          className="bg-gold/20 pointer-events-none absolute -top-32 -right-32 -z-10 size-80 rounded-full blur-3xl"
        />

        <p className="text-gold flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
          <span aria-hidden="true" className="bg-gold h-px w-8" />
          {content.eyebrow}
        </p>
        <h2
          id={headingId}
          className="text-paper mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {content.heading}
        </h2>
        <p className="text-paper/75 mt-4 max-w-md text-base">{content.subtext}</p>
        <Link
          href={content.cta.href}
          className={cn(
            buttonVariants({ variant: "gold", size: "lg" }),
            "group/cta mt-8 w-full sm:w-auto sm:self-start",
          )}
        >
          {content.cta.label}
          <ArrowRightIcon className="size-5 transition-transform duration-300 motion-safe:group-hover/cta:translate-x-1" />
        </Link>
      </motion.div>

      <div className="bg-cream flex items-center px-6 py-6 sm:px-10 sm:py-8 lg:col-span-3 lg:px-12 xl:px-16">
        <motion.ul
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-navy/10 grid w-full gap-px sm:grid-cols-2"
        >
          {pillars.map((pillar) => {
            const Icon = ICONS[pillar.icon];
            return (
              // Solid background on the <li>; only its content fades, so the
              // divider tint never shows through mid-animation.
              <li key={pillar.id} className="group bg-cream">
                <motion.div
                  variants={fadeUp}
                  className="flex h-full items-start gap-4 py-6 sm:px-5 sm:py-7"
                >
                  <IconBadge tone="gold">
                    <Icon className="size-6" />
                  </IconBadge>
                  <div className="pt-1">
                    <h3 className="text-navy group-hover:text-gold-deep text-sm font-semibold transition-colors duration-300 sm:text-base">
                      {pillar.title}
                    </h3>
                    <p className="text-navy/70 mt-1 text-sm">{pillar.description}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
