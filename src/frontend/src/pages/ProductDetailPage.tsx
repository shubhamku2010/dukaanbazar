import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CreditCard,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Store,
} from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";
import CategoryBadge from "../components/CategoryBadge";
import { DetailSkeleton } from "../components/LoadingSkeletons";
import PriceDisplay from "../components/PriceDisplay";
import { useProduct } from "../hooks/useProducts";
import { useShop } from "../hooks/useShops";
import { buildWhatsAppLink, formatINR } from "../utils/formatting";

export default function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const id = BigInt(productId);

  const { data: product, isLoading } = useProduct(id);
  const { data: shop } = useShop(product?.shopId);
  const { actor } = useActor(createActor);

  const [quantity, setQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!product)
    return (
      <div className="text-center py-20" data-ocid="product_detail.not_found">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-display text-xl font-semibold text-foreground">
          Product not found
        </p>
      </div>
    );

  const imageUrl = product.imageKey.getDirectURL();
  const price = formatINR(product.price);
  const waMessage = shop
    ? `Hi! I'm interested in "${product.name}" priced at ${price} from your shop "${shop.name}" on DukaanBazar. Is it available?`
    : `Hi! I'm interested in "${product.name}" priced at ${price} on DukaanBazar.`;
  const waLink = shop?.whatsappNumber
    ? buildWhatsAppLink(shop.whatsappNumber, waMessage)
    : "";

  const handleStripeCheckout = async () => {
    if (!actor) return;
    setIsCheckingOut(true);
    try {
      const successUrl = `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = window.location.href;
      // price is stored in paise (1/100 rupee); Stripe expects cents
      // 1 INR = 100 paise, Stripe uses smallest currency unit (paise for INR)
      const priceInCents = product.price; // already in paise = cents for INR
      const items = [
        {
          productName: product.name,
          productDescription: product.description || product.name,
          currency: "inr",
          priceInCents,
          quantity: BigInt(quantity),
        },
      ];
      const sessionUrl = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
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

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-ocid="product_detail.page"
    >
      {/* Back */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        data-ocid="product_detail.back_link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted border border-border">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🥻
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <CategoryBadge category={product.category} size="md" />
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mt-3 leading-tight">
              {product.name}
            </h1>
            <PriceDisplay
              paise={product.price}
              size="xl"
              className="mt-2 block"
            />
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span
              className={
                product.stock > 0n ? "text-foreground" : "text-destructive"
              }
            >
              {product.stock > 0n
                ? `${product.stock.toString()} in stock`
                : "Out of stock"}
            </span>
          </div>

          {/* Shop info */}
          {shop && (
            <Link
              to="/shops/$shopId"
              params={{ shopId: shop.id.toString() }}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
              data-ocid="product_detail.shop_link"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-sm text-primary">
                {shop.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Store className="w-3 h-3" /> {shop.name}
                </p>
                {shop.location && (
                  <p className="text-xs text-muted-foreground truncate">
                    {shop.location}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Quantity selector */}
          {product.stock > 0n && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                Quantity:
              </span>
              <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQty}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
                  type="button"
                  aria-label="Decrease quantity"
                  data-ocid="product_detail.qty_decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="px-3 py-2 text-sm font-semibold text-foreground min-w-[2.5rem] text-center"
                  data-ocid="product_detail.qty_value"
                >
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  disabled={quantity >= 10 || quantity >= Number(product.stock)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
                  type="button"
                  aria-label="Increase quantity"
                  data-ocid="product_detail.qty_increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-2">
            {/* Stripe payment button */}
            {product.stock > 0n && (
              <Button
                size="lg"
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleStripeCheckout}
                disabled={isCheckingOut || !actor}
                data-ocid="product_detail.stripe_button"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    <span data-ocid="product_detail.stripe_loading_state">
                      Preparing checkout…
                    </span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" /> Pay Online with Stripe
                  </>
                )}
              </Button>
            )}

            {waLink && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full gap-2"
                data-ocid="product_detail.whatsapp_button"
              >
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" /> Order via WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
