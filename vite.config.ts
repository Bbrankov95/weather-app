import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import estlint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), estlint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      api: path.resolve(__dirname, "./src/api"),
      components: path.resolve(__dirname, "./src/components"),
      types: path.resolve(__dirname, "./src/types"),
      shared: path.resolve(__dirname, "./src/shared"),
      assets: path.resolve(__dirname, "./src/assets"),
      utils: path.resolve(__dirname, "./src/utils"),
      contexts: path.resolve(__dirname, "./src/contexts"),
    },
  },
});
