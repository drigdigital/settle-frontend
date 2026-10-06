import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/nav";
import { SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/shared/Container";

export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/settle-logo-icon.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <p className="text-ink mt-3 text-lg font-semibold">{SITE_CONFIG.name}</p>
          <p className="text-muted mt-3 max-w-xs text-sm">{SITE_CONFIG.tagline}</p>
          <p className="text-muted mt-6 text-sm">{SITE_CONFIG.contact.phone}</p>
          <a
            href={`mailto:${SITE_CONFIG.contact.salesEmail}`}
            className="text-muted hover:text-ink text-sm underline-offset-4 hover:underline"
          >
            {SITE_CONFIG.contact.salesEmail}
          </a>
        </div>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-ink text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-ink text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-border border-t py-6">
        <Container className="text-muted flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <p>Made in India</p>
        </Container>
      </div>
    </footer>
  );
}
