"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { MapEmbed } from "@/components/shared/OfficeLocationMap";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PinIcon } from "@/components/ui/icons";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { Dealer, DealerLocatorContent } from "@/types/dealers";

const HEADING_ID = "dealer-locator-heading";

function fullAddress(dealer: Dealer): string {
  return `${dealer.address}, ${dealer.city} – ${dealer.pincode}`;
}

/**
 * Dealers page "Find Settle near you": search by city or pin code over a list
 * of dealer cards (name, address, phone, directions), beside a live map of the
 * selected dealer. The key-less Google embed shows one location at a time, so
 * the map follows the selection. Side by side from `lg`; list above the map
 * on phones. While the dealer list is empty, a short note and contact link
 * stand in for the list.
 */
export function DealerLocator({
  id,
  content,
  dealers,
}: {
  /** Anchor target, e.g. "find-dealer" for /dealers#find-dealer. */
  id: string;
  content: DealerLocatorContent;
  dealers: Dealer[];
}) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(dealers[0]?.id ?? null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return dealers;
    return dealers.filter(
      (dealer) => dealer.city.toLowerCase().includes(term) || dealer.pincode.startsWith(term),
    );
  }, [dealers, query]);

  const selected = results.find((dealer) => dealer.id === selectedId) ?? results[0];
  const mapQuery = selected
    ? `${selected.name}, ${fullAddress(selected)}`
    : content.defaultMapQuery;
  const hasDealers = dealers.length > 0;

  return (
    <ViewportSection id={id} tone="paper" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.text}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-5 lg:gap-8"
      >
        <div className="lg:col-span-2">
          {hasDealers ? (
            <>
              <label htmlFor={searchId} className="sr-only">
                Search dealers by city or pin code
              </label>
              <Input
                id={searchId}
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder="City or pin code"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <p className="text-muted mt-3 text-sm" aria-live="polite">
                {`${results.length} ${results.length === 1 ? "dealer" : "dealers"}${query.trim() ? ` for “${query.trim()}”` : ""}`}
              </p>

              <ul className="mt-4 space-y-3 lg:max-h-120 lg:overflow-y-auto lg:pr-1">
                {results.map((dealer) => {
                  const isSelected = dealer.id === selected?.id;
                  return (
                    <li
                      key={dealer.id}
                      className={cn(
                        "bg-surface rounded-xl border p-5 transition-colors duration-200",
                        isSelected ? "border-accent" : "border-border",
                      )}
                    >
                      <h3 className="text-navy text-base font-semibold">{dealer.name}</h3>
                      <p className="text-muted mt-1 text-sm leading-relaxed">
                        {fullAddress(dealer)}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedId(dealer.id)}
                          className="text-navy inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                        >
                          <PinIcon className="size-4" />
                          Show on map
                        </button>
                        <a
                          href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                          className="text-ink underline-offset-4 hover:underline"
                        >
                          {dealer.phone}
                        </a>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.name}, ${fullAddress(dealer)}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink underline-offset-4 hover:underline"
                        >
                          Directions
                          <span className="sr-only"> to {dealer.name} (opens Google Maps)</span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {results.length === 0 && (
                <p className="text-muted mt-4 text-sm">
                  {`No dealers match “${query.trim()}”. Try another city or pin code.`}
                </p>
              )}
            </>
          ) : (
            <div className="bg-linen flex h-full flex-col justify-center rounded-xl p-6 sm:p-8">
              <PinIcon aria-hidden="true" className="text-accent size-6" />
              <p className="text-ink mt-4 text-base leading-relaxed">{content.emptyState.text}</p>
              <Link
                href={content.emptyState.cta.href}
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "mt-6 self-start",
                )}
              >
                {content.emptyState.cta.label}
              </Link>
            </div>
          )}
        </div>

        <MapEmbed
          name={selected ? selected.name : "Settle dealers"}
          mapQuery={mapQuery}
          className="lg:col-span-3 lg:aspect-16/10"
        />
      </motion.div>
    </ViewportSection>
  );
}
