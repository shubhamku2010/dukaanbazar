import { j as jsxRuntimeExports, L as Link, b as Store } from "./index-DuMvlbDW.js";
import { C as Card } from "./card-BedxeIyY.js";
import { C as CategoryBadge, P as PriceDisplay } from "./PriceDisplay-oEB5AOY-.js";
function ProductCard({
  product,
  shopName,
  index = 0
}) {
  const imageUrl = product.imageKey.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/products/$productId",
      params: { productId: product.id.toString() },
      "data-ocid": `product.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group overflow-hidden border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-card cursor-pointer h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🥻" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: product.category, size: "sm" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-1.5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground line-clamp-2 leading-snug", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paise: product.price, size: "md" }),
          shopName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-auto pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: shopName })
          ] })
        ] })
      ] })
    }
  );
}
export {
  ProductCard as P
};
