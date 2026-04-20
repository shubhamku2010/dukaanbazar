import { c as createLucideIcon, j as jsxRuntimeExports, d as Skeleton, b as Store, B as Button, L as Link, P as Package, e as ShoppingBag } from "./index-DuMvlbDW.js";
import { C as Card } from "./card-BedxeIyY.js";
import { P as ProductCard } from "./ProductCard-Do4APu01.js";
import { P as ProtectedRoute } from "./ProtectedRoute-Di-VNLU2.js";
import { u as useMyShop } from "./useMyShop-BQvdQDcl.js";
import { u as useMyOrders } from "./useOrders-BiLDs_ia.js";
import { b as useShopProducts } from "./useProducts-D_Oc7WaL.js";
import { a as formatDate } from "./formatting-RrZxb8cP.js";
import { P as Plus } from "./plus-BZbUiuhz.js";
import "./PriceDisplay-oEB5AOY-.js";
import "./badge-CEcpm3IJ.js";
import "./categories-3x0Ar9Yi.js";
import "./backend-B-zt_gHz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
function DashboardContent() {
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const { data: products, isLoading: productsLoading } = useShopProducts(
    shop == null ? void 0 : shop.id
  );
  const { data: orders, isLoading: ordersLoading } = useMyOrders();
  if (shopLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] });
  if (!shop) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "seller_dashboard.no_shop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-10 h-10 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Set up your shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-md mx-auto mb-6", children: "Create your DukaanBazar storefront to start listing products and reaching customers across India." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "seller_dashboard.create_shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/shop/edit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-4 h-4 mr-2" }),
        " Create My Shop"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "seller_dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-xl text-primary", children: shop.name.slice(0, 2).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: shop.name }),
            shop.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: shop.location }),
            shop.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-md line-clamp-2", children: shop.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              "data-ocid": "seller_dashboard.edit_shop_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/shop/edit", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5 mr-1" }),
                " Edit"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "sm",
              "data-ocid": "seller_dashboard.view_shop_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shops/$shopId", params: { shopId: shop.id.toString() }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 mr-1" }),
                " View"
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: (products == null ? void 0 : products.length) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Products" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: (orders == null ? void 0 : orders.length) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: (orders == null ? void 0 : orders.filter((o) => o.status === "Paid").length) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Completed" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "My Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            "data-ocid": "seller_dashboard.add_product_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/products/new", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
              " Add Product"
            ] })
          }
        )
      ] }),
      productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[3/4] rounded-xl" }, k)) }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "seller_dashboard.products_list",
          children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/seller/products/$id/edit",
                params: { id: product.id.toString() },
                className: "absolute top-2 right-2 bg-card/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow",
                "data-ocid": `seller_dashboard.edit_product.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5 text-foreground" })
              }
            )
          ] }, product.id.toString()))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 border-2 border-dashed border-border rounded-xl",
          "data-ocid": "seller_dashboard.products_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No products yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add your first product to start selling" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "mt-4",
                "data-ocid": "seller_dashboard.add_first_product_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/products/new", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                  " Add Product"
                ] })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Recent Orders" }),
      ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }) : orders && orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "seller_dashboard.orders_list", children: orders.slice(0, 5).map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-4 flex items-center gap-4",
          "data-ocid": `seller_dashboard.order.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                "Order #",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                order.buyerName,
                " · ",
                formatDate(order.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-medium px-2 py-1 rounded-full ${order.status === "Paid" ? "bg-accent/20 text-accent-foreground" : order.status === "Cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
                children: order.status
              }
            )
          ]
        },
        order.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-10 border-2 border-dashed border-border rounded-xl text-muted-foreground",
          "data-ocid": "seller_dashboard.orders_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No orders yet" })
          ]
        }
      )
    ] })
  ] });
}
function SellerDashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-6", children: "Seller Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) })
  ] });
}
export {
  SellerDashboardPage as default
};
