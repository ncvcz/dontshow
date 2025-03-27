import { Storage } from "@plasmohq/storage"
import type { Filter } from "~src/lib/filters";

const storage = new Storage();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "filter-menu",
    title: "Add to filters",
    contexts: ["selection"]
  })

  chrome.contextMenus.create({
    id: "add-to-global-filters",
    title: "All websites",
    contexts: ["selection"],
    parentId: "filter-menu"
  })

  chrome.contextMenus.create({
    id: "add-to-filters",
    title: "Only this website",
    contexts: ["selection"],
    parentId: "filter-menu"
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "add-to-global-filters" || info.menuItemId === "add-to-filters") {
    if (info.selectionText) {
      const filters = await storage.get<Filter[]>("filters") || [];
      const newFilter: Filter = {
        pattern: info.selectionText,
        domain: info.menuItemId === "add-to-global-filters" ? "*" : tab?.url ? new URL(tab.url).hostname : "*",
        action: "stars"
      };

      await storage.set("filters", [...filters, newFilter]);
    }
  }
})