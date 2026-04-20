import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import type { Category, ExternalBlob } from "../backend";
import { createActor } from "../backend";
import ImageUpload from "../components/ImageUpload";
import ProtectedRoute from "../components/ProtectedRoute";
import { useMyShop } from "../hooks/useMyShop";
import type { Product } from "../types";
import { CATEGORIES } from "../utils/categories";
import { inrToPaise } from "../utils/formatting";

function ProductNewForm() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { data: shop } = useMyShop();
  const queryClient = useQueryClient();

  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "1",
    category: CATEGORIES[0].key as Category,
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const addProduct = useMutation<Product, Error>({
    mutationFn: async () => {
      if (!actor || !shop) throw new Error("Not ready");
      if (!imageBlob) throw new Error("Please upload a product image");
      return actor.addProduct({
        shopId: shop.id,
        name: form.name,
        description: form.description,
        price: inrToPaise(form.price),
        stock: BigInt(Number.parseInt(form.stock) || 1),
        category: form.category,
        imageKey: imageBlob,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop-products", shop?.id?.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
      navigate({ to: "/seller/dashboard" });
    },
    onError: (e) => toast.error(e.message || "Failed to add product"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    addProduct.mutate();
  };

  if (!shop)
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Please create your shop first before adding products.</p>
        <Button asChild className="mt-4">
          <a href="/seller/shop/edit">Create Shop</a>
        </Button>
      </div>
    );

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      data-ocid="product_new.form"
    >
      {/* Image */}
      <div>
        <Label className="mb-2 block">Product Photo</Label>
        <ImageUpload
          value={imageBlob}
          onChange={(blob) => setImageBlob(blob)}
        />
      </div>

      {/* Fields */}
      <Card className="p-5 border border-border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Bandhani Silk Saree"
              data-ocid="product_new.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={set("description")}
              placeholder="Fabric, occasion, care instructions…"
              rows={3}
              data-ocid="product_new.description_input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="1"
                value={form.price}
                onChange={set("price")}
                placeholder="1500"
                data-ocid="product_new.price_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="1"
                value={form.stock}
                onChange={set("stock")}
                data-ocid="product_new.stock_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, category: v as Category }))
              }
            >
              <SelectTrigger data-ocid="product_new.category_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.key} value={cat.key}>
                    {cat.emoji} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={addProduct.isPending}
              className="flex-1"
              data-ocid="product_new.submit_button"
            >
              {addProduct.isPending ? "Adding…" : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/seller/dashboard" })}
              data-ocid="product_new.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function SellerProductNewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Add New Product
      </h1>
      <ProtectedRoute>
        <ProductNewForm />
      </ProtectedRoute>
    </div>
  );
}
