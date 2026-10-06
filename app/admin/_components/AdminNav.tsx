"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Enquiries", href: "/admin/enquiries" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="border-border bg-surface flex w-60 flex-none flex-col border-r p-6">
      <div className="flex items-center gap-2">
        <Image
          src="/images/settle-logo-icon.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
        <p className="text-ink text-sm font-semibold">Settle Admin</p>
      </div>
      <nav aria-label="Admin" className="mt-8 flex flex-col gap-1">
        {ADMIN_LINKS.map((link) => {
          const isActive =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-ink/70 hover:bg-ink/5 hover:text-ink rounded px-3 py-2 text-sm font-medium",
                isActive && "bg-ink/5 text-ink",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="text-muted hover:bg-ink/5 hover:text-ink mt-auto rounded px-3 py-2 text-left text-sm font-medium"
      >
        Log out
      </button>
    </aside>
  );
}
