import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  srcDir: "src",
  outDir: "dist",

  // @ts-ignore
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),

  manifest: ({}) => {
    return {
      name: "Don't Show",
      permissions: ["storage", "contextMenus"],
      author: "Valerio Clemenzi",
      options_page: "settings.html",
    };
  },
});
