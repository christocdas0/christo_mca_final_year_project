import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Run on localhost:3001
    strictPort: true, // Prevents fallback to another port
    open: true, // Opens browser automatically
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  },
});
