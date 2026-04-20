import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  Package,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  const handleSellerClick = () => {
    if (!isAuthenticated) {
      login();
    } else {
      navigate({ to: "/seller/dashboard" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Browse Products" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 group"
              data-ocid="nav.home_link"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-primary tracking-tight">
                DukaanBazar
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  activeProps={{ className: "text-primary font-semibold" }}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleSellerClick}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                data-ocid="nav.seller_link"
              >
                <Store className="w-4 h-4" />
                Sell on DukaanBazar
                <ChevronDown className="w-3 h-3" />
              </button>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  activeProps={{ className: "text-primary font-semibold" }}
                  data-ocid="nav.orders_link"
                >
                  <Package className="w-4 h-4" />
                  Mere Orders
                </Link>
              )}
            </nav>

            {/* Auth + Mobile */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAuth}
                disabled={isInitializing || isLoggingIn}
                variant={isAuthenticated ? "outline" : "default"}
                size="sm"
                data-ocid="nav.auth_button"
                className="hidden md:flex"
              >
                {isInitializing
                  ? "Loading…"
                  : isLoggingIn
                    ? "Signing in…"
                    : isAuthenticated
                      ? "Sign Out"
                      : "Sign In"}
              </Button>

              <button
                type="button"
                className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="nav.mobile_menu_toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden border-t border-border bg-card overflow-hidden transition-all duration-200",
            mobileMenuOpen ? "max-h-96" : "max-h-0",
          )}
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
                data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleSellerClick}
              className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
              data-ocid="nav.mobile_seller_link"
            >
              <Store className="w-4 h-4" /> Sell on DukaanBazar
            </button>
            {isAuthenticated && (
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
                data-ocid="nav.mobile_orders_link"
              >
                <Package className="w-4 h-4" /> Mere Orders
              </Link>
            )}
            <div className="pt-2 border-t border-border">
              <Button
                onClick={() => {
                  handleAuth();
                  setMobileMenuOpen(false);
                }}
                disabled={isInitializing || isLoggingIn}
                variant={isAuthenticated ? "outline" : "default"}
                size="sm"
                className="w-full"
                data-ocid="nav.mobile_auth_button"
              >
                {isInitializing
                  ? "Loading…"
                  : isLoggingIn
                    ? "Signing in…"
                    : isAuthenticated
                      ? "Sign Out"
                      : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <ShoppingBag className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-display text-base font-semibold text-primary">
                DukaanBazar
              </span>
            </div>

            {/* Footer links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <Link
                to="/about"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.about_link"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.contact_link"
              >
                Contact
              </Link>
              <Link
                to="/products"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.products_link"
              >
                Browse Products
              </Link>
              <Link
                to="/seller/dashboard"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.seller_link"
              >
                Sell on DukaanBazar
              </Link>
            </nav>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
