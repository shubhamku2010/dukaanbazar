import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import { PageSkeleton } from "./components/LoadingSkeletons";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ShopDetailPage = lazy(() => import("./pages/ShopDetailPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const SellerDashboardPage = lazy(() => import("./pages/SellerDashboardPage"));
const SellerShopEditPage = lazy(() => import("./pages/SellerShopEditPage"));
const SellerProductNewPage = lazy(() => import("./pages/SellerProductNewPage"));
const SellerProductEditPage = lazy(
  () => import("./pages/SellerProductEditPage"),
);
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CustomerOrdersPage = lazy(() => import("./pages/CustomerOrdersPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <Layout />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});
const shopDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shops/$shopId",
  component: ShopDetailPage,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetailPage,
});
const sellerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/dashboard",
  component: SellerDashboardPage,
});
const sellerShopEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/shop/edit",
  component: SellerShopEditPage,
});
const sellerProductNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/products/new",
  component: SellerProductNewPage,
});
const sellerProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/products/$id/edit",
  component: SellerProductEditPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: CustomerOrdersPage,
});
const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment/success",
  component: PaymentSuccessPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  shopDetailRoute,
  productDetailRoute,
  sellerDashboardRoute,
  sellerShopEditRoute,
  sellerProductNewRoute,
  sellerProductEditRoute,
  aboutRoute,
  contactRoute,
  ordersRoute,
  paymentSuccessRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
