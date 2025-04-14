import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  srcDir: "src",
  outDir: "dist",
  vite: () => ({
    plugins: [tailwindcss() as any],
  }),

  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "Don't Show",
      permissions: ["storage", "contextMenus"],
    };
  },
});
