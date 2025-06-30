import { applyFiltersToDOM, getFilters } from "@/lib/filters";
import { storageType } from "@/lib/storage";

const showContent = () => {
  document.documentElement.setAttribute("data-ds-ready", "true");
}

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx) {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

    if (!enabled) return;

    const filters = await getFilters();

    applyFiltersToDOM(filters);
    showContent();

    const observer = new MutationObserver(async el => {
      const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

      if (!enabled) {
        return;
      };

      const filters = await getFilters();
      applyFiltersToDOM(filters);
      showContent();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  },
});
