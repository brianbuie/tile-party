import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT } = process.env;

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
  ],
  root: "./client/",
  publicDir: "./assets",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./client"),
      "@common": path.resolve(__dirname, "./common"),
    },
  },
  server: {
    open: "http://localhost:3000/",
    host: true,
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
