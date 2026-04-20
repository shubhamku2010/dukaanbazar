import { c as createLucideIcon, j as jsxRuntimeExports, u as useParams, g as useNavigate, h as useQueryClient, r as reactExports, d as Skeleton, B as Button } from "./index-DuMvlbDW.js";
import { C as Card } from "./card-BedxeIyY.js";
import { I as Input } from "./input-BRbx0oKP.js";
import { L as Label, T as Textarea } from "./textarea-TwgKtf55.js";
import { I as ImageUpload, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./ImageUpload-CrH24HGi.js";
import { u as useActor, c as createActor } from "./backend-B-zt_gHz.js";
import { u as useMyShop, c as useMutation } from "./useMyShop-BQvdQDcl.js";
import { u as ue } from "./index-BdX8Dsq_.js";
import { P as ProtectedRoute } from "./ProtectedRoute-Di-VNLU2.js";
import { c as useProduct } from "./useProducts-D_Oc7WaL.js";
import { C as CATEGORIES } from "./categories-3x0Ar9Yi.js";
import { i as inrToPaise } from "./formatting-RrZxb8cP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function ProductEditForm() {
  const { id } = useParams({ from: "/seller/products/$id/edit" });
  const productId = BigInt(id);
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { data: shop } = useMyShop();
  const { data: product, isLoading } = useProduct(productId);
  const queryClient = useQueryClient();
  const [imageBlob, setImageBlob] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    price: "",
    stock: "1",
    category: CATEGORIES[0].key
  });
  reactExports.useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: (Number(product.price) / 100).toString(),
        stock: product.stock.toString(),
        category: product.category
      });
      setImageBlob(product.imageKey);
    }
  }, [product]);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const updateProduct = useMutation({
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
        imageKey: imageBlob
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["shop-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ue.success("Product updated!");
      navigate({ to: "/seller/dashboard" });
    },
    onError: (e) => ue.error(e.message || "Failed to update product")
  });
  const deleteProduct = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ue.success("Product deleted");
      navigate({ to: "/seller/dashboard" });
    },
    onError: () => ue.error("Failed to delete product")
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      ue.error("Product name is required");
      return;
    }
    updateProduct.mutate();
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-xl" });
  if (!product)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Product not found." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
      "data-ocid": "product_edit.form",
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
                "data-ocid": "product_edit.name_input"
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
                rows: 3,
                "data-ocid": "product_edit.description_input"
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
                  "data-ocid": "product_edit.price_input"
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
                  min: "0",
                  value: form.stock,
                  onChange: set("stock"),
                  "data-ocid": "product_edit.stock_input"
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "product_edit.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
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
                disabled: updateProduct.isPending,
                className: "flex-1",
                "data-ocid": "product_edit.save_button",
                children: updateProduct.isPending ? "Saving…" : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/seller/dashboard" }),
                "data-ocid": "product_edit.cancel_button",
                children: "Cancel"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "destructive",
              className: "w-full gap-2",
              onClick: () => deleteProduct.mutate(),
              disabled: deleteProduct.isPending,
              "data-ocid": "product_edit.delete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                deleteProduct.isPending ? "Deleting…" : "Delete Product"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function SellerProductEditPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-6", children: "Edit Product" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductEditForm, {}) })
  ] });
}
export {
  SellerProductEditPage as default
};
