import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  // Outline for dark or photographic backgrounds (e.g. the homepage hero).
  outlineInverse: "border border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  accent: "bg-accent text-accent-foreground hover:opacity-90",
  // For navy panels. Hover brightens (never darkens) so navy text stays above 4.5:1.
  gold: "bg-gold text-navy hover:bg-gold-light",
} as const;

const SIZE_CLASSES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;
export type ButtonSize = keyof typeof SIZE_CLASSES;

/**
 * Button styling as a class string, so links (`next/link`) that look like
 * buttons share exactly the same tokens as <Button>.
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: ButtonVariant; size?: ButtonSize } = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
