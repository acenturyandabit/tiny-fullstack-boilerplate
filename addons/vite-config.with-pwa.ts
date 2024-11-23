// (cd frontend && npm i vite-plugin-pwa) && mv addons/pwa-icons frontend/public && rm frontend/public/put-these-in-frontend-public

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      injectRegister: "auto",
      // Kudos to the service provided by https://realfavicongenerator.net/.
      manifest: {
        name: "PWA title",
        short_name: "PWA short title",
        description: "Description of the PWA",
        icons: [
          {
            src: "/ico-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/ico-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        display: "standalone",
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/make-sentence": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
  },
});
