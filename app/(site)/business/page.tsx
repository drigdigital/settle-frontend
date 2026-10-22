import { ClosingCta } from "@/components/shared/ClosingCta";
import { EnquirySection } from "@/components/shared/EnquirySection";
import { SplitHero } from "@/components/shared/SplitHero";
import {
  BUSINESS_CTA,
  BUSINESS_ENQUIRY,
  BUSINESS_HERO,
  PROCESS_WORKFLOW,
  WHO_WE_WORK_WITH,
  WHY_BUSINESSES,
} from "@/constants/business";
import { DEPARTMENT_CONTACTS, SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { BulkOrderSolutions } from "@/sections/business/BulkOrderSolutions";
import { ProcessWorkflow } from "@/sections/business/ProcessWorkflow";
import { WhoWeWorkWith } from "@/sections/business/WhoWeWorkWith";

const B2B_CONTACT = DEPARTMENT_CONTACTS.find((contact) => contact.department === "b2b");

const BUSINESS_TITLE = "For Businesses | Dealers, Distributors & Bulk Orders | Settle";

// `absolute` skips the root layout's "%s | Settle Furnitures" template so the approved title renders as written.
export const metadata = {
  ...buildMetadata({
    title: BUSINESS_TITLE,
    description:
      "Partner with Settle for dealer, distributor and bulk supply of wooden, modular and upholstered furniture.",
    path: "/business",
  }),
  title: { absolute: BUSINESS_TITLE },
};

/**
 * For Businesses page: hero → why Settle → who we work with → process → B2B
 * enquiry → closing CTA, one focused screen each. [data-snap-page] opts this
 * page into gentle scroll snapping (app/globals.css). Content lives in
 * constants/business.ts.
 */
export default function BusinessPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "For Businesses", url: `${SITE_CONFIG.url}/business` },
  ]);

  return (
    <div data-snap-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <SplitHero
        content={BUSINESS_HERO}
        breadcrumbLabel="For Businesses"
        headingId="business-heading"
      />
      <BulkOrderSolutions content={WHY_BUSINESSES} />
      <WhoWeWorkWith content={WHO_WE_WORK_WITH} />
      <ProcessWorkflow content={PROCESS_WORKFLOW} />
      <EnquirySection
        id="enquiry"
        content={BUSINESS_ENQUIRY}
        formType="b2b"
        page="/business"
        contact={B2B_CONTACT}
      />
      <ClosingCta content={BUSINESS_CTA} className="snap-start" />
    </div>
  );
}
