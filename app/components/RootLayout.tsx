import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export function RootErrorBoundary() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}
