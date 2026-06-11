import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("ag-grid-community") ||
            id.includes("ag-grid-react")
          ) {
            return "vendor-aggrid";
          }
          // React ecosystem
          if (id.includes("react-dom") || id.includes("react-router-dom")) {
            return "vendor-react";
          }
          if (id.includes("react-tooltip")) {
            return "vendor-tooltip";
          }
          // Các vendor còn lại
          if (id.includes("@mui/material")) return "vendor-mui";
          if (id.includes("firebase")) return "vendor-firebase";
          if (id.includes("lightweight-charts")) return "vendor-charts";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react-joyride")) return "vendor-joyride";
        },
      },
    },
  },
});
