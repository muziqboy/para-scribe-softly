
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/image": path.resolve(__dirname, "./src/lib/next-compat.tsx"),
      "next/link": path.resolve(__dirname, "./src/lib/next-compat.tsx"),
      "next/head": path.resolve(__dirname, "./src/lib/next-compat.tsx"),
      "next/router": path.resolve(__dirname, "./src/lib/next-compat.tsx"),
      "next/font": path.resolve(__dirname, "./src/lib/next-compat.tsx"),
    },
  },
  define: {
    "process.env": {},
  }
}));
