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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Category, ExternalBlob } from "../backend";
import { createActor } from "../backend";
import ImageUpload from "../components/ImageUpload";
import ProtectedRoute from "../components/ProtectedRoute";
import { useMyShop } from "../hooks/useMyShop";
import { useProduct } from "../hooks/useProducts";
import type { Product } from "../types";
import { CATEGORIES } from "../utils/categories";
import { formatINR, inrToPaise } from "../utils/formatting";

function ProductEditForm() {
  const { id } = useParams({ from: "/seller/products/$id/edit" });
  const productId = BigInt(id);
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { data: shop } = useMyShop();
  const { data: product, isLoading } = useProduct(productId);
  const queryClient = useQueryClient();

  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "1",
    category: CATEGORIES[0].key as Category,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: (Number(product.price) / 100).toString(),
        stock: product.stock.toString(),
        category: product.category,
      });
      setImageBlob(product.imageKey);
    }
  }, [product]);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const updateProduct = useMutation<Product, Error>({
    mutationFn: async () => {
      if (!actor || !shop || !imageBlob)
        throw new Error("Missing required data");
      return actor.updateProduct(productId, {
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
        queryKey: ["product", productId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["shop-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated!");
      navigate({ to: "/seller/dashboard" });
    },
    onError: (e) => toast.error(e.message || "Failed to update product"),
  });

  const deleteProduct = useMutation<void, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
      navigate({ to: "/seller/dashboard" });
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    updateProduct.mutate();
  };

  if (isLoading) return <Skeleton className="h-96 rounded-xl" />;
  if (!product)
    return <p className="text-muted-foreground">Product not found.</p>;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      data-ocid="product_edit.form"
    >
      <div>
        <Label className="mb-2 block">Product Photo</Label>
        <ImageUpload
          value={imageBlob}
          onChange={(blob) => setImageBlob(blob)}
        />
      </div>

      <Card className="p-5 border border-border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={set("name")}
              data-ocid="product_edit.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={set("description")}
              rows={3}
              data-ocid="product_edit.description_input"
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
                data-ocid="product_edit.price_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={set("stock")}
                data-ocid="product_edit.stock_input"
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
              <SelectTrigger data-ocid="product_edit.category_select">
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
              disabled={updateProduct.isPending}
              className="flex-1"
              data-ocid="product_edit.save_button"
            >
              {updateProduct.isPending ? "Saving…" : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/seller/dashboard" })}
              data-ocid="product_edit.cancel_button"
            >
              Cancel
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="w-full gap-2"
            onClick={() => deleteProduct.mutate()}
            disabled={deleteProduct.isPending}
            data-ocid="product_edit.delete_button"
          >
            <Trash2 className="w-4 h-4" />
            {deleteProduct.isPending ? "Deleting…" : "Delete Product"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function SellerProductEditPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Edit Product
      </h1>
      <ProtectedRoute>
        <ProductEditForm />
      </ProtectedRoute>
    </div>
  );
}
