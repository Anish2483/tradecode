// Vite SPA config for GitHub Pages deployment
// Uses standard Vite + TanStack Router (no SSR/server needed for static hosting)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tsconfigPaths(),
  ],
  // GitHub Pages serves from /tradecode/ (repo name)
  base: "/tradecode/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          motion: ["framer-motion"],
          ui: ["lucide-react"],
        },
      },
    },
  },
});
