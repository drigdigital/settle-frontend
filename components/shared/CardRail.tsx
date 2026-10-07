"use client";

import { Children, isValidElement, useCallback, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";

interface CardRailProps {
  /** One label per child, used for the dot buttons ("Show Aura Wardrobe"). */
  itemLabels: string[];
  /** Accessible name for the list. */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Below `lg`: a swipeable scroll-snap rail that bleeds to the screen edges,
 * with a peek of the next card, dots on mobile and arrows on tablet.
 * From `lg`: a single row of five equal columns. Each child becomes
 * a list item and fades up in a stagger when the rail scrolls into view.
 */
export function CardRail({ itemLabels, label, className, children }: CardRailProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const items = Children.toArray(children);

  const offsetOf = (list: HTMLUListElement, index: number) => {
    const first = list.children[0];
    const target = list.children[index];
    return first instanceof HTMLElement && target instanceof HTMLElement
      ? target.offsetLeft - first.offsetLeft
      : 0;
  };

  const handleScroll = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const maxScroll = list.scrollWidth - list.clientWidth;
    const atEnd = list.scrollLeft >= maxScroll - 4;
    setEdges({ atStart: list.scrollLeft <= 4, atEnd });

    if (atEnd) {
      setActive(list.children.length - 1);
      return;
    }
    let closest = 0;
    for (let i = 1; i < list.children.length; i++) {
      if (
        Math.abs(offsetOf(list, i) - list.scrollLeft) <
        Math.abs(offsetOf(list, closest) - list.scrollLeft)
      ) {
        closest = i;
      }
    }
    setActive(closest);
  }, []);

  const scrollToIndex = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const clamped = Math.max(0, Math.min(index, list.children.length - 1));
    list.scrollTo({
      left: offsetOf(list, clamped),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className={className}>
      <motion.ul
        ref={listRef}
        aria-label={label}
        onScroll={handleScroll}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
      >
        {items.map((child, index) => (
          <motion.li
            key={isValidElement(child) && child.key !== null ? child.key : index}
            variants={fadeUp}
            className="shrink-0 basis-4/5 snap-start sm:basis-2/5 lg:basis-auto"
          >
            {child}
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-6 flex items-center justify-center sm:justify-end lg:hidden">
        <div className="flex items-center gap-1 sm:hidden">
          {itemLabels.map((itemLabel, index) => (
            <button
              key={itemLabel}
              type="button"
              aria-label={`Show ${itemLabel}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className="group flex size-6 items-center justify-center rounded-full"
            >
              <span
                className={cn(
                  "bg-ink block size-2 rounded-full transition-[transform,opacity] duration-300",
                  index === active ? "scale-125 opacity-100" : "opacity-30 group-hover:opacity-60",
                )}
              />
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous"
            disabled={edges.atStart}
            onClick={() => scrollToIndex(active - 1)}
            className="border-border text-ink hover:bg-ink/5 flex size-10 items-center justify-center rounded-full border transition-opacity duration-200 disabled:opacity-40"
          >
            <ChevronRightIcon className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={edges.atEnd}
            onClick={() => scrollToIndex(active + 1)}
            className="border-border text-ink hover:bg-ink/5 flex size-10 items-center justify-center rounded-full border transition-opacity duration-200 disabled:opacity-40"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
