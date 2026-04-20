import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, a as ProductGridSkeleton } from "./index-DuMvlbDW.js";
import { I as Input } from "./input-BRbx0oKP.js";
import { P as ProductCard } from "./ProductCard-Do4APu01.js";
import { u as useProducts, a as useSearchProducts } from "./useProducts-D_Oc7WaL.js";
import { C as CATEGORIES } from "./categories-3x0Ar9Yi.js";
import "./card-BedxeIyY.js";
import "./PriceDisplay-oEB5AOY-.js";
import "./badge-CEcpm3IJ.js";
import "./formatting-RrZxb8cP.js";
import "./backend-B-zt_gHz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function ProductsPage() {
  const [keyword, setKeyword] = reactExports.useState("");
  const [activeSearch, setActiveSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState(null);
  const isSearching = activeSearch !== "" || activeCategory !== null;
  const { data: allProducts, isLoading: allLoading } = useProducts();
  const { data: searchResults, isLoading: searchLoading } = useSearchProducts(
    activeSearch,
    activeCategory,
    null,
    null
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-1", children: "Browse Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Explore authentic Indian clothing from local boutiques" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-5", "data-ocid": "products.search_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: keyword,
            onChange: (e) => setKeyword(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSearch(),
            placeholder: "Search sarees, kurtis, lehengas…",
            className: "pl-9",
            "data-ocid": "products.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSearch, "data-ocid": "products.search_button", children: "Search" }),
      (activeSearch || activeCategory) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          onClick: handleClear,
          "data-ocid": "products.clear_filter_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap gap-2 mb-6",
        "data-ocid": "products.category_filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(null),
              className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeCategory === null ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary/50"}`,
              "data-ocid": "products.filter.all",
              children: "All"
            }
          ),
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(activeCategory === cat.key ? null : cat.key),
              className: `flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeCategory === cat.key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary/50"}`,
              "data-ocid": `products.filter.${cat.label.toLowerCase()}`,
              children: [
                cat.emoji,
                " ",
                cat.label
              ]
            },
            cat.key
          ))
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 12 }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
        "data-ocid": "products.list",
        children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product,
            index: i
          },
          product.id.toString()
        ))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20 text-muted-foreground",
        "data-ocid": "products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Try a different search or browse all categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "mt-4",
              onClick: handleClear,
              "data-ocid": "products.reset_button",
              children: "Clear Filters"
            }
          )
        ]
      }
    )
  ] });
}
export {
  ProductsPage as default
};
