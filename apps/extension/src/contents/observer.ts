import { applyFiltersToDOM, getFilters } from "~src/lib/filters"
import { Storage } from "@plasmohq/storage";

const storage = new Storage();

const observer = new MutationObserver(async () => {
  const enabled = await storage.get<boolean>("enabled");

  if (!enabled) return;

  const filters = await getFilters();
  applyFiltersToDOM(filters);
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
})