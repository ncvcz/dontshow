import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons", "@wxt-dev/i18n/module"],
  srcDir: "src",
  outDir: "dist",

  vite: () => ({
    // @ts-ignore
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),

  manifest: {
    name: "Don't Show",
    permissions: ["storage", "contextMenus"],
    options_page: "settings.html",
    default_locale: "en",
  },
});
