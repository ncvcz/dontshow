import { Filter } from "@/lib/filters"
import { storage } from "@wxt-dev/storage"

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "filter-menu",
      title: "Add to filters",
      contexts: ["selection"]
    })

    browser.contextMenus.create({
      id: "add-to-global-filters",
      title: "All websites",
      contexts: ["selection"],
      parentId: "filter-menu"
    })

    browser.contextMenus.create({
      id: "add-to-filters",
      title: "Only this website",
      contexts: ["selection"],
      parentId: "filter-menu"
    })
  })

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "add-to-global-filters" || info.menuItemId === "add-to-filters") {
      if (info.selectionText) {
        const filters = await storage.getItem<Filter[]>("sync:filters") || [];
        const newFilter: Filter = {
          pattern: info.selectionText,
          domain: info.menuItemId === "add-to-global-filters" ? "*" : tab?.url ? new URL(tab.url).hostname : "*",
          action: "stars"
        };

        await storage.setItem("sync:filters", [...filters, newFilter]);
      }
    }
  })
});