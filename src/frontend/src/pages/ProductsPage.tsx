import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import type { Category } from "../backend";
import CategoryBadge from "../components/CategoryBadge";
import { ProductGridSkeleton } from "../components/LoadingSkeletons";
import ProductCard from "../components/ProductCard";
import { useProducts, useSearchProducts } from "../hooks/useProducts";
import { CATEGORIES } from "../utils/categories";

export default function ProductsPage() {
  const [keyword, setKeyword] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const isSearching = activeSearch !== "" || activeCategory !== null;

  const { data: allProducts, isLoading: allLoading } = useProducts();
  const { data: searchResults, isLoading: searchLoading } = useSearchProducts(
    activeSearch,
    activeCategory,
    null,
    null,
  );

  const products = isSearching ? searchResults : allProducts;
  const isLoading = isSearching ? searchLoading : allLoading;

  const handleSearch = () => {
    setActiveSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    setActiveSearch("");
    setActiveCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-1">
          Browse Products
        </h1>
        <p className="text-muted-foreground text-sm">
          Explore authentic Indian clothing from local boutiques
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-5" data-ocid="products.search_section">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search sarees, kurtis, lehengas…"
            className="pl-9"
            data-ocid="products.search_input"
          />
        </div>
        <Button onClick={handleSearch} data-ocid="products.search_button">
          Search
        </Button>
        {(activeSearch || activeCategory) && (
          <Button
            variant="ghost"
            onClick={handleClear}
            data-ocid="products.clear_filter_button"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        data-ocid="products.category_filters"
      >
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            activeCategory === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border text-foreground hover:border-primary/50"
          }`}
          data-ocid="products.filter.all"
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() =>
              setActiveCategory(activeCategory === cat.key ? null : cat.key)
            }
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground hover:border-primary/50"
            }`}
            data-ocid={`products.filter.${cat.label.toLowerCase()}`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : products && products.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="products.list"
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="products.empty_state"
        >
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-display font-semibold text-foreground text-lg">
            No products found
          </p>
          <p className="text-sm mt-1">
            Try a different search or browse all categories
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleClear}
            data-ocid="products.reset_button"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
