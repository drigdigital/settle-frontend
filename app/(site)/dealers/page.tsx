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
import { DEALER_LOCATOR, DEALERS } from "@/constants/dealerLocator";
import { DEPARTMENT_CONTACTS, SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { DealerBenefits } from "@/sections/dealers/DealerBenefits";
import { DealerLocator } from "@/sections/dealers/DealerLocator";

const DEALER_CONTACT = DEPARTMENT_CONTACTS.find(
  (contact) => contact.department === "dealer-relations",
);

const DEALERS_TITLE = "Become a Settle Partner | Find a Dealer";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: DEALERS_TITLE,
    description: "Join the Settle dealer network, or find a Settle dealer near you.",
    path: "/dealers",
  }),
  title: { absolute: DEALERS_TITLE },
};

/**
 * Dealers & Partners page: hero → dealer benefits → support structure →
 * application form → dealer locator → closing CTA, one focused screen each. [data-snap-page]
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
      {/* id="find-dealer" is the anchor for "Find A Dealer" links. */}
      <DealerLocator id="find-dealer" content={DEALER_LOCATOR} dealers={DEALERS} />
      <ClosingCta content={DEALERS_CTA} className="snap-start" />
    </div>
  );
}
