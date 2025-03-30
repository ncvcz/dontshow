import { applyFiltersToDOM, getFilters } from "@/lib/filters";
import { storageType } from "@/lib/storage";

const showContent = () => {
  if (document.body.style.visibility === "visible") return;

  const styleOverride = document.createElement("style");

  styleOverride.innerText = `
    ${import.meta.env.CHROME ? "body" : "*"} {
      opacity: 1 !important;
    }
  `
  document.head.appendChild(styleOverride)
}

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(_ctx) {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);
    
    if (!enabled) return;

    const filters = await getFilters();
    applyFiltersToDOM(filters);
    showContent();

    const observer = new MutationObserver(async () => {
      const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

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