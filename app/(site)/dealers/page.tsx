import { ClosingCta } from "@/components/shared/ClosingCta";
import { EnquirySection } from "@/components/shared/EnquirySection";
import { SplitHero } from "@/components/shared/SplitHero";
import { StorySplit } from "@/components/shared/StorySplit";
import {
  DEALER_APPLICATION,
  DEALER_BENEFITS,
  DEALERS_CTA,
  DEALERS_HERO,
  SUPPORT_STRUCTURE,
} from "@/constants/dealers";
import { DEPARTMENT_CONTACTS, SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { DealerBenefits } from "@/sections/dealers/DealerBenefits";

const DEALER_CONTACT = DEPARTMENT_CONTACTS.find(
  (contact) => contact.department === "dealer-relations",
);

export const metadata = buildMetadata({
  title: "Dealers & Partners",
  description:
    "Become a Settle Furniture dealer, backed by Vaanam Furniture's in-house manufacturing across Chera, Settle and Kov.",
  path: "/dealers",
});

/**
 * Dealers & Partners page: hero → dealer benefits → support structure →
 * application form → closing CTA, one focused screen each. [data-snap-page]
 * opts this page into gentle scroll snapping (app/globals.css). Content lives
 * in constants/dealers.ts.
 */
export default function DealersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Dealers & Partners", url: `${SITE_CONFIG.url}/dealers` },
  ]);

  return (
    <div data-snap-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <SplitHero
        content={DEALERS_HERO}
        breadcrumbLabel="Dealers & Partners"
        headingId="dealers-heading"
      />
      <DealerBenefits content={DEALER_BENEFITS} />
      <StorySplit story={SUPPORT_STRUCTURE} />
      {/* id="apply" is the target of the homepage partner band's "Become A Settle Partner" link. */}
      <EnquirySection
        id="apply"
        content={DEALER_APPLICATION}
        formType="dealer"
        page="/dealers"
        contact={DEALER_CONTACT}
      />
      <ClosingCta content={DEALERS_CTA} className="snap-start" />
    </div>
  );
}
