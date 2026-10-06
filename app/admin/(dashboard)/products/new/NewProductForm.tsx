"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { FINISHES } from "@/constants/site";
import type { Category } from "@/types/product";

export function NewProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const categoryId = String(form.get("categoryId"));
    const category = categories.find((c) => c._id === categoryId);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          categoryId,
          categorySlug: category?.slug,
          description: form.get("description"),
          material: form.get("material"),
          status: form.get("status"),
          finishes: selectedFinishes,
          highlights: [],
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Could not create product");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-5">
      <div>
        <Label htmlFor="name">Product name</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="border-border bg-surface text-ink h-11 w-full rounded border px-4 text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} />
      </div>

      <div>
        <Label htmlFor="material">Material</Label>
        <Input id="material" name="material" placeholder="Seasoned Mahogany" />
      </div>

      <fieldset>
        <legend className="text-ink mb-2 text-sm font-medium">Finishes</legend>
        <div className="flex flex-wrap gap-3">
          {FINISHES.map((finish) => (
            <label key={finish} className="text-ink flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedFinishes.includes(finish)}
                onChange={(e) =>
                  setSelectedFinishes((prev) =>
                    e.target.checked ? [...prev, finish] : prev.filter((f) => f !== finish),
                  )
                }
                className="accent-accent h-4 w-4"
              />
              {finish}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          defaultValue="draft"
          className="border-border bg-surface text-ink h-11 w-full rounded border px-4 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error && (
        <p role="alert" className="text-danger text-sm">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Create product"}
      </Button>
    </form>
  );
}
