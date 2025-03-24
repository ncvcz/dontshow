import { applyFiltersToDOM, getFilters } from "~src/lib/filters";
import { Storage } from "@plasmohq/storage";

export { }

const storage = new Storage();

storage.get<boolean>("enabled").then((enabled) => {
  if (!enabled) return

  applyFiltersToDOM(getFilters())
});

const styleOverride = document.createElement("style");

styleOverride.innerText = `
    body {
      visibility: visible !important;
    }
  `

document.head.appendChild(styleOverride)