import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, P as Package, B as Button, a as ProductGridSkeleton, S as ShopGridSkeleton } from "./index-DuMvlbDW.js";
import { P as ProductCard } from "./ProductCard-Do4APu01.js";
import { C as Card } from "./card-BedxeIyY.js";
import { M as MapPin } from "./map-pin-DZRB48yo.js";
import { u as useProducts } from "./useProducts-D_Oc7WaL.js";
import { u as useShops } from "./useShops-GqlI3kCm.js";
import { C as CATEGORIES } from "./categories-3x0Ar9Yi.js";
import { S as Sparkles, a as ShieldCheck } from "./sparkles-Bw29YzkD.js";
import "./PriceDisplay-oEB5AOY-.js";
import "./badge-CEcpm3IJ.js";
import "./formatting-RrZxb8cP.js";
import "./backend-B-zt_gHz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const shopColors = [
  "bg-primary/10 text-primary",
  "bg-accent/20 text-accent-foreground",
  "bg-secondary text-secondary-foreground"
];
function ShopCard({
  shop,
  productCount,
  index = 0
}) {
  const initials = shop.name.split(" ").slice(0, 2).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
  const colorClass = shopColors[index % shopColors.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/shops/$shopId",
      params: { shopId: shop.id.toString() },
      "data-ocid": `shop.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group p-4 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-card cursor-pointer h-full flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg flex-shrink-0 ${colorClass}`,
              children: initials
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors", children: shop.name }),
            shop.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: shop.location })
            ] })
          ] })
        ] }),
        shop.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 flex-1", children: shop.description }),
        productCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-auto pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            productCount,
            " products"
          ] })
        ] })
      ] })
    }
  );
}
function HomePage() {
  const { data: shops, isLoading: shopsLoading } = useShops();
  const { data: products, isLoading: productsLoading } = useProducts();
  const featuredProducts = (products == null ? void 0 : products.slice(0, 8)) ?? [];
  const featuredShops = (shops == null ? void 0 : shops.slice(0, 6)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        "India's Local Fashion Marketplace"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-4", children: [
        "Celebrate ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Everyday" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Elegance"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 leading-relaxed", children: "Discover authentic Indian wear crafted by artisans across the country. Sarees, kurtis, lehengas — straight from local boutiques to your doorstep." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "hero.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
          "Browse Collections ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            size: "lg",
            "data-ocid": "hero.sell_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/seller/dashboard", children: "Start Selling" })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products",
          className: "flex-shrink-0 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors",
          "data-ocid": "category.all_tab",
          children: "All"
        }
      ),
      CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/products",
          search: { category: cat.key },
          className: "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap",
          "data-ocid": `category.${cat.label.toLowerCase()}_tab`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.emoji }),
            " ",
            cat.label
          ]
        },
        cat.key
      ))
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "Featured Collections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "sm",
            "data-ocid": "home.view_all_products_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
              "View All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
            ] })
          }
        )
      ] }),
      productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 8 }) : featuredProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "home.products_list",
          children: featuredProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index: i
            },
            product.id.toString()
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "home.products_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🥻" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No products yet — be the first to list!" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-12 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "Explore Vibrant Shops" }) }),
      shopsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShopGridSkeleton, { count: 6 }) : featuredShops.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "home.shops_list",
          children: featuredShops.map((shop, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCard, { shop, index: i }, shop.id.toString()))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "home.shops_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🏪" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No shops yet — start your store today!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "mt-4",
                "data-ocid": "home.start_shop_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/seller/dashboard", children: "Open Your Shop" })
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 text-center", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" }),
        title: "Verified Sellers",
        desc: "Every shop is verified before listing products"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6" }),
        title: "Direct Ordering",
        desc: "Order via WhatsApp for personal attention"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }),
        title: "Authentic Craftsmanship",
        desc: "Handpicked products from skilled artisans"
      }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
        ]
      },
      item.title
    )) }) }) })
  ] });
}
export {
  HomePage as default
};
