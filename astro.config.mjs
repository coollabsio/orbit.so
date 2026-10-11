import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://orbit.so",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  server: {
    host: '0.0.0.0',
    // Tailscale MagicDNS names (*.ts.net) for the dev and preview servers.
    allowedHosts: ['.ts.net'],
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
