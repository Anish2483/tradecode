// Vite SPA config for GitHub Pages deployment
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    tailwindcss(), // Tailwind v4 native Vite plugin (handles @import "tailwindcss" syntax)
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // GitHub Pages serves from /tradecode/ (repo name)
  base: "/tradecode/",
  build: {
    outDir: "dist",
    sourcemap: false,
    // lightningcss can't parse Tailwind v4's source() syntax — use esbuild instead
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "vendor";
          if (id.includes("@tanstack/react-router")) return "router";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "ui";
        },
      },
    },
  },
});
