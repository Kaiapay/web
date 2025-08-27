import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomPrivy } from "~/hooks/use-custom-privy";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

function Spinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-2 border-white/20 border-t-[#BFF009] rounded-full animate-spin"></div>
    </div>
  );
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { authenticated, ready } = useCustomPrivy();

  useEffect(() => {
    if (!ready) return;

    if (requireAuth && !authenticated) {
      navigate(redirectTo || "/onboarding");
    } else if (!requireAuth && authenticated) {
      navigate(redirectTo || "/home");
    }
  }, [ready, authenticated, requireAuth, redirectTo, navigate]);

  if (
    !ready ||
    (requireAuth && !authenticated) ||
    (!requireAuth && authenticated)
  ) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
