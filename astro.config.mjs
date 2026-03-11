// astro.config.mjs - VERSIÓN CORREGIDA

import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import { fileURLToPath } from "url";
import path from "path";

import sitemap from "@astrojs/sitemap";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://zutra.agency",
  integrations: [
    icon({
      include: {
        phosphor: ["ph-lightning", "ph-lightning-fill"],
      },
    }),
    sitemap(),
  ],
  image: {
    service: { entrypoint: "astro/assets/services/sharp" }, // Forzar sharp si es posible
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
