import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

/** "Looking for a dealer near you?" — points visitors to the dealer page above the closing CTA. */
export function DealerPrompt() {
  return (
    <section className="border-border bg-linen py-section-sm border-t">
      <Container className="text-center">
        <SectionHeading
          align="center"
          title="Looking for a dealer near you?"
          description="See every Settle dealer on the map."
          className="mx-auto"
        />
        <Link
          href="/dealers"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6")}
        >
          Find A Dealer
        </Link>
      </Container>
    </section>
  );
}
