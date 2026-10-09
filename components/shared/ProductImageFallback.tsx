import { cn } from "@/utils/cn";

/**
 * Stand-in for a product with no photograph yet: a warm wood-tone panel with
 * the product's name, so a card never shows a broken image or a photo of a
 * different piece. Fills its positioned parent.
 */
export function ProductImageFallback({ name, className }: { name: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${name}: photo coming soon`}
      className={cn(
        // Teak → walnut keeps white text ≥ 4.7:1 (oak would be 2.8:1).
        "from-wood-teak to-wood-walnut absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br p-6 text-center",
        className,
      )}
    >
      <span className="text-paper text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {name}
      </span>
      <span className="text-paper mt-2 text-xs font-medium tracking-widest uppercase">
        Photo coming soon
      </span>
    </div>
  );
}
