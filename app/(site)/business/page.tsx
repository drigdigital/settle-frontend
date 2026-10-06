import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Businesses",
  description:
    "Bulk and dealer furniture solutions from Settle Furnitures — hotels, offices, and institutions.",
  path: "/business",
});

const INDUSTRIES = [
  "Hospitality",
  "Corporate Offices",
  "Real Estate Developers",
  "Institutions",
  "Interior Firms",
];

const PROCESS = [
  {
    step: "1",
    title: "Share your requirement",
    body: "Tell us the space, quantity, and timeline.",
  },
  {
    step: "2",
    title: "Get a proposal",
    body: "We put together pricing and finish options for your review.",
  },
  {
    step: "3",
    title: "Confirm & produce",
    body: "Once approved, your order moves into production.",
  },
  { step: "4", title: "Delivery & install", body: "We coordinate delivery and on-site setup." },
];

export default function BusinessPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-ink max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Bulk furniture solutions for your business
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg">
          From single hotel rooms to full office fit-outs, our B2B team handles volume orders with
          dedicated pricing and a single point of contact.
        </p>
      </Container>

      <section className="border-border bg-surface py-section border-y">
        <Container>
          <SectionHeading eyebrow="Industries" title="Who we work with" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="border-border text-ink rounded-full border px-4 py-2 text-sm"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-section">
        <SectionHeading eyebrow="Process" title="How a B2B order works" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item) => (
            <div key={item.step}>
              <span className="text-accent text-sm font-medium">Step {item.step}</span>
              <h3 className="text-ink mt-2 text-base font-semibold">{item.title}</h3>
              <p className="text-muted mt-2 text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <section id="enquiry" className="border-border bg-surface py-section border-t">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Get in touch" title="Tell us about your project" />
          <EnquiryForm type="b2b" page="/business" className="mt-10" />
        </Container>
      </section>
    </>
  );
}
