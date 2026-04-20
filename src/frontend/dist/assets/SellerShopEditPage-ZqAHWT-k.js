import { j as jsxRuntimeExports, g as useNavigate, r as reactExports, d as Skeleton, b as Store, B as Button } from "./index-DuMvlbDW.js";
import { C as Card } from "./card-BedxeIyY.js";
import { I as Input } from "./input-BRbx0oKP.js";
import { L as Label, T as Textarea } from "./textarea-TwgKtf55.js";
import { u as ue } from "./index-BdX8Dsq_.js";
import { P as ProtectedRoute } from "./ProtectedRoute-Di-VNLU2.js";
import { u as useMyShop, a as useCreateShop, b as useUpdateShop } from "./useMyShop-BQvdQDcl.js";
import "./backend-B-zt_gHz.js";
function ShopEditForm() {
  const navigate = useNavigate();
  const { data: shop, isLoading } = useMyShop();
  const createShop = useCreateShop();
  const updateShop = useUpdateShop();
  const [form, setForm] = reactExports.useState({
    name: (shop == null ? void 0 : shop.name) ?? "",
    description: (shop == null ? void 0 : shop.description) ?? "",
    whatsappNumber: (shop == null ? void 0 : shop.whatsappNumber) ?? "",
    phone: (shop == null ? void 0 : shop.phone) ?? "",
    location: (shop == null ? void 0 : shop.location) ?? ""
  });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      ue.error("Shop name is required");
      return;
    }
    if (!form.whatsappNumber.trim()) {
      ue.error("WhatsApp number is required");
      return;
    }
    try {
      if (shop) {
        await updateShop.mutateAsync({ shopId: shop.id, input: form });
        ue.success("Shop updated successfully!");
      } else {
        await createShop.mutateAsync(form);
        ue.success("Shop created! Start adding products.");
      }
      navigate({ to: "/seller/dashboard" });
    } catch {
      ue.error("Something went wrong. Please try again.");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-xl" });
  const isPending = createShop.isPending || updateShop.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 border border-border", "data-ocid": "shop_edit.form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: shop ? "Edit Shop Details" : "Create Your Shop" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Shop Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: form.name,
              onChange: set("name"),
              placeholder: "e.g. Preeti's Loom",
              "data-ocid": "shop_edit.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: form.description,
              onChange: set("description"),
              placeholder: "Tell customers about your shop and what you sell…",
              rows: 3,
              "data-ocid": "shop_edit.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "whatsapp", children: "WhatsApp Number *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "whatsapp",
                value: form.whatsappNumber,
                onChange: set("whatsappNumber"),
                placeholder: "9876543210",
                "data-ocid": "shop_edit.whatsapp_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customers will use this to place orders" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                value: form.phone,
                onChange: set("phone"),
                placeholder: "9876543210",
                "data-ocid": "shop_edit.phone_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "location",
              value: form.location,
              onChange: set("location"),
              placeholder: "e.g. Jaipur, Rajasthan",
              "data-ocid": "shop_edit.location_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "flex-1",
            "data-ocid": "shop_edit.submit_button",
            children: isPending ? "Saving…" : shop ? "Save Changes" : "Create Shop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => navigate({ to: "/seller/dashboard" }),
            "data-ocid": "shop_edit.cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
}
function SellerShopEditPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-6", children: "Shop Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShopEditForm, {}) })
  ] });
}
export {
  SellerShopEditPage as default
};
