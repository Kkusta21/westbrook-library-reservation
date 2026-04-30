import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    // Proxy /api requests to the Express backend during development.
    // This avoids CORS issues and mirrors the production Nginx config.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // No rewrite – /api prefix is preserved so Express routes match.
      },
    },
  },

  build: {
    // Output directory relative to the frontend project root.
    outDir: 'dist',
    sourcemap: true,
  },
});
