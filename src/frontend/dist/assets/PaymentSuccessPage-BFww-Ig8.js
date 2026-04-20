import { c as createLucideIcon, E as useSearch, r as reactExports, j as jsxRuntimeExports, d as Skeleton, B as Button, L as Link, P as Package, e as ShoppingBag } from "./index-DuMvlbDW.js";
import { u as useActor, c as createActor } from "./backend-B-zt_gHz.js";
import { b as buildWhatsAppLink } from "./formatting-RrZxb8cP.js";
import { m as motion } from "./proxy-Rb8B9lu2.js";
import { M as MessageCircle } from "./message-circle-DpsNwd5x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function parseSummaryFromResponse(response) {
  try {
    return JSON.parse(response);
  } catch {
    return null;
  }
}
function PaymentSuccessPage() {
  const { actor, isFetching } = useActor(createActor);
  const search = useSearch({ strict: false });
  const sessionId = search.session_id ?? "";
  const [status, setStatus] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [fetchError, setFetchError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!sessionId) {
      setFetchError("No session ID found.");
      setLoading(false);
      return;
    }
    if (!actor || isFetching) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await actor.getStripeSessionStatus(sessionId);
        if (!cancelled) {
          setStatus(result);
        }
      } catch {
        if (!cancelled) {
          setFetchError(
            "Could not retrieve payment details. Please check your orders."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching, sessionId]);
  const summary = (status == null ? void 0 : status.__kind__) === "completed" ? parseSummaryFromResponse(status.completed.response) : null;
  const waLink = (summary == null ? void 0 : summary.shopWhatsapp) ? buildWhatsAppLink(
    summary.shopWhatsapp,
    `Hi! I just placed an order (${summary.orderId || sessionId.slice(0, 12)}) on DukaanBazar. Please confirm my order.`
  ) : "";
  if (loading || !actor && !fetchError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-16 text-center",
        "data-ocid": "payment_success.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-full mx-auto mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56 mx-auto" })
        ]
      }
    );
  }
  if (fetchError || (status == null ? void 0 : status.__kind__) === "failed") {
    const errMsg = fetchError || ((status == null ? void 0 : status.__kind__) === "failed" ? status.failed.error : "Unknown error");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-16 text-center",
        "data-ocid": "payment_success.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Kuch Galat Hua" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 leading-relaxed", children: errMsg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "payment_success.orders_fallback_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: "Mere Orders Dekho" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-background min-h-screen py-12 px-4",
      "data-ocid": "payment_success.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-8",
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5, type: "spring", stiffness: 200 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground", children: "Payment Successful!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Aapka order confirm ho gaya. 🎉" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-card border border-border rounded-2xl p-7 mb-5",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.15 },
            "data-ocid": "payment_success.order_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Order Details" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-3.5", children: [
                (summary == null ? void 0 : summary.orderId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-mono font-semibold text-foreground", children: [
                    "#",
                    summary.orderId
                  ] })
                ] }),
                (summary == null ? void 0 : summary.productName) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between text-sm gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground flex-shrink-0", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium text-foreground text-right", children: summary.productName })
                ] }),
                (summary == null ? void 0 : summary.quantity) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium text-foreground", children: summary.quantity })
                ] }),
                (summary == null ? void 0 : summary.totalAmount) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm pt-3 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-foreground", children: "Total Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-xl font-semibold text-primary", children: summary.totalAmount })
                ] }),
                !summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                  "Session ID:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    sessionId.slice(0, 20),
                    "…"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        waLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-accent/8 border border-accent/20 rounded-2xl p-5 mb-5",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.25 },
            "data-ocid": "payment_success.seller_contact_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 leading-relaxed", children: "Seller se delivery ke baare mein confirm karein ya koi bhi sawaal karein:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  className: "gap-2 bg-accent hover:bg-accent/90 text-accent-foreground w-full",
                  "data-ocid": "payment_success.whatsapp_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink, target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    "Contact Seller on WhatsApp"
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col sm:flex-row gap-3",
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  className: "flex-1 gap-2",
                  "data-ocid": "payment_success.orders_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                    "Mere Orders Dekho"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
                  "data-ocid": "payment_success.browse_products_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                    "Aur Products Browse Karein"
                  ] })
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
export {
  PaymentSuccessPage as default
};
