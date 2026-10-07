"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMotionMediaAllowed } from "@/hooks/useMotionMediaAllowed";
import { cn } from "@/utils/cn";
import type { BannerMedia } from "@/types/banner";

// Must stay shorter than the 9s `animate-ken-burns` in tailwind.config.ts, so a slide never stops zooming while visible.
const SLIDE_INTERVAL_MS = 7000;
const CROSSFADE_SECONDS = 1.2;
// Less than the layer's 3rem (48px) vertical overscan, so its edges never show.
const PARALLAX_PX = 40;
const SIZES = "(min-width: 1440px) 1376px, 100vw";

/**
 * Decorative media filling its positioned parent: a muted looping video, or
 * a crossfading Ken Burns gallery when there's no video, over a static poster.
 *
 * The poster is server-rendered and is all that shows on phones, Data Saver /
 * slow connections and under prefers-reduced-motion. Video and gallery mount
 * only once the banner is within 300px of the viewport, and stop whenever it
 * scrolls out of view. A corner button pauses them (WCAG 2.2.2). Subtle
 * scroll parallax, off under reduced motion.
 */
export function BackgroundMedia({ media, className }: { media: BannerMedia; className?: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motionAllowed = useMotionMediaAllowed();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isNear = useInView(layerRef, { once: true, margin: "300px" });
  const isVisible = useInView(layerRef);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  // Monotonic slide counter; the active slide is `cycle % slides.length`.
  const [cycle, setCycle] = useState(0);

  const slides = [media.poster, ...(media.gallery ?? [])];
  const mode = !motionAllowed
    ? "poster"
    : media.video
      ? "video"
      : slides.length > 1
        ? "gallery"
        : "poster";
  const isAnimated = mode !== "poster";
  const isRunning = isAnimated && isNear && isVisible && !isUserPaused;
  const active = cycle % slides.length;

  const { scrollYProgress } = useScroll({ target: layerRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-PARALLAX_PX, PARALLAX_PX]);

  useEffect(() => {
    if (mode !== "gallery" || !isRunning) return;
    const timer = window.setTimeout(() => setCycle((c) => c + 1), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [mode, isRunning, cycle]);

  // Re-runs once the <video> mounts (mode/isNear), then on every play/pause change.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isRunning) {
      // The browser may still refuse (e.g. iOS Low Power Mode); the poster simply stays.
      video.play().catch(() => setIsVideoReady(false));
    } else {
      video.pause();
    }
  }, [isRunning, mode, isNear]);

  return (
    <>
      <div
        ref={layerRef}
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      >
        <motion.div
          className="absolute inset-x-0 -inset-y-12"
          style={{ y: prefersReducedMotion ? 0 : parallaxY }}
        >
          <Image
            src={media.poster.src}
            alt=""
            fill
            sizes={SIZES}
            className="object-cover"
            style={{ objectPosition: media.poster.objectPosition }}
          />

          {mode === "gallery" &&
            isNear &&
            slides.map((slide, index) => {
              // Changes each time this slide comes round again, remounting it so the zoom restarts at 1.
              const pass = Math.floor((cycle - index) / slides.length);
              return (
                <motion.div
                  key={`${index}-${slide.src}`}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: index === active ? 1 : 0 }}
                  transition={{ duration: CROSSFADE_SECONDS, ease: "easeInOut" }}
                >
                  <div
                    key={pass}
                    className="animate-ken-burns absolute inset-0"
                    style={{ animationPlayState: isRunning ? "running" : "paused" }}
                  >
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      sizes={SIZES}
                      className="object-cover"
                      style={{ objectPosition: slide.objectPosition }}
                    />
                  </div>
                </motion.div>
              );
            })}

          {mode === "video" && isNear && media.video && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setIsVideoReady(true)}
              className={cn(
                "absolute inset-0 size-full object-cover transition-opacity duration-700",
                isVideoReady ? "opacity-100" : "opacity-0",
              )}
              style={{ objectPosition: media.poster.objectPosition }}
            >
              {media.video.webm && <source src={media.video.webm} type="video/webm" />}
              <source src={media.video.mp4} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>

      {isAnimated && (
        <button
          type="button"
          aria-label={`${isUserPaused ? "Play" : "Pause"} background ${mode === "video" ? "video" : "slideshow"}`}
          onClick={() => setIsUserPaused((paused) => !paused)}
          className="border-paper/30 bg-navy/70 text-paper hover:bg-navy/90 absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200"
        >
          {isUserPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
      )}
    </>
  );
}
