import { Filter } from "@/lib/filters";
import { storageType } from "@/lib/storage";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(e => {
    if (e.reason === "install") {
      browser.tabs.create({
        // @ts-ignore
        url: browser.runtime.getURL("welcome.html"),
      });
    }

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
  });

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "add-to-global-filters" || info.menuItemId === "add-to-filters") {
      if (info.selectionText) {
        const filters = (await storage.getItem<Filter[]>(`${storageType}:filters`)) || [];
        const newFilter: Filter = {
          pattern: info.selectionText,
          domain:
            info.menuItemId === "add-to-global-filters"
              ? "*"
              : tab?.url
                ? new URL(tab.url).hostname
                : "*",
          action: "stars",
        };

        await storage.setItem(`${storageType}:filters`, [...filters, newFilter]);
      }
    }
  });
});
