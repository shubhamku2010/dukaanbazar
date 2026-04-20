import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Edit,
  ExternalLink,
  Package,
  Plus,
  ShoppingBag,
  Store,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProtectedRoute from "../components/ProtectedRoute";
import { useMyShop } from "../hooks/useMyShop";
import { useMyOrders } from "../hooks/useOrders";
import { useShopProducts } from "../hooks/useProducts";
import { formatDate } from "../utils/formatting";

function DashboardContent() {
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const { data: products, isLoading: productsLoading } = useShopProducts(
    shop?.id,
  );
  const { data: orders, isLoading: ordersLoading } = useMyOrders();

  if (shopLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );

  if (!shop) {
    return (
      <div className="text-center py-20" data-ocid="seller_dashboard.no_shop">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Store className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Set up your shop
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Create your DukaanBazar storefront to start listing products and
          reaching customers across India.
        </p>
        <Button asChild data-ocid="seller_dashboard.create_shop_button">
          <Link to="/seller/shop/edit">
            <Store className="w-4 h-4 mr-2" /> Create My Shop
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-ocid="seller_dashboard.page">
      {/* Shop Summary */}
      <Card className="p-5 border border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-xl text-primary">
              {shop.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {shop.name}
              </h2>
              {shop.location && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {shop.location}
                </p>
              )}
              {shop.description && (
                <p className="text-xs text-muted-foreground mt-1 max-w-md line-clamp-2">
                  {shop.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid="seller_dashboard.edit_shop_button"
            >
              <Link to="/seller/shop/edit">
                <Edit className="w-3.5 h-3.5 mr-1" /> Edit
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              data-ocid="seller_dashboard.view_shop_button"
            >
              <Link to="/shops/$shopId" params={{ shopId: shop.id.toString() }}>
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> View
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-primary">
              {products?.length ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Products</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-primary">
              {orders?.length ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Orders</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-primary">
              {orders?.filter((o) => o.status === "Paid").length ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
          </div>
        </div>
      </Card>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            My Products
          </h3>
          <Button
            asChild
            size="sm"
            data-ocid="seller_dashboard.add_product_button"
          >
            <Link to="/seller/products/new">
              <Plus className="w-4 h-4 mr-1" /> Add Product
            </Link>
          </Button>
        </div>
        {productsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {["s1", "s2", "s3", "s4"].map((k) => (
              <Skeleton key={k} className="aspect-[3/4] rounded-xl" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="seller_dashboard.products_list"
          >
            {products.map((product, i) => (
              <div key={product.id.toString()} className="relative group">
                <ProductCard product={product} index={i} />
                <Link
                  to="/seller/products/$id/edit"
                  params={{ id: product.id.toString() }}
                  className="absolute top-2 right-2 bg-card/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  data-ocid={`seller_dashboard.edit_product.${i + 1}`}
                >
                  <Edit className="w-3.5 h-3.5 text-foreground" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-12 border-2 border-dashed border-border rounded-xl"
            data-ocid="seller_dashboard.products_empty_state"
          >
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium text-foreground">No products yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first product to start selling
            </p>
            <Button
              asChild
              className="mt-4"
              data-ocid="seller_dashboard.add_first_product_button"
            >
              <Link to="/seller/products/new">
                <Plus className="w-4 h-4 mr-1" /> Add Product
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Recent Orders
        </h3>
        {ordersLoading ? (
          <Skeleton className="h-32 rounded-xl" />
        ) : orders && orders.length > 0 ? (
          <div className="space-y-2" data-ocid="seller_dashboard.orders_list">
            {orders.slice(0, 5).map((order, i) => (
              <Card
                key={order.id.toString()}
                className="p-4 flex items-center gap-4"
                data-ocid={`seller_dashboard.order.${i + 1}`}
              >
                <ShoppingBag className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Order #{order.id.toString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.buyerName} · {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    order.status === "Paid"
                      ? "bg-accent/20 text-accent-foreground"
                      : order.status === "Cancelled"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {order.status}
                </span>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-10 border-2 border-dashed border-border rounded-xl text-muted-foreground"
            data-ocid="seller_dashboard.orders_empty_state"
          >
            <ShoppingBag className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SellerDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Seller Dashboard
      </h1>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </div>
  );
}
