import { u as useParams, j as jsxRuntimeExports, D as DetailSkeleton, B as Button, a as ProductGridSkeleton } from "./index-DuMvlbDW.js";
import { P as ProductCard } from "./ProductCard-Do4APu01.js";
import { b as useShopProducts } from "./useProducts-D_Oc7WaL.js";
import { a as useShop } from "./useShops-GqlI3kCm.js";
import { b as buildWhatsAppLink } from "./formatting-RrZxb8cP.js";
import { M as MapPin } from "./map-pin-DZRB48yo.js";
import { M as MessageCircle } from "./message-circle-DpsNwd5x.js";
import { P as Phone } from "./phone-BmocqhcR.js";
import "./card-BedxeIyY.js";
import "./PriceDisplay-oEB5AOY-.js";
import "./badge-CEcpm3IJ.js";
import "./categories-3x0Ar9Yi.js";
import "./backend-B-zt_gHz.js";
function ShopDetailPage() {
  const { shopId } = useParams({ from: "/shops/$shopId" });
  const id = BigInt(shopId);
  const { data: shop, isLoading: shopLoading } = useShop(id);
  const { data: products, isLoading: productsLoading } = useShopProducts(id);
  if (shopLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!shop)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "shop_detail.not_found", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🏪" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: "Shop not found" })
    ] });
  const waLink = buildWhatsAppLink(
    shop.whatsappNumber,
    `Hi! I found your shop "${shop.name}" on DukaanBazar. I'd like to enquire about your products.`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "shop_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center font-display font-bold text-2xl text-primary flex-shrink-0", children: shop.name.slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: shop.name }),
        shop.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: shop.location })
        ] }),
        shop.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: shop.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-shrink-0", children: [
        shop.whatsappNumber && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "gap-2",
            "data-ocid": "shop_detail.whatsapp_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink, target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
              " WhatsApp"
            ] })
          }
        ),
        shop.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "gap-2",
            "data-ocid": "shop_detail.phone_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${shop.phone}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              " Call Shop"
            ] })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground mb-5", children: [
        "Products (",
        (products == null ? void 0 : products.length) ?? 0,
        ")"
      ] }),
      productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 8 }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "shop_detail.products_list",
          children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              shopName: shop.name,
              index: i
            },
            product.id.toString()
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "shop_detail.products_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "📦" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No products listed yet" })
          ]
        }
      )
    ] })
  ] });
}
export {
  ShopDetailPage as default
};
