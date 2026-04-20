import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  Package,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type { StripeSessionStatus } from "../backend";
import { buildWhatsAppLink } from "../utils/formatting";

interface OrderSummary {
  productName: string;
  quantity: string;
  totalAmount: string;
  orderId: string;
  shopWhatsapp?: string;
  shopPhone?: string;
}

function parseSummaryFromResponse(response: string): OrderSummary | null {
  try {
    return JSON.parse(response) as OrderSummary;
  } catch {
    return null;
  }
}

export default function PaymentSuccessPage() {
  const { actor, isFetching } = useActor(createActor);
  // TanStack Router search params
  const search = useSearch({ strict: false }) as Record<string, string>;
  const sessionId = search.session_id ?? "";

  const [status, setStatus] = useState<StripeSessionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
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
            "Could not retrieve payment details. Please check your orders.",
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

  const summary =
    status?.__kind__ === "completed"
      ? parseSummaryFromResponse(status.completed.response)
      : null;

  const waLink = summary?.shopWhatsapp
    ? buildWhatsAppLink(
        summary.shopWhatsapp,
        `Hi! I just placed an order (${summary.orderId || sessionId.slice(0, 12)}) on DukaanBazar. Please confirm my order.`,
      )
    : "";

  if (loading || (!actor && !fetchError)) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-16 text-center"
        data-ocid="payment_success.loading_state"
      >
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
        <Skeleton className="h-8 w-48 mx-auto mb-3" />
        <Skeleton className="h-4 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-56 mx-auto" />
      </div>
    );
  }

  if (fetchError || status?.__kind__ === "failed") {
    const errMsg =
      fetchError ||
      (status?.__kind__ === "failed" ? status.failed.error : "Unknown error");
    return (
      <div
        className="max-w-lg mx-auto px-4 py-16 text-center"
        data-ocid="payment_success.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-3">
          Kuch Galat Hua
        </h1>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {errMsg}
        </p>
        <Button
          asChild
          variant="outline"
          data-ocid="payment_success.orders_fallback_link"
        >
          <Link to="/orders">Mere Orders Dekho</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="bg-background min-h-screen py-12 px-4"
      data-ocid="payment_success.page"
    >
      <div className="max-w-lg mx-auto">
        {/* Success icon */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground mt-2">
            Aapka order confirm ho gaya. 🎉
          </p>
        </motion.div>

        {/* Order summary card */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-7 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          data-ocid="payment_success.order_card"
        >
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Order Details
            </h2>
          </div>

          <dl className="space-y-3.5">
            {summary?.orderId && (
              <div className="flex items-center justify-between text-sm">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd className="font-mono font-semibold text-foreground">
                  #{summary.orderId}
                </dd>
              </div>
            )}
            {summary?.productName && (
              <div className="flex items-start justify-between text-sm gap-4">
                <dt className="text-muted-foreground flex-shrink-0">Product</dt>
                <dd className="font-medium text-foreground text-right">
                  {summary.productName}
                </dd>
              </div>
            )}
            {summary?.quantity && (
              <div className="flex items-center justify-between text-sm">
                <dt className="text-muted-foreground">Quantity</dt>
                <dd className="font-medium text-foreground">
                  {summary.quantity}
                </dd>
              </div>
            )}
            {summary?.totalAmount && (
              <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                <dt className="font-semibold text-foreground">Total Paid</dt>
                <dd className="font-display text-xl font-semibold text-primary">
                  {summary.totalAmount}
                </dd>
              </div>
            )}
            {!summary && (
              <div className="text-sm text-muted-foreground">
                Session ID:{" "}
                <span className="font-mono">{sessionId.slice(0, 20)}…</span>
              </div>
            )}
          </dl>
        </motion.div>

        {/* Seller contact */}
        {waLink && (
          <motion.div
            className="bg-accent/8 border border-accent/20 rounded-2xl p-5 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            data-ocid="payment_success.seller_contact_section"
          >
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Seller se delivery ke baare mein confirm karein ya koi bhi sawaal
              karein:
            </p>
            <Button
              asChild
              size="sm"
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground w-full"
              data-ocid="payment_success.whatsapp_button"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Contact Seller on WhatsApp
              </a>
            </Button>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            asChild
            variant="outline"
            className="flex-1 gap-2"
            data-ocid="payment_success.orders_button"
          >
            <Link to="/orders">
              <Package className="w-4 h-4" />
              Mere Orders Dekho
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            data-ocid="payment_success.browse_products_button"
          >
            <Link to="/products">
              <ShoppingBag className="w-4 h-4" />
              Aur Products Browse Karein
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
