/// vite.config.ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    env: {
      VITE_NODE_ENV: "test",
    },
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      exclude: [
        "src/main.tsx",
        "src/assets/",
        "src/styles/",
        "src/vite-env.d.ts",
        "src/test/setup.ts",
      ],
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
