import { applyFiltersToDOM, getFilters } from "@/lib/filters";
import { storage } from "@wxt-dev/storage";

const showContent = () => {
  if (document.body.style.visibility === "visible") return;

  const styleOverride = document.createElement("style");

  styleOverride.innerText = `
    body {
      visibility: visible !important;
    }
  `
  document.head.appendChild(styleOverride)
}

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  cssInjectionMode: "manifest",
  async main(_ctx) {
    const enabled = await storage.getItem<boolean>("sync:enabled");
    
    if (!enabled) return showContent();

    const filters = await getFilters();
    applyFiltersToDOM(filters);
    showContent();

    const observer = new MutationObserver(async () => {
      const enabled = await storage.getItem<boolean>("sync:enabled");

      if (!enabled) return;

      const filters = await getFilters();
      applyFiltersToDOM(filters);
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })
  },
})