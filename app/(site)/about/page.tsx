import { ClosingCta } from "@/components/shared/ClosingCta";
import { SplitHero } from "@/components/shared/SplitHero";
import { StorySplit } from "@/components/shared/StorySplit";
import { ABOUT_CTA, ABOUT_HERO, ABOUT_STORIES } from "@/constants/about";
import { SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata, organizationSchema } from "@/lib/seo";

const ABOUT_TITLE = "About Settle | Made in Coimbatore";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: ABOUT_TITLE,
    description:
      "Settle makes everyday furniture for real homes: honest materials, clean design and fair prices, made in Coimbatore.",
    path: "/about",
  }),
  title: { absolute: ABOUT_TITLE },
};

/**
 * About page: hero → brand story → manufacturing → range → quality →
 * closing CTA, one focused screen each. [data-snap-page] opts this page into
 * gentle scroll snapping (app/globals.css). Content lives in constants/about.ts.
 */
export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "About", url: `${SITE_CONFIG.url}/about` },
  ]);

  return (
    <div data-snap-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <SplitHero content={ABOUT_HERO} breadcrumbLabel="About" headingId="about-heading" />
      {ABOUT_STORIES.map((story) => (
        <StorySplit key={story.id} story={story} />
      ))}
      <ClosingCta content={ABOUT_CTA} className="snap-start" />
    </div>
  );
}
