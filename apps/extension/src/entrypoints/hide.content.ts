import { Settings } from "@/lib/settings";
import { storageType } from "@/lib/storage";
import "../assets/hide.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main(ctx) {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

    if (enabled) return;
   
    document.documentElement.setAttribute("data-ds-ready", "true");

    const settings = await storage.getItem<Settings>(`${storageType}:settings`);

    if (!settings?.enableOnLocalhost && window.location.hostname === "localhost") return;

    const observer = new MutationObserver(() => {
      document.documentElement.setAttribute("data-ds-ready", "true");
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  },
});
