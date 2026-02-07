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
  output: "hybrid",
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
