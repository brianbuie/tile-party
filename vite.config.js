import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./client/",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
  server: {
    open: "http://localhost:3000/",
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../.build/",
  },
});