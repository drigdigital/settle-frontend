import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  accent: "bg-accent text-accent-foreground hover:opacity-90",
} as const;

const SIZE_CLASSES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
