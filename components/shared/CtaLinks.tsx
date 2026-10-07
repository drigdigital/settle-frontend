import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import type { BannerLink } from "@/types/banner";

/**
 * Primary + secondary CTA pair for navy bands: a solid gold button whose arrow
 * slides right on hover, and a white outline button that fills white with
 * navy text. Stacked full width on phones (primary first), side by side from
 * `sm`. Pair with `focus-ring-gold` on the navy ancestor for visible focus.
 */
export function CtaLinks({
  primary,
  secondary,
  align = "start",
  className,
}: {
  primary: BannerLink;
  secondary?: BannerLink;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4",
        align === "center" && "sm:justify-center",
        className,
      )}
    >
      <Link
        href={primary.href}
        className={cn(buttonVariants({ variant: "gold", size: "lg" }), "group/cta")}
      >
        {primary.label}
        <ArrowRightIcon className="size-5 transition-transform duration-300 motion-safe:group-hover/cta:translate-x-1" />
      </Link>
      {secondary && (
        <Link
          href={secondary.href}
          className={cn(
            buttonVariants({ variant: "outlineInverse", size: "lg" }),
            "hover:text-navy",
          )}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
