import { getAllProducts } from "@/services/products";
import { getAdminSession } from "@/lib/requireAdmin";

export default async function AdminOverviewPage() {
  const [session, products] = await Promise.all([getAdminSession(), getAllProducts()]);

  const stats = [
    { label: "Active products", value: products.length },
    { label: "Featured products", value: products.filter((p) => p.isFeatured).length },
    {
      label: "Categories",
      value: new Set(
        products.map((p) => (typeof p.category === "string" ? p.category : p.category.slug)),
      ).size,
    },
  ];

  return (
    <div>
      <h1 className="text-ink text-2xl font-semibold">
        Welcome{session ? `, ${session.email}` : ""}
      </h1>
      <p className="text-muted mt-1 text-sm">Here&apos;s a snapshot of the catalog.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border-border bg-surface rounded-lg border p-6">
            <p className="text-ink text-3xl font-semibold">{stat.value}</p>
            <p className="text-muted mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
