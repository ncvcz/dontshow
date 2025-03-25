import { applyFiltersToDOM, getFilters } from "~src/lib/filters";
import { Storage } from "@plasmohq/storage";

export { }

const showContent = () => {
  if (document.body.style.visibility === "visible") return;

  const styleOverride = document.createElement("style");

  styleOverride.innerText = `
    body {
      visibility: visible !important;
    }
  `

  document.head.appendChild(styleOverride)
}

const storage = new Storage();

storage.get<boolean>("enabled").then(async (enabled) => {
  if (!enabled) return showContent();

  const filters = await getFilters();
  applyFiltersToDOM(filters);
  showContent();
});