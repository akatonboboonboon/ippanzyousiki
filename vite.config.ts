import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/data/archive-v1.json"))
            return "questions-archive";
          const bank = id.match(/\/src\/data\/practical-([^/]+)\.ts$/);
          if (bank) return `questions-${bank[1]}`;
          const expansion = id.match(/\/src\/data\/expansion-([^/]+)\.ts$/);
          if (expansion) return `questions-expanded-${expansion[1]}`;
          const choices = id.match(
            /\/src\/data\/choice-revisions-([^/]+)\.json$/,
          );
          if (choices) return `questions-choices-${choices[1]}`;
          const editorial = id.match(
            /\/src\/data\/editorial-revisions-([^/]+)\.json$/,
          );
          if (editorial) return `questions-editorial-${editorial[1]}`;
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  test: { include: ["tests/*.test.ts"] },
});
