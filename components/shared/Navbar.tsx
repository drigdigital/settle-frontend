"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRIMARY_NAV } from "@/constants/nav";
import { SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/shared/Container";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-border bg-paper/95 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/settle-logo-icon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="text-ink text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-ink/80 hover:text-ink text-sm font-medium transition-colors duration-200",
                  isActive && "text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="bg-primary text-primary-foreground hidden h-11 items-center justify-center rounded px-6 text-sm font-medium transition-opacity duration-200 hover:opacity-90 lg:inline-flex"
        >
          Enquire Now
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-ink p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-border overflow-hidden border-t lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ink hover:bg-ink/5 rounded px-2 py-3 text-base font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="bg-primary text-primary-foreground mt-2 rounded px-4 py-3 text-center text-sm font-medium"
              >
                Enquire Now
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
