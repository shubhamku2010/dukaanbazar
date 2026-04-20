import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import {
  DetailSkeleton,
  ProductGridSkeleton,
} from "../components/LoadingSkeletons";
import ProductCard from "../components/ProductCard";
import { useShopProducts } from "../hooks/useProducts";
import { useShop } from "../hooks/useShops";
import { buildWhatsAppLink } from "../utils/formatting";

export default function ShopDetailPage() {
  const { shopId } = useParams({ from: "/shops/$shopId" });
  const id = BigInt(shopId);

  const { data: shop, isLoading: shopLoading } = useShop(id);
  const { data: products, isLoading: productsLoading } = useShopProducts(id);

  if (shopLoading) return <DetailSkeleton />;
  if (!shop)
    return (
      <div className="text-center py-20" data-ocid="shop_detail.not_found">
        <p className="text-4xl mb-3">🏪</p>
        <p className="font-display text-xl font-semibold text-foreground">
          Shop not found
        </p>
      </div>
    );

  const waLink = buildWhatsAppLink(
    shop.whatsappNumber,
    `Hi! I found your shop "${shop.name}" on DukaanBazar. I'd like to enquire about your products.`,
  );

  return (
    <div data-ocid="shop_detail.page">
      {/* Shop Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center font-display font-bold text-2xl text-primary flex-shrink-0">
              {shop.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {shop.name}
              </h1>
              {shop.location && (
                <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-sm">{shop.location}</span>
                </div>
              )}
              {shop.description && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {shop.description}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-shrink-0">
              {shop.whatsappNumber && (
                <Button
                  asChild
                  className="gap-2"
                  data-ocid="shop_detail.whatsapp_button"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </Button>
              )}
              {shop.phone && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2"
                  data-ocid="shop_detail.phone_button"
                >
                  <a href={`tel:${shop.phone}`}>
                    <Phone className="w-4 h-4" /> Call Shop
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-5">
          Products ({products?.length ?? 0})
        </h2>
        {productsLoading ? (
          <ProductGridSkeleton count={8} />
        ) : products && products.length > 0 ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="shop_detail.products_list"
          >
            {products.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                shopName={shop.name}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="shop_detail.products_empty_state"
          >
            <p className="text-4xl mb-3">📦</p>
            <p className="font-medium">No products listed yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
