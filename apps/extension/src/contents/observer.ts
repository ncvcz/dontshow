import { applyFiltersToDOM, getFilters } from "~src/lib/filters"
import { Storage } from "@plasmohq/storage";

export {}

const storage = new Storage();

const observer = new MutationObserver(() => {
  storage.get<boolean>("enabled").then((enabled) => {
    if (!enabled) return

    applyFiltersToDOM(getFilters())
  })
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
})