// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  // 配置选项
  plugins: [],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
