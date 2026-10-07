import Link from "next/link";
import { CardRail } from "@/components/shared/CardRail";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShowcaseCard } from "@/components/shared/ShowcaseCard";
import { ChevronRightIcon } from "@/components/ui/icons";
import { SHOWCASE_CONTENT, SHOWCASE_ITEMS } from "@/constants/showcase";

const CARD_SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw";

/** Homepage Section 03 — best-seller showcase. Content lives in constants/showcase.ts. */
export function FeaturedCollections() {
  const { heading, subtext, viewAll } = SHOWCASE_CONTENT;

  return (
    <section className="py-section-sm lg:py-section">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <SectionHeading title={heading} description={subtext} className="text-balance" />
          <Link
            href={viewAll.href}
            className="text-ink inline-flex shrink-0 items-center gap-1 text-sm font-medium underline underline-offset-4"
          >
            {viewAll.label}
            <ChevronRightIcon className="size-4" />
          </Link>
        </div>

        <CardRail
          label="Best sellers"
          itemLabels={SHOWCASE_ITEMS.map((item) => item.name)}
          className="mt-10"
        >
          {SHOWCASE_ITEMS.map((item) => (
            <ShowcaseCard key={item.id} item={item} sizes={CARD_SIZES} />
          ))}
        </CardRail>
      </Container>
    </section>
  );
}
