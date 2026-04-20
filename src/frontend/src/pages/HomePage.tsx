import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import {
  ProductGridSkeleton,
  ShopGridSkeleton,
} from "../components/LoadingSkeletons";
import ProductCard from "../components/ProductCard";
import ShopCard from "../components/ShopCard";
import { useProducts } from "../hooks/useProducts";
import { useShops } from "../hooks/useShops";
import { CATEGORIES } from "../utils/categories";

export default function HomePage() {
  const { data: shops, isLoading: shopsLoading } = useShops();
  const { data: products, isLoading: productsLoading } = useProducts();

  const featuredProducts = products?.slice(0, 8) ?? [];
  const featuredShops = shops?.slice(0, 6) ?? [];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              India's Local Fashion Marketplace
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-4">
              Celebrate <span className="text-primary">Everyday</span>
              <br />
              Elegance
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Discover authentic Indian wear crafted by artisans across the
              country. Sarees, kurtis, lehengas — straight from local boutiques
              to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" data-ocid="hero.browse_button">
                <Link to="/products">
                  Browse Collections <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-ocid="hero.sell_button"
              >
                <Link to="/seller/dashboard">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Link
              to="/products"
              className="flex-shrink-0 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              data-ocid="category.all_tab"
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                to="/products"
                search={{ category: cat.key }}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap"
                data-ocid={`category.${cat.label.toLowerCase()}_tab`}
              >
                <span>{cat.emoji}</span> {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Featured Collections
            </h2>
            <Button
              asChild
              variant="ghost"
              size="sm"
              data-ocid="home.view_all_products_link"
            >
              <Link to="/products">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : featuredProducts.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="home.products_list"
            >
              {featuredProducts.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="home.products_empty_state"
            >
              <p className="text-4xl mb-3">🥻</p>
              <p className="font-medium">
                No products yet — be the first to list!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Shops */}
      <section className="bg-muted/30 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Explore Vibrant Shops
            </h2>
          </div>
          {shopsLoading ? (
            <ShopGridSkeleton count={6} />
          ) : featuredShops.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="home.shops_list"
            >
              {featuredShops.map((shop, i) => (
                <ShopCard key={shop.id.toString()} shop={shop} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="home.shops_empty_state"
            >
              <p className="text-4xl mb-3">🏪</p>
              <p className="font-medium">
                No shops yet — start your store today!
              </p>
              <Button
                asChild
                className="mt-4"
                data-ocid="home.start_shop_button"
              >
                <Link to="/seller/dashboard">Open Your Shop</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-background py-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Verified Sellers",
                desc: "Every shop is verified before listing products",
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "Direct Ordering",
                desc: "Order via WhatsApp for personal attention",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Authentic Craftsmanship",
                desc: "Handpicked products from skilled artisans",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2 p-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
