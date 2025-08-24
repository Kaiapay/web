import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import Providers from "./providers";
import "./app.css";

// Create the router instance
const router = createBrowserRouter(routes);

// Get the root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <Providers>
      <RouterProvider 
        router={router} 
        fallbackElement={
          <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="text-white">Loading...</div>
          </div>
        } 
      />
    </Providers>
  </StrictMode>
);