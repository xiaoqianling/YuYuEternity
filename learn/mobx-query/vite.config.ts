// vite.config.ts
import { defineConfig } from "vite";
// 这里有编辑器报错，但是可以正常使用
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // 配置选项
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  server: {
    port: 3000,
    open: true,
  },
});
