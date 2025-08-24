import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  define: {
    global: "globalThis",
    "process.env": {},
    Buffer: ["buffer", "Buffer"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  resolve: {
    alias: {
      buffer: "buffer",
      process: "process/browser",
    },
  },
});
