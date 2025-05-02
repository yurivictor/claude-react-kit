import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '',
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: true,
    historyApiFallback: true,
  },
});
