import { j as jsxRuntimeExports, g as useNavigate, h as useQueryClient, r as reactExports, B as Button } from "./index-DuMvlbDW.js";
import { C as Card } from "./card-BedxeIyY.js";
import { I as Input } from "./input-BRbx0oKP.js";
import { L as Label, T as Textarea } from "./textarea-TwgKtf55.js";
import { I as ImageUpload, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./ImageUpload-CrH24HGi.js";
import { u as useActor, c as createActor } from "./backend-B-zt_gHz.js";
import { u as useMyShop, c as useMutation } from "./useMyShop-BQvdQDcl.js";
import { u as ue } from "./index-BdX8Dsq_.js";
import { P as ProtectedRoute } from "./ProtectedRoute-Di-VNLU2.js";
import { C as CATEGORIES } from "./categories-3x0Ar9Yi.js";
import { i as inrToPaise } from "./formatting-RrZxb8cP.js";
function ProductNewForm() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { data: shop } = useMyShop();
  const queryClient = useQueryClient();
  const [imageBlob, setImageBlob] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    price: "",
    stock: "1",
    category: CATEGORIES[0].key
  });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const addProduct = useMutation({
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
        imageKey: imageBlob
      });
    },
    onSuccess: () => {
      var _a;
      queryClient.invalidateQueries({
        queryKey: ["shop-products", (_a = shop == null ? void 0 : shop.id) == null ? void 0 : _a.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ue.success("Product added successfully!");
      navigate({ to: "/seller/dashboard" });
    },
    onError: (e) => ue.error(e.message || "Failed to add product")
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      ue.error("Product name is required");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      ue.error("Please enter a valid price");
      return;
    }
    addProduct.mutate();
  };
  if (!shop)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please create your shop first before adding products." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/seller/shop/edit", children: "Create Shop" }) })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
      "data-ocid": "product_new.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block", children: "Product Photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImageUpload,
            {
              value: imageBlob,
              onChange: (blob) => setImageBlob(blob)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Product Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                value: form.name,
                onChange: set("name"),
                placeholder: "e.g. Bandhani Silk Saree",
                "data-ocid": "product_new.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "desc", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "desc",
                value: form.description,
                onChange: set("description"),
                placeholder: "Fabric, occasion, care instructions…",
                rows: 3,
                "data-ocid": "product_new.description_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", children: "Price (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "price",
                  type: "number",
                  min: "1",
                  value: form.price,
                  onChange: set("price"),
                  placeholder: "1500",
                  "data-ocid": "product_new.price_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stock", children: "Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stock",
                  type: "number",
                  min: "1",
                  value: form.stock,
                  onChange: set("stock"),
                  "data-ocid": "product_new.stock_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "product_new.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: cat.key, children: [
                    cat.emoji,
                    " ",
                    cat.label
                  ] }, cat.key)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: addProduct.isPending,
                className: "flex-1",
                "data-ocid": "product_new.submit_button",
                children: addProduct.isPending ? "Adding…" : "Add Product"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/seller/dashboard" }),
                "data-ocid": "product_new.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function SellerProductNewPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-6", children: "Add New Product" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductNewForm, {}) })
  ] });
}
export {
  SellerProductNewPage as default
};
