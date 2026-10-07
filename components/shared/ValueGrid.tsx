"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { IconBadge } from "@/components/ui/IconBadge";
import { FactoryIcon, HomeIcon, ShieldCheckIcon, TagIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { BrandValue, BrandValueIcon } from "@/types/brand";

const ICONS: Record<BrandValueIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  factory: FactoryIcon,
  "shield-check": ShieldCheckIcon,
  home: HomeIcon,
  tag: TagIcon,
};

/**
 * Icon + title + short line per value in a bordered band: 2 x 2 below `lg`,
 * 4 columns from `lg`. The 1px gap over a border-coloured background draws
 * the dividers at every breakpoint. The full description is a second line on
 * desktop and screen-reader-only below that, so nothing is lost on mobile.
 */
export function ValueGrid({ values, className }: { values: BrandValue[]; className?: string }) {
  return (
    <motion.ul
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "bg-border border-border shadow-soft grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4",
        className,
      )}
    >
      {values.map((value) => {
        const Icon = ICONS[value.icon];
        return (
          // The <li> keeps a solid background; only its content fades, so the
          // divider colour never shows through mid-animation.
          <li key={value.id} className="group bg-surface">
            <motion.div
              variants={fadeUp}
              className="flex h-full flex-col items-center px-4 py-8 text-center text-balance sm:px-6 lg:px-8 lg:py-10"
            >
              <IconBadge>
                <Icon className="size-6" />
              </IconBadge>
              <h3 className="text-ink mt-5 text-sm font-semibold sm:text-base">{value.title}</h3>
              <p className="text-accent mt-1 text-xs font-medium sm:text-sm">{value.shortLine}</p>
              <p className="text-muted sr-only text-sm lg:not-sr-only lg:mt-3">
                {value.description}
              </p>
            </motion.div>
          </li>
        );
      })}
    </motion.ul>
  );
}
