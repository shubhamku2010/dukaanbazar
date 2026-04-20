import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, D as DetailSkeleton, L as Link, P as Package, b as Store, B as Button } from "./index-DuMvlbDW.js";
import { u as useActor, c as createActor } from "./backend-B-zt_gHz.js";
import { C as CategoryBadge, P as PriceDisplay } from "./PriceDisplay-oEB5AOY-.js";
import { c as useProduct } from "./useProducts-D_Oc7WaL.js";
import { a as useShop } from "./useShops-GqlI3kCm.js";
import { f as formatINR, b as buildWhatsAppLink } from "./formatting-RrZxb8cP.js";
import { P as Plus } from "./plus-BZbUiuhz.js";
import { M as MessageCircle } from "./message-circle-DpsNwd5x.js";
import "./badge-CEcpm3IJ.js";
import "./categories-3x0Ar9Yi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const id = BigInt(productId);
  const { data: product, isLoading } = useProduct(id);
  const { data: shop } = useShop(product == null ? void 0 : product.shopId);
  const { actor } = useActor(createActor);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [isCheckingOut, setIsCheckingOut] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!product)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "product_detail.not_found", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: "Product not found" })
    ] });
  const imageUrl = product.imageKey.getDirectURL();
  const price = formatINR(product.price);
  const waMessage = shop ? `Hi! I'm interested in "${product.name}" priced at ${price} from your shop "${shop.name}" on DukaanBazar. Is it available?` : `Hi! I'm interested in "${product.name}" priced at ${price} on DukaanBazar.`;
  const waLink = (shop == null ? void 0 : shop.whatsappNumber) ? buildWhatsAppLink(shop.whatsappNumber, waMessage) : "";
  const handleStripeCheckout = async () => {
    if (!actor) return;
    setIsCheckingOut(true);
    try {
      const successUrl = `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = window.location.href;
      const priceInCents = product.price;
      const items = [
        {
          productName: product.name,
          productDescription: product.description || product.name,
          currency: "inr",
          priceInCents,
          quantity: BigInt(quantity)
        }
      ];
      const sessionUrl = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl
      );
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
    } finally {
      setIsCheckingOut(false);
    }
  };
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(10, q + 1));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      "data-ocid": "product_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6",
            "data-ocid": "product_detail.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to Products"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-2xl overflow-hidden bg-muted border border-border", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-6xl", children: "🥻" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: product.category, size: "md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground mt-3 leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceDisplay,
                {
                  paise: product.price,
                  size: "xl",
                  className: "mt-2 block"
                }
              )
            ] }),
            product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: product.stock > 0n ? "text-foreground" : "text-destructive",
                  children: product.stock > 0n ? `${product.stock.toString()} in stock` : "Out of stock"
                }
              )
            ] }),
            shop && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/shops/$shopId",
                params: { shopId: shop.id.toString() },
                className: "flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors",
                "data-ocid": "product_detail.shop_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-sm text-primary", children: shop.name.slice(0, 2).toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-3 h-3" }),
                      " ",
                      shop.name
                    ] }),
                    shop.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: shop.location })
                  ] })
                ]
              }
            ),
            product.stock > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Quantity:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-border rounded-lg overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: decreaseQty,
                    disabled: quantity <= 1,
                    className: "px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors",
                    type: "button",
                    "aria-label": "Decrease quantity",
                    "data-ocid": "product_detail.qty_decrease",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-3 py-2 text-sm font-semibold text-foreground min-w-[2.5rem] text-center",
                    "data-ocid": "product_detail.qty_value",
                    children: quantity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: increaseQty,
                    disabled: quantity >= 10 || quantity >= Number(product.stock),
                    className: "px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors",
                    type: "button",
                    "aria-label": "Increase quantity",
                    "data-ocid": "product_detail.qty_increase",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mt-2", children: [
              product.stock > 0n && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
                  onClick: handleStripeCheckout,
                  disabled: isCheckingOut || !actor,
                  "data-ocid": "product_detail.stripe_button",
                  children: isCheckingOut ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "product_detail.stripe_loading_state", children: "Preparing checkout…" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
                    " Pay Online with Stripe"
                  ] })
                }
              ),
              waLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  variant: "outline",
                  className: "w-full gap-2",
                  "data-ocid": "product_detail.whatsapp_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink, target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                    " Order via WhatsApp"
                  ] })
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductDetailPage as default
};
