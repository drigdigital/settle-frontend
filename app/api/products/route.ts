import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { getAllProducts } from "@/services/products";
import { requireAdmin } from "@/lib/requireAdmin";
import { buildProductSlug } from "@/utils/slugify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getAllProducts({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });
  return NextResponse.json({ products });
}

const createProductSchema = z.object({
  name: z.string().trim().min(1),
  categorySlug: z.string().trim().min(1),
  categoryId: z.string().trim().min(1),
  description: z.string().trim().min(1),
  highlights: z.array(z.string()).default([]),
  finishes: z.array(z.string()).default([]),
  material: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]).default("draft"),
});

export async function POST(request: Request) {
  const session = await requireAdmin(["superadmin", "admin", "editor"]);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { categorySlug, categoryId, ...rest } = parsed.data;
  const slug = buildProductSlug(categorySlug, rest.name);

  const product = await Product.create({ ...rest, category: categoryId, slug });
  return NextResponse.json({ ok: true, id: String(product._id), slug }, { status: 201 });
}
