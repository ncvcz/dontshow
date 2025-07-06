import { applyFiltersToDOM, getFilters } from "@/lib/filters";
import { Settings } from "@/lib/settings";
import { storageType } from "@/lib/storage";

const showContent = () => {
  document.documentElement.setAttribute("data-ds-ready", "true");
};

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
      }

      const filters = await getFilters();
      applyFiltersToDOM(filters);
      showContent();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const settings = await storage.getItem<Settings>(`${storageType}:settings`);

    document.addEventListener(
      "focusin",
      async e => {
        if (!settings || !settings.uncensorOnFocus) return;

        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (target.matches("input[type='password'][data-ds-cinput='true']")) {
          target.setAttribute("type", "text");
        }
      },
      true
    );

    document.addEventListener(
      "focusout",
      async e => {
        if (!settings || !settings.uncensorOnFocus) return;

        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (target.matches("input[type='text'][data-ds-cinput='true']")) {
          target.setAttribute("type", "password");
        }
      },
      true
    );
  },
});
