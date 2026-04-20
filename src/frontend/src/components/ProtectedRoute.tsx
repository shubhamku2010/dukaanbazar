import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, login, isLoggingIn } =
    useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Sign in to continue
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Yeh page dekhne ke liye please sign in karein.
            </p>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full"
            data-ocid="protected_route.sign_in_button"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoggingIn ? "Signing in…" : "Sign In with Internet Identity"}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
