import { ClosingCta } from "@/components/shared/ClosingCta";
import { EnquirySection } from "@/components/shared/EnquirySection";
import { SplitHero } from "@/components/shared/SplitHero";
import {
  BULK_ORDER_SOLUTIONS,
  BUSINESS_CTA,
  BUSINESS_ENQUIRY,
  BUSINESS_HERO,
  INDUSTRIES_SERVED,
  PROCESS_WORKFLOW,
} from "@/constants/business";
import { DEPARTMENT_CONTACTS, SITE_CONFIG } from "@/constants/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { BulkOrderSolutions } from "@/sections/business/BulkOrderSolutions";
import { IndustriesServed } from "@/sections/business/IndustriesServed";
import { ProcessWorkflow } from "@/sections/business/ProcessWorkflow";

const B2B_CONTACT = DEPARTMENT_CONTACTS.find((contact) => contact.department === "b2b");

export const metadata = buildMetadata({
  title: "For Businesses",
  description:
    "Bulk furniture from Settle, made in-house in Coimbatore for retailers, dealers, hospitality buyers, builders and institutions across India.",
  path: "/business",
});

/**
 * For Businesses page: hero → bulk orders → industries → process → B2B
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
      <BulkOrderSolutions content={BULK_ORDER_SOLUTIONS} />
      <IndustriesServed content={INDUSTRIES_SERVED} />
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
