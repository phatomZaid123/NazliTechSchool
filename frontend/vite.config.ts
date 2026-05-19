import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Rolldown expects manualChunks to be a function.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router-dom/")
          ) {
            return "react"
          }

          if (id.includes("/framer-motion/")) {
            return "framer"
          }

          if (
            id.includes("/@radix-ui/react-dialog/") ||
            id.includes("/@radix-ui/react-dropdown-menu/") ||
            id.includes("/@radix-ui/react-popover/")
          ) {
            return "ui"
          }

          if (id.includes("/lucide-react/")) {
            return "lucide"
          }

          return "vendor"
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
})
