import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const VARIANT_CLASSES = {
  neutral: "bg-ink/5 text-ink",
  accent: "bg-accent/10 text-accent",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof VARIANT_CLASSES;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
