import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <Container className="py-section flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-ink text-3xl font-semibold">Page not found</h1>
      <p className="text-muted mt-3 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/collections"
        className="bg-primary text-primary-foreground mt-8 inline-flex h-11 items-center rounded px-6 text-sm font-medium hover:opacity-90"
      >
        Browse Collections
      </Link>
    </Container>
  );
}
