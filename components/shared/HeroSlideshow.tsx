"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import type { HeroSlide } from "@/types/hero";

const CROSSFADE_SECONDS = 1;
const KEN_BURNS_SCALE = 1.08;
const SWIPE_THRESHOLD_PX = 50;

interface HeroSlideshowProps {
  slides: HeroSlide[];
  /** Accessible name for the carousel region. */
  label: string;
  intervalMs?: number;
  className?: string;
  /** Foreground content (headline, CTAs) — stays fixed while images change. */
  children: ReactNode;
}

/**
 * Full-bleed background slideshow with crossfade + Ken Burns zoom.
 *
 * Autoplay pauses on mouse hover, on keyboard focus inside the hero, and via
 * the pause button (WCAG 2.2.2). Under prefers-reduced-motion autoplay is off
 * entirely and <MotionConfig reducedMotion="user"> drops the zoom, leaving
 * manual navigation with a plain fade.
 */
export function HeroSlideshow({
  slides,
  label,
  intervalMs = 6000,
  className,
  children,
}: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  // Hydration-safe (false on the server), unlike framer-motion's useReducedMotion.
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = slides.length;
  const canAutoplay = count > 1 && !prefersReducedMotion;
  const isRunning = canAutoplay && !isUserPaused && !isHovered && !hasKeyboardFocus;

  const goTo = useCallback((index: number) => setActive((index + count) % count), [count]);

  // Re-armed on every slide change, so a manual jump restarts the countdown.
  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), intervalMs);
    return () => window.clearTimeout(timer);
  }, [isRunning, active, count, intervalMs]);

  const handlePointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === "mouse") setIsHovered(true);
  };

  const handleFocus = (event: FocusEvent) => {
    // Only keyboard focus pauses; a mouse click on a dot shouldn't stop autoplay for good.
    if (event.target.matches(":focus-visible")) setHasKeyboardFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
  };

  const handlePanEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    // Touch/pen only — a mouse drag here is usually text selection.
    if (!("pointerType" in event) || event.pointerType === "mouse") return;
    const { x, y } = info.offset;
    if (Math.abs(x) < SWIPE_THRESHOLD_PX || Math.abs(x) < Math.abs(y)) return;
    goTo(active + (x < 0 ? 1 : -1));
  };

  const handleDotKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = (active + step + count) % count;
    goTo(next);
    dotRefs.current[next]?.focus();
  };

  return (
    <motion.section
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPanEnd={handlePanEnd}
      className={cn("bg-ink text-paper relative isolate touch-pan-y overflow-hidden", className)}
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${slide.label}`}
              aria-hidden={!isActive}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: CROSSFADE_SECONDS, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                initial={index === 0 ? { scale: KEN_BURNS_SCALE } : false}
                animate={{ scale: isActive ? 1 : KEN_BURNS_SCALE }}
                transition={
                  isActive
                    ? { duration: intervalMs / 1000 + CROSSFADE_SECONDS, ease: "linear" }
                    : // Reset the zoom only once this slide has fully faded out.
                      { delay: CROSSFADE_SECONDS, duration: 0 }
                }
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="100vw"
                  // First slide is the LCP element; the rest load lazily at low priority.
                  preload={index === 0}
                  className="object-cover"
                  style={{ objectPosition: slide.image.objectPosition }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Readability scrim: bottom-up behind the stacked mobile/tablet copy, left-to-right on desktop. */}
        <div
          aria-hidden="true"
          className="from-ink/95 via-ink/70 to-ink/5 lg:from-ink/90 lg:via-ink/65 lg:to-ink/0 absolute inset-0 bg-linear-to-t via-55% lg:bg-linear-to-r lg:via-40%"
        />
      </div>

      {children}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
          <div
            role="group"
            aria-label="Choose slide"
            className="flex items-center gap-1"
            onKeyDown={handleDotKeyDown}
          >
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <button
                  key={slide.id}
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  type="button"
                  aria-label={`Show slide ${index + 1} of ${count}: ${slide.label}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className="group focus-visible:outline-paper flex size-6 items-center justify-center rounded-full"
                >
                  <span
                    className={cn(
                      "bg-paper block size-2.5 rounded-full transition-[transform,opacity] duration-300",
                      isActive ? "scale-125 opacity-100" : "opacity-50 group-hover:opacity-80",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {canAutoplay && (
            <button
              type="button"
              aria-label={isUserPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setIsUserPaused((paused) => !paused)}
              className="text-paper focus-visible:outline-paper flex size-6 items-center justify-center rounded-full opacity-70 transition-opacity duration-200 hover:opacity-100"
            >
              {/* {isUserPaused ? <PlayIcon /> : <PauseIcon />} */}
            </button>
          )}
        </div>
      )}

      <p className="sr-only" aria-live={isRunning ? "off" : "polite"} aria-atomic="true">
        {`Slide ${active + 1} of ${count}: ${slides[active]?.label ?? ""}`}
      </p>
    </motion.section>
  );
}
