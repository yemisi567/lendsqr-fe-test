/// vite.config.ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"], 
    exclude: ["node_modules", "dist", "coverage", "src/vite-env.d.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
      thresholds: {
        lines: 75,
        functions: 40,
        branches: 80,
        statements: 75,
      },
    },
  },
});
