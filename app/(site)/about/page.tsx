import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Vaanam Furniture Private Limited builds Settle Furnitures — seasoned Mahogany and Teak furniture crafted for lasting quality.",
  path: "/about",
});

const LEADERSHIP = [
  { name: "Leadership Name", role: "Founder & Managing Director" },
  { name: "Leadership Name", role: "Head of Manufacturing" },
  { name: "Leadership Name", role: "Head of Design" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="bg-ink/10 relative aspect-21/9 w-full overflow-hidden">
          <Image
            src="/images/placeholder.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <Container className="py-section">
        <h1 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Furniture that feels like home from day one.
        </h1>
        <p className="text-muted mt-6 max-w-2xl text-lg">
          Settle Furnitures began with a simple premise: furniture should be built to last, not
          replaced every few years. Every wardrobe, sofa and dining set we make starts with seasoned
          Mahogany or Teak and is finished by hand.
        </p>
      </Container>

      <section className="border-border bg-surface py-section border-y">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="bg-ink/10 relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src="/images/placeholder.svg"
              alt="Settle Furnitures manufacturing facility"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Manufacturing" title="Seasoned wood, built to spec" />
            <p className="text-muted mt-4">
              Our manufacturing floor combines traditional joinery with modern finishing, so every
              piece holds up to daily use without losing the warmth of handcrafted furniture.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-section">
        <SectionHeading eyebrow="Quality" title="Our quality commitment" />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Seasoned Hardwood",
              body: "Mahogany and Teak, seasoned to resist warping and pests.",
            },
            {
              title: "Hand-finished",
              body: "Every surface is sanded and finished by hand, not machine-only.",
            },
            {
              title: "Quality-checked",
              body: "Each piece is inspected before it leaves the workshop.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-ink text-base font-semibold">{item.title}</h3>
              <p className="text-muted mt-2 text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-border bg-surface py-section border-t">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The people behind Settle" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {LEADERSHIP.map((person) => (
              <div key={person.role}>
                <div className="bg-ink/10 relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/images/placeholder.svg"
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <p className="text-ink mt-4 font-medium">{person.name}</p>
                <p className="text-muted text-sm">{person.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
