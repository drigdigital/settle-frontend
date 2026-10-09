"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BedIcon,
  BriefcaseIcon,
  BuildingIcon,
  GraduationCapIcon,
  StoreIcon,
  SwatchIcon,
} from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { IconTile, TileIcon } from "@/types/business";

const ICONS: Record<TileIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  bed: BedIcon,
  building: BuildingIcon,
  briefcase: BriefcaseIcon,
  "graduation-cap": GraduationCapIcon,
  store: StoreIcon,
  swatch: SwatchIcon,
};

/**
 * Grid of labelled icon tiles for navy bands: 2 columns on phones and
 * tablets, 3 from `lg`. Tiles stagger in on scroll; on hover the gold badge
 * lifts and the border warms to gold.
 */
export function IconTileGrid({ tiles, className }: { tiles: IconTile[]; className?: string }) {
  return (
    <motion.ul
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6", className)}
    >
      {tiles.map((tile) => {
        const Icon = ICONS[tile.icon];
        return (
          <motion.li
            key={tile.id}
            variants={fadeUp}
            className="group border-paper/10 bg-paper/5 hover:border-gold/40 flex flex-col items-start gap-4 rounded-xl border p-5 transition-colors duration-300 sm:p-6 lg:flex-row lg:items-center lg:gap-5 lg:p-8"
          >
            <IconBadge tone="gold">
              <Icon className="size-6" />
            </IconBadge>
            <h3 className="text-paper text-sm font-semibold sm:text-base lg:text-lg">
              {tile.label}
            </h3>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
