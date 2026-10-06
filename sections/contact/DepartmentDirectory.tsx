import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DEPARTMENT_CONTACTS } from "@/constants/site";

/**
 * Visually modeled on the About page's Leadership grid (circular badge,
 * centered name, subtext) — swapped for department name + email since a
 * contact directory doesn't need employee photos. Laid out as a single row
 * on larger screens so all five departments fit within one natural view.
 */
export function DepartmentDirectory() {
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Departments"
          title="Department-wise contact"
          description="Prefer to reach a specific team directly? Here's who to contact."
          className="mx-auto"
        />
        <div className="mt-10 grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:grid-cols-5">
          {DEPARTMENT_CONTACTS.map((dept) => (
            <div key={dept.department}>
              <div className="bg-accent/10 text-accent mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold">
                {dept.label.charAt(0)}
              </div>
              <p className="text-ink mt-3 font-medium">{dept.label}</p>
              <a
                href={`mailto:${dept.email}`}
                className="text-muted hover:text-ink text-sm underline-offset-4 hover:underline"
              >
                {dept.email}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
