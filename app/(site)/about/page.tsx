import { ClosingCta } from "@/components/shared/ClosingCta";
import { SplitHero } from "@/components/shared/SplitHero";
import { StorySplit } from "@/components/shared/StorySplit";
import { ABOUT_CTA, ABOUT_HERO, ABOUT_LEADERSHIP, ABOUT_STORIES } from "@/constants/about";
import { SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata, organizationSchema } from "@/lib/seo";
import { AboutLeadership } from "@/sections/about/AboutLeadership";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Settle Furniture is a Vaanam Furniture brand, part of the Martin Group, Coimbatore: furniture made in-house for real, lived-in homes across South India.",
  path: "/about",
});

/**
 * About page: hero → brand story → manufacturing → quality → leadership →
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
      <AboutLeadership content={ABOUT_LEADERSHIP} />
      <ClosingCta content={ABOUT_CTA} className="snap-start" />
    </div>
  );
}
