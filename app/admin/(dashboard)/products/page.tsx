import Link from "next/link";
import { getAllProducts } from "@/services/products";
import { formatPrice } from "@/utils/formatPrice";
import { Badge } from "@/components/ui/Badge";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-ink text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary text-primary-foreground inline-flex h-10 items-center rounded px-4 text-sm font-medium hover:opacity-90"
        >
          Add product
        </Link>
      </div>

      <div className="border-border bg-surface mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="border-border text-muted border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-border border-b last:border-0">
                <td className="text-ink px-4 py-3">{product.name}</td>
                <td className="text-muted px-4 py-3">
                  {typeof product.category === "string" ? product.category : product.category.name}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={product.status === "active" ? "accent" : "neutral"}>
                    {product.status}
                  </Badge>
                </td>
                <td className="text-muted px-4 py-3">{formatPrice(product.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
