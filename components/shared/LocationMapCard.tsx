"use client";

import { motion } from "framer-motion";
import { OfficeLocationDetails, MapEmbed } from "@/components/shared/OfficeLocationMap";
import { PinIcon } from "@/components/ui/icons";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";

export interface LocationMapCardProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  name: string;
  addressLines: string[];
  phone?: string;
  emails?: string[];
  mapQuery: string;
  className?: string;
}

/**
 * Premium, editorial "Location & Map" card: a single warm bg-surface card
 * with a soft shadow and rounded corners, location details on the left and
 * a large integrated map with an orange pin badge on the right. The map
 * bleeds edge-to-edge within its column (full width and height of the
 * card), rather than sitting inset — only the left content column carries
 * padding, and the outer rounded-xl + overflow-hidden clips the map to the
 * card's own corners. The brand orange is used only for the pin badge and
 * the Get Directions CTA — the rest of the type stays dark charcoal
 * (text-ink) / muted gray (text-muted), reusing existing tokens rather than
 * introducing new ones.
 */
export function LocationMapCard({
  eyebrow = "Location",
  title = "Find Us",
  description,
  name,
  addressLines,
  phone,
  emails,
  mapQuery,
  className,
}: LocationMapCardProps) {
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <motion.div
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "bg-surface shadow-soft grid overflow-hidden rounded-xl lg:grid-cols-2 lg:items-stretch",
        className,
      )}
    >
      <motion.div variants={fadeUp} className="flex flex-col justify-center p-8 sm:p-12">
        <p className="text-muted mb-3 text-sm font-medium tracking-widest uppercase">{eyebrow}</p>
        <h2 className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="text-muted mt-4 max-w-md">{description}</p>}

        <OfficeLocationDetails
          className="mt-8"
          name={name}
          addressLines={addressLines}
          phone={phone}
          emails={emails}
        />

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground mt-8 inline-flex h-12 w-fit items-center rounded px-8 text-sm font-medium transition-opacity duration-200 hover:opacity-90"
        >
          Get Directions
        </a>
      </motion.div>

      <motion.div variants={scaleIn} className="relative">
        <MapEmbed
          name={name}
          mapQuery={mapQuery}
          className="aspect-4/3 rounded-none lg:aspect-auto lg:h-full"
        />
        <div className="bg-surface shadow-medium absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2">
          <PinIcon className="text-primary h-4 w-4 flex-none" />
          <span className="text-ink text-sm font-medium">{name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
