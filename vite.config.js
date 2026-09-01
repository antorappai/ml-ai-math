import { defineConfig } from "vite";

export default defineConfig({
  base: "/ml-ai-math/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/katex")) return "math-renderer";
          if (id.includes("node_modules/react")) return "react-vendor";
          if (id.includes("/src/content/")) return "curriculum";
        }
      }
    }
  }
});
