import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

const REPOSITORY_BASE = "/life-command-center/";

export default defineConfig({
  base: REPOSITORY_BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "Life Command Center",
        short_name: "Life Center",
        description: "A private, local-first command center for intentional daily progress.",
        theme_color: "#081426",
        background_color: "#050b14",
        display: "standalone",
        orientation: "portrait-primary",
        scope: REPOSITORY_BASE,
        start_url: `${REPOSITORY_BASE}#/today`,
        icons: [
          {
            src: `${REPOSITORY_BASE}icon-192.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: `${REPOSITORY_BASE}icon-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: `${REPOSITORY_BASE}index.html`
      }
    })
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true
  }
});
