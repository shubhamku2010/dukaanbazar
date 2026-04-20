import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, e as ShoppingBag, L as Link, d as Skeleton } from "./index-DuMvlbDW.js";
import { B as Badge } from "./badge-CEcpm3IJ.js";
import { O as OrderStatus } from "./backend-B-zt_gHz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-Di-VNLU2.js";
import { u as useMyOrders } from "./useOrders-BiLDs_ia.js";
import { f as formatINR, a as formatDate } from "./formatting-RrZxb8cP.js";
import { m as motion } from "./proxy-Rb8B9lu2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
const PackageOpen = createLucideIcon("package-open", __iconNode);
const TABS = [
  "All",
  OrderStatus.Pending,
  OrderStatus.Paid,
  OrderStatus.Cancelled
];
function statusBadge(status) {
  const map = {
    Pending: {
      label: "Pending",
      className: "bg-accent/15 text-accent border-accent/30 hover:bg-accent/20"
    },
    Paid: {
      label: "Paid",
      className: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/15"
    },
    Cancelled: {
      label: "Cancelled",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15"
    }
  };
  const s = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.className}`,
      children: s.label
    }
  );
}
function OrderCard({
  order,
  index
}) {
  const orderId = `#DB${order.id.toString().padStart(5, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.06 },
      "data-ocid": `orders.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-muted-foreground", children: orderId }),
            statusBadge(order.status)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products/$productId",
              params: { productId: order.productId.toString() },
              className: "font-display text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1",
              "data-ocid": `orders.product_link.${index + 1}`,
              children: [
                "Product #",
                order.productId.toString()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Qty: ",
            order.quantity.toString(),
            " ·",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/shops/$shopId",
                params: { shopId: order.shopId.toString() },
                className: "hover:text-foreground transition-colors underline-offset-2 hover:underline",
                children: [
                  "Shop #",
                  order.shopId.toString()
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-primary", children: formatINR(order.totalAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(order.createdAt) })
        ] })
      ] })
    }
  );
}
function OrdersSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) });
}
function OrdersContent() {
  const { data: orders = [], isLoading } = useMyOrders();
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const filtered = activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);
  const countFor = (tab) => tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "orders.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight", children: "Mere Orders" }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              orders.length,
              " order",
              orders.length !== 1 ? "s" : "",
              " total"
            ] })
          ] }),
          !isLoading && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "ml-auto text-sm font-semibold",
              "data-ocid": "orders.count_badge",
              children: orders.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-muted/60 p-1 rounded-xl mb-6 overflow-x-auto",
            role: "tablist",
            "data-ocid": "orders.filter.tab",
            children: TABS.map((tab) => {
              const count = countFor(tab);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeTab === tab,
                  onClick: () => setActiveTab(tab),
                  className: `flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `orders.tab_${tab.toLowerCase()}`,
                  children: [
                    tab,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                        children: count
                      }
                    )
                  ]
                },
                tab
              );
            })
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center py-16 px-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            "data-ocid": "orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { className: "w-14 h-14 text-muted-foreground/50 mx-auto mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: activeTab === "All" ? "Abhi koi order nahi" : `Koi ${activeTab} order nahi` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-sm mx-auto", children: activeTab === "All" ? "Aapne abhi tak koi order nahi kiya. Browse karein aur apni pasand ki cheez khareedein!" : "Is status ke orders abhi nahi hain." }),
              activeTab === "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/products",
                  className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors",
                  "data-ocid": "orders.browse_products_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                    "Products Browse Karein"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: idx }, order.id.toString())) })
      ]
    }
  );
}
function CustomerOrdersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersContent, {}) });
}
export {
  CustomerOrdersPage as default
};
