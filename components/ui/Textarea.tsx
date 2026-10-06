import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, "aria-describedby": describedBy, id, rows = 4, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "border-border bg-surface text-ink placeholder:text-muted w-full resize-none rounded border px-4 py-3 text-sm",
          "focus-visible:border-accent transition-colors duration-200",
          error && "border-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
