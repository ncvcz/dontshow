import { defaultSettings } from "@/const";
import { log } from "@/lib/log";
import { Filter, Settings } from "@/types";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async e => {
    if (e.reason === "install" || e.reason === "update") {
      const isEnabled = (await storage.getItem("local:enabled")) ?? true;
      storage.setItem("local:enabled", isEnabled);

      storage.setItem("local:settings", defaultSettings);
    }

    if (e.reason === "update") {
      const settings = await storage.getItem<Settings>(`local:settings`);

      if (!settings) {
        storage.setItem(`local:settings`, defaultSettings);
        return;
      }

      const updatedSettings = Object.fromEntries(
        // @ts-ignore
        Object.entries(defaultSettings).map(([key, value]) => [key, settings?.[key] ?? value])
      );

      storage.setItem(`local:settings`, updatedSettings);
    }
  });

  storage.watch("local:enabled", async (newValue, oldValue) => {
    if (newValue === oldValue) return;

    const tabs = await browser.tabs.query({ url: "<all_urls>" });

    for (const tab of tabs) {
      browser.tabs.reload(tab.id!);
    }
  });

  browser.contextMenus.create({
    id: "filter-menu",
    title: "Add to word filters",
    contexts: ["selection"],
  });

  browser.contextMenus.create({
    id: "add-to-global-filters",
    title: "All websites",
    contexts: ["selection"],
    parentId: "filter-menu",
  });

  browser.contextMenus.create({
    id: "add-to-filters",
    title: "Only this website",
    contexts: ["selection"],
    parentId: "filter-menu",
  });

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "add-to-global-filters" || info.menuItemId === "add-to-filters") {
      const filters = (await storage.getItem<Filter[]>("local:filters")) || [];
      const newFilter = info.selectionText?.trim();

      if (newFilter && !filters.some(filter => filter.expression === newFilter)) {
        filters.push({
          expression: newFilter,
          type: "censor",
          domain: info.menuItemId === "add-to-global-filters" ? "*" : tab?.url || "*",
        });
        storage.setItem("local:filters", filters);
        log.info(`Added filter: ${newFilter}`);
      } else {
        log.warn(`Filter already exists or is empty: ${newFilter}`);
      }
    }
  });
});
