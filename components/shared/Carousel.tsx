"use client";

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { animate, motion, useInView, type AnimationPlaybackControls } from "framer-motion";
import { ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";

const SCROLL_SECONDS = 0.9;
const SCROLL_EASE = [0.22, 1, 0.36, 1] as const;
const EDGE_TOLERANCE_PX = 4;

const ARROW_BASE =
  "flex size-11 items-center justify-center rounded-full transition-[background-color,color,opacity] duration-300 disabled:cursor-not-allowed disabled:opacity-30";

const TONE_CLASSES = {
  // Section 04: ink arrows, accent hover and progress.
  ink: {
    arrow: "bg-ink text-paper hover:bg-accent disabled:hover:bg-ink",
    pause: "border-ink/20 text-ink hover:border-accent hover:text-accent",
    rail: "bg-ink/10",
    thumb: "bg-accent",
  },
  // Navy arrows turning gold (navy icon on gold, 4.6:1), gold progress.
  navy: {
    arrow:
      "bg-navy text-paper hover:bg-gold hover:text-navy disabled:hover:bg-navy disabled:hover:text-paper",
    pause: "border-navy/20 text-navy hover:border-gold-deep hover:text-gold-deep",
    rail: "bg-navy/10",
    thumb: "bg-gold",
  },
} as const;

const DEFAULT_SLIDE_CLASSES = "basis-peek-1 sm:basis-peek-2 lg:basis-peek-3";

interface CarouselProps {
  /** Accessible name for the carousel region. */
  label: string;
  /** One name per child, announced as "3 of 8: Marne Sofa". */
  slideLabels: string[];
  /** Heading block, laid out to the left of the controls. */
  header?: ReactNode;
  autoplayMs?: number;
  tone?: keyof typeof TONE_CLASSES;
  /** "header": controls beside the heading. "footer": heading full width, controls under the track. */
  controlsPosition?: "header" | "footer";
  /** Slide widths per breakpoint (flex-basis utilities). Defaults to 1.2 / 2.5 / 3.5 visible. */
  slideClassName?: string;
  /** Plural noun for the arrow labels: "Previous products". */
  itemsLabel?: string;
  /**
   * Makes the track itself a tab stop, so ← / → work even when slides hold no
   * links or buttons (e.g. testimonial cards).
   */
  focusableTrack?: boolean;
  className?: string;
  children: ReactNode;
}

/** Horizontal distance from the first slide to slide `index`. */
function offsetOf(track: HTMLElement, index: number): number {
  const first = track.children[0];
  const target = track.children[index];
  return first instanceof HTMLElement && target instanceof HTMLElement
    ? target.offsetLeft - first.offsetLeft
    : 0;
}

/**
 * Scroll-snap slide rail showing 1.2 / 2.5 / 3.5 slides (mobile / tablet /
 * desktop), so the peek of the next card signals there's more. Touch swipe is
 * native scrolling; arrows, autoplay and ← / → keys glide between slides with
 * an eased tween. A gold bar under the track tracks the scroll position.
 *
 * Autoplay rewinds to the start after the last slide and pauses on hover,
 * keyboard focus, when scrolled off-screen, and via the pause button
 * (WCAG 2.2.2). Under prefers-reduced-motion there is no autoplay and moves
 * jump instead of glide.
 */
export function Carousel({
  label,
  slideLabels,
  header,
  autoplayMs = 5000,
  tone = "ink",
  controlsPosition = "header",
  slideClassName = DEFAULT_SLIDE_CLASSES,
  itemsLabel = "products",
  focusableTrack = false,
  className,
  children,
}: CarouselProps) {
  const toneClasses = TONE_CLASSES[tone];
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<AnimationPlaybackControls | null>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  // Hydration-safe (false on the server), unlike framer-motion's useReducedMotion.
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isInView = useInView(rootRef, { amount: 0.3 });

  const slides = Children.toArray(children);
  const count = slides.length;
  const isScrollable = !(edges.atStart && edges.atEnd);
  const canAutoplay = isScrollable && !prefersReducedMotion;
  const isRunning = canAutoplay && isInView && !isUserPaused && !isHovered && !hasKeyboardFocus;

  /** Syncs edge state, the active slide and the progress bar with the scroll position. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= EDGE_TOLERANCE_PX;
    const atEnd = track.scrollLeft >= maxScroll - EDGE_TOLERANCE_PX;
    setEdges((prev) =>
      prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd },
    );

    let closest = 0;
    for (let i = 1; i < track.children.length; i++) {
      if (
        Math.abs(offsetOf(track, i) - track.scrollLeft) <
        Math.abs(offsetOf(track, closest) - track.scrollLeft)
      ) {
        closest = i;
      }
    }
    setActive(closest);

    const thumb = thumbRef.current;
    if (thumb && maxScroll > 0) {
      const visible = track.clientWidth / track.scrollWidth;
      const progress = track.scrollLeft / maxScroll;
      thumb.style.width = `${visible * 100}%`;
      thumb.style.transform = `translateX(${progress * (1 / visible - 1) * 100}%)`;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const stopScrollTween = useCallback(() => {
    scrollTween.current?.stop();
    scrollTween.current = null;
    if (trackRef.current) trackRef.current.style.scrollSnapType = "";
  }, []);

  useEffect(() => stopScrollTween, [stopScrollTween]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, track.children.length - 1));
      const target = Math.min(offsetOf(track, clamped), track.scrollWidth - track.clientWidth);
      stopScrollTween();

      if (prefersReducedMotion) {
        track.scrollLeft = target;
        return;
      }
      // Mandatory snap would pull every frame of the tween back to a slide; release it meanwhile.
      track.style.scrollSnapType = "none";
      scrollTween.current = animate(track.scrollLeft, target, {
        duration: SCROLL_SECONDS,
        ease: SCROLL_EASE,
        onUpdate: (value) => {
          track.scrollLeft = value;
        },
        onComplete: () => {
          track.style.scrollSnapType = "";
          scrollTween.current = null;
        },
      });
    },
    [prefersReducedMotion, stopScrollTween],
  );

  // Re-armed whenever the active slide changes, so manual moves restart the countdown.
  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setTimeout(() => scrollToIndex(edges.atEnd ? 0 : active + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [isRunning, active, edges.atEnd, autoplayMs, scrollToIndex]);

  const handlePointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === "mouse") setIsHovered(true);
  };

  const handleFocus = (event: FocusEvent) => {
    // Only keyboard focus pauses; clicking an arrow shouldn't stop autoplay for good.
    if (event.target.matches(":focus-visible")) setHasKeyboardFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
  };

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const slideElements = Array.from(event.currentTarget.children);
    const focused = slideElements.findIndex((el) => el.contains(document.activeElement));
    const next = Math.max(0, Math.min((focused === -1 ? active : focused) + step, count - 1));
    scrollToIndex(next);
    // Focus follows the move; preventScroll leaves the glide to the tween.
    slideElements[next]?.querySelector<HTMLElement>("a[href], button")?.focus({
      preventScroll: true,
    });
  };

  const headerBlock = header && (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="min-w-0"
    >
      {header}
    </motion.div>
  );

  const controls = isScrollable && (
    <div className="flex shrink-0 items-center gap-2">
      {canAutoplay && (
        <button
          type="button"
          aria-label={isUserPaused ? "Play carousel" : "Pause carousel"}
          onClick={() => setIsUserPaused((paused) => !paused)}
          className={cn(
            "mr-1 flex size-11 items-center justify-center rounded-full border transition-colors duration-300",
            toneClasses.pause,
          )}
        >
          {isUserPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
      )}
      <button
        type="button"
        aria-label={`Previous ${itemsLabel}`}
        disabled={edges.atStart}
        onClick={() => scrollToIndex(active - 1)}
        className={cn(ARROW_BASE, toneClasses.arrow)}
      >
        <ChevronRightIcon className="size-5 rotate-180" />
      </button>
      <button
        type="button"
        aria-label={`Next ${itemsLabel}`}
        disabled={edges.atEnd}
        onClick={() => scrollToIndex(active + 1)}
        className={cn(ARROW_BASE, toneClasses.arrow)}
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  );

  const progress = isScrollable && (
    <div
      aria-hidden="true"
      className={cn("relative h-0.5 overflow-hidden rounded-full", toneClasses.rail)}
    >
      <div
        ref={thumbRef}
        className={cn("absolute inset-y-0 left-0 rounded-full", toneClasses.thumb)}
      />
    </div>
  );

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
    >
      {controlsPosition === "header" ? (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          {headerBlock}
          {controls}
        </div>
      ) : (
        headerBlock
      )}

      {/* Bleeds to the screen edge below `lg`; the vertical padding keeps the hover lift and shadow unclipped. */}
      <motion.div
        ref={trackRef}
        onScroll={measure}
        onKeyDown={handleTrackKeyDown}
        onPointerDown={stopScrollTween}
        onWheel={stopScrollTween}
        tabIndex={focusableTrack ? 0 : undefined}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-5 overflow-x-auto overscroll-x-contain px-4 py-4 sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:-mx-4 lg:mt-4 lg:scroll-px-4 lg:px-4 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((child, index) => (
          <motion.div
            key={isValidElement(child) && child.key !== null ? child.key : index}
            variants={fadeUp}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${slideLabels[index] ?? ""}`}
            className={cn("flex shrink-0 snap-start", slideClassName)}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {controlsPosition === "header"
        ? progress && <div className="mt-4">{progress}</div>
        : isScrollable && (
            <div className="mt-4 flex items-center gap-6">
              <div className="flex-1">{progress}</div>
              {controls}
            </div>
          )}

      <p className="sr-only" aria-live={isRunning ? "off" : "polite"} aria-atomic="true">
        {`Showing ${active + 1} of ${count}: ${slideLabels[active] ?? ""}`}
      </p>
    </div>
  );
}
