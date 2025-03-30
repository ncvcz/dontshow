import "../assets/hide.css";
import { storageType } from "@/lib/storage";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main(ctx) {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

    if (enabled) return;

    const styleOverride = document.createElement("style");

    styleOverride.innerText = `
    ${import.meta.env.CHROME ? "body" : "*"} {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    `
    document.head.appendChild(styleOverride)
  },
});
