import { getAllCategories } from "@/services/categories";
import { NewProductForm } from "./NewProductForm";

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-ink text-2xl font-semibold">Add product</h1>
      <p className="text-muted mt-1 text-sm">
        Core fields only — image upload and size charts are configured after the DB is connected.
      </p>
      <NewProductForm categories={categories} />
    </div>
  );
}
