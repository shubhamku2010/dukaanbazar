import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCreateShop, useMyShop, useUpdateShop } from "../hooks/useMyShop";

function ShopEditForm() {
  const navigate = useNavigate();
  const { data: shop, isLoading } = useMyShop();
  const createShop = useCreateShop();
  const updateShop = useUpdateShop();

  const [form, setForm] = useState({
    name: shop?.name ?? "",
    description: shop?.description ?? "",
    whatsappNumber: shop?.whatsappNumber ?? "",
    phone: shop?.phone ?? "",
    location: shop?.location ?? "",
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Shop name is required");
      return;
    }
    if (!form.whatsappNumber.trim()) {
      toast.error("WhatsApp number is required");
      return;
    }

    try {
      if (shop) {
        await updateShop.mutateAsync({ shopId: shop.id, input: form });
        toast.success("Shop updated successfully!");
      } else {
        await createShop.mutateAsync(form);
        toast.success("Shop created! Start adding products.");
      }
      navigate({ to: "/seller/dashboard" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <Skeleton className="h-96 rounded-xl" />;

  const isPending = createShop.isPending || updateShop.isPending;

  return (
    <Card className="p-6 border border-border" data-ocid="shop_edit.form">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Store className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          {shop ? "Edit Shop Details" : "Create Your Shop"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Shop Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Preeti's Loom"
              data-ocid="shop_edit.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={set("description")}
              placeholder="Tell customers about your shop and what you sell…"
              rows={3}
              data-ocid="shop_edit.description_input"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp Number *</Label>
              <Input
                id="whatsapp"
                value={form.whatsappNumber}
                onChange={set("whatsappNumber")}
                placeholder="9876543210"
                data-ocid="shop_edit.whatsapp_input"
              />
              <p className="text-xs text-muted-foreground">
                Customers will use this to place orders
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={set("phone")}
                placeholder="9876543210"
                data-ocid="shop_edit.phone_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={set("location")}
              placeholder="e.g. Jaipur, Rajasthan"
              data-ocid="shop_edit.location_input"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            data-ocid="shop_edit.submit_button"
          >
            {isPending ? "Saving…" : shop ? "Save Changes" : "Create Shop"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/seller/dashboard" })}
            data-ocid="shop_edit.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default function SellerShopEditPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Shop Settings
      </h1>
      <ProtectedRoute>
        <ShopEditForm />
      </ProtectedRoute>
    </div>
  );
}
