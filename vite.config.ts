import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    // Temporarily disable cloudflare plugin for client-side only mode
    // cloudflare({ viteEnvironment: { name: "client" } }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
