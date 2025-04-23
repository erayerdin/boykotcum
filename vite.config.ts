import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json";
import { icons } from "./public/assets/icons/icons.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __APPVERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: ["development", "e2e"].includes(mode),
        type: ["module", "classic"].includes(mode) ? "module" : "classic",
        navigateFallback: "index.html",
      },
      manifest: {
        id: "com.erayerdin.boykotcum",
        name: "Boykotçum",
        short_name: "Boykotçum",
        description: "Ne almayacağını sen düşünme.",
        icons,
        lang: "tr-TR",
        launch_handler: {
          client_mode: "auto",
        },
        orientation: "any",
        screenshots: [],
        // theme_color: tailwindConfig.theme.extend.colors.brand,
        categories: ["shopping"],
        dir: "ltr",
        prefer_related_applications: true,
        related_applications: [
          {
            platform: "play",
            id: "com.erayerdin.boykotcum",
            url: "https://play.google.com/store/apps/details?id=com.erayerdin.boykotcum",
          },
        ],
        scope_extensions: [],
      },
    }),
  ],
  esbuild: {
    drop: mode === "production" ? ["debugger"] : [],
    pure:
      mode === "production"
        ? ["console.log", "console.debug", "console.trace"]
        : [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
