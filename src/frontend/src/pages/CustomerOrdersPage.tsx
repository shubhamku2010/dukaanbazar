import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { PackageOpen, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { OrderStatus } from "../backend";
import ProtectedRoute from "../components/ProtectedRoute";
import { useMyOrders } from "../hooks/useOrders";
import type { Order } from "../types";
import { formatDate, formatINR } from "../utils/formatting";

type FilterTab = "All" | OrderStatus;

const TABS: FilterTab[] = [
  "All",
  OrderStatus.Pending,
  OrderStatus.Paid,
  OrderStatus.Cancelled,
];

function statusBadge(status: OrderStatus) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    Pending: {
      label: "Pending",
      className: "bg-accent/15 text-accent border-accent/30 hover:bg-accent/20",
    },
    Paid: {
      label: "Paid",
      className:
        "bg-primary/10 text-primary border-primary/30 hover:bg-primary/15",
    },
    Cancelled: {
      label: "Cancelled",
      className:
        "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function OrderCard({
  order,
  index,
}: {
  order: Order;
  index: number;
}) {
  const orderId = `#DB${order.id.toString().padStart(5, "0")}`;
  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      data-ocid={`orders.item.${index + 1}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Order meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              {orderId}
            </span>
            {statusBadge(order.status)}
          </div>
          <Link
            to="/products/$productId"
            params={{ productId: order.productId.toString() }}
            className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
            data-ocid={`orders.product_link.${index + 1}`}
          >
            Product #{order.productId.toString()}
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Qty: {order.quantity.toString()} ·{" "}
            <Link
              to="/shops/$shopId"
              params={{ shopId: order.shopId.toString() }}
              className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              Shop #{order.shopId.toString()}
            </Link>
          </p>
        </div>

        {/* Amount + Date */}
        <div className="text-right flex-shrink-0">
          <p className="font-display text-lg font-semibold text-primary">
            {formatINR(order.totalAmount)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  );
}

function OrdersContent() {
  const { data: orders = [], isLoading } = useMyOrders();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  const countFor = (tab: FilterTab) =>
    tab === "All"
      ? orders.length
      : orders.filter((o) => o.status === tab).length;

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="orders.page"
    >
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            Mere Orders
          </h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground">
              {orders.length} order{orders.length !== 1 ? "s" : ""} total
            </p>
          )}
        </div>
        {!isLoading && orders.length > 0 && (
          <Badge
            variant="secondary"
            className="ml-auto text-sm font-semibold"
            data-ocid="orders.count_badge"
          >
            {orders.length}
          </Badge>
        )}
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 bg-muted/60 p-1 rounded-xl mb-6 overflow-x-auto"
        role="tablist"
        data-ocid="orders.filter.tab"
      >
        {TABS.map((tab) => {
          const count = countFor(tab);
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`orders.tab_${tab.toLowerCase()}`}
            >
              {tab}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <OrdersSkeleton />
      ) : filtered.length === 0 ? (
        <motion.div
          className="text-center py-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="orders.empty_state"
        >
          <PackageOpen className="w-14 h-14 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            {activeTab === "All"
              ? "Abhi koi order nahi"
              : `Koi ${activeTab} order nahi`}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            {activeTab === "All"
              ? "Aapne abhi tak koi order nahi kiya. Browse karein aur apni pasand ki cheez khareedein!"
              : "Is status ke orders abhi nahi hain."}
          </p>
          {activeTab === "All" && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              data-ocid="orders.browse_products_link"
            >
              <ShoppingBag className="w-4 h-4" />
              Products Browse Karein
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, idx) => (
            <OrderCard key={order.id.toString()} order={order} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomerOrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
