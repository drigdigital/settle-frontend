"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/shared/Carousel";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import { rangeHref } from "@/utils/productFamily";
import type { FamilySummary, SubcategorySummary } from "@/types/productFamily";
import type { SectionTone } from "@/types/page";

const TONES: SectionTone[] = ["linen", "paper", "linen"];

// Tile widths at 1.2 / 2.5 / 3.5 visible slides, capped by the 1440px container.
const TILE_SIZES =
  "(min-width: 1440px) 380px, (min-width: 1024px) 26vw, (min-width: 640px) 38vw, 82vw";

function pieces(count: number): string {
  return `${count} ${count === 1 ? "piece" : "pieces"}`;
}

/**
 * Products page range overview: one screen per family (Wooden, Modular,
 * Upholstered), with its intro above a slider of subcategory tiles (arrows,
 * swipe and ← / →, no autoplay). Each tile opens the catalog below filtered
 * to that subcategory; tiles with no products yet show "Coming soon" and
 * aren't links. Cover photos come from the subcategory's own products, so
 * they update as the admin adds photos.
 */
export function RangeFamilies({ families }: { families: FamilySummary[] }) {
  return (
    <>
      {families.map((family, index) => {
        const headingId = `range-${family.id}-heading`;
        return (
          <ViewportSection
            key={family.id}
            id={`range-${family.id}`}
            tone={TONES[index % TONES.length]}
            labelledBy={headingId}
          >
            <Carousel
              label={`${family.name} range`}
              slideLabels={family.subcategories.map((sub) => sub.name)}
              itemsLabel={`${family.name} categories`}
              autoplay={false}
              header={
                <div className="max-w-2xl">
                  <p className="text-gold-deep text-sm font-semibold tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-muted ml-3 font-medium">{pieces(family.count)}</span>
                  </p>
                  <h2
                    id={headingId}
                    className="text-navy mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
                  >
                    {family.name}
                  </h2>
                  <span aria-hidden="true" className="bg-gold mt-5 block h-px w-12" />
                  <p className="text-muted mt-5 text-base leading-relaxed sm:text-lg">
                    {family.description}
                  </p>
                  {family.count > 0 && (
                    <Link
                      href={rangeHref(family.id)}
                      className="group/all text-navy mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      {`View all ${family.name}`}
                      <ArrowRightIcon className="size-4 transition-transform duration-300 motion-safe:group-hover/all:translate-x-1" />
                    </Link>
                  )}
                </div>
              }
            >
              {family.subcategories.map((subcategory) => (
                <SubcategoryTile
                  key={subcategory.id}
                  familyId={family.id}
                  subcategory={subcategory}
                />
              ))}
            </Carousel>
          </ViewportSection>
        );
      })}
    </>
  );
}

function SubcategoryTile({
  familyId,
  subcategory,
}: {
  familyId: FamilySummary["id"];
  subcategory: SubcategorySummary;
}) {
  const { name, description, count, image } = subcategory;
  const isAvailable = count > 0;

  return (
    <article className="group bg-surface shadow-soft ring-border/60 hover:shadow-medium has-focus-visible:outline-accent relative flex w-full flex-col overflow-hidden rounded-xl ring-1 transition-shadow duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-4">
      <div className="bg-wood-sand/40 relative aspect-3/2 overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes={TILE_SIZES}
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        ) : (
          <span className="text-navy/40 absolute inset-0 flex items-center justify-center text-xs font-medium tracking-widest uppercase">
            Photos coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-navy text-base font-semibold sm:text-lg">
            {isAvailable ? (
              <Link
                href={rangeHref(familyId, subcategory.id)}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          <span
            className={cn(
              "mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
              isAvailable ? "bg-navy/5 text-navy" : "bg-linen text-muted",
            )}
          >
            {isAvailable ? pieces(count) : "Coming soon"}
          </span>
        </div>
        {description && (
          <p className="text-muted mt-2 line-clamp-3 text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </article>
  );
}
