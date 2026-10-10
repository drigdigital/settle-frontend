import Image from "next/image";
import { cn } from "@/utils/cn";
import type { ClientLogo } from "@/types/testimonial";

/**
 * Infinite logo strip, pure CSS (no client JS). The track holds the list
 * twice and slides by exactly one copy; the second copy is aria-hidden and
 * unfocusable. Pauses on hover or keyboard focus, fades out at both edges.
 * Under prefers-reduced-motion it becomes one static, centred, wrapping row.
 * Logos sit greyscale at 60% and come to full colour on hover/focus.
 *
 * Needs roughly 6+ logos for the loop to stay seamless at 1440px; the edge
 * fade hides any small gap.
 */
export function LogoMarquee({
  logos,
  label,
  labelId,
  className,
}: {
  logos: ClientLogo[];
  /** Small caption above the strip. */
  label?: string;
  /** Lets a parent <section> point aria-labelledby at the caption. */
  labelId?: string;
  className?: string;
}) {
  if (logos.length === 0) return null;

  const renderList = (isDuplicate: boolean) => (
    <ul
      aria-hidden={isDuplicate || undefined}
      className={cn(
        "flex shrink-0 items-center gap-x-12 pr-12 lg:gap-x-16 lg:pr-16",
        "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:pr-0",
        isDuplicate && "motion-reduce:hidden",
      )}
    >
      {logos.map((logo) => {
        const image = (
          <Image
            src={logo.image.src}
            alt={isDuplicate ? "" : logo.name}
            width={logo.image.width}
            height={logo.image.height}
            className="h-8 w-auto opacity-60 grayscale transition-[filter,opacity] duration-300 group-focus-within/logo:opacity-100 group-focus-within/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 lg:h-10"
          />
        );
        return (
          <li key={logo.id} className="group/logo shrink-0">
            {logo.url ? (
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isDuplicate ? -1 : undefined}
                className="block rounded"
              >
                {image}
                {!isDuplicate && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            ) : (
              image
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={className}>
      {label && (
        <p id={labelId} className="text-navy/70 text-center text-sm font-medium tracking-wide">
          {label}
        </p>
      )}
      <div className="group mask-fade-x mt-6 overflow-hidden motion-reduce:mask-none">
        <div className="animate-marquee group-focus-within:animate-paused group-hover:animate-paused flex w-max motion-reduce:w-full motion-reduce:animate-none">
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </div>
  );
}
