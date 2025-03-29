import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",
  vite: () => ({
    plugins: [tailwindcss() as any],
  }),
  
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "Don't Show",
      permissions: ["storage", "contextMenus"],
      content_scripts: [
        {
          matches: ["<all_urls>"],
          css: ["./content-scripts/hide.css"],
          run_at: "document_start",
        },
      ],
    };
  },
});
