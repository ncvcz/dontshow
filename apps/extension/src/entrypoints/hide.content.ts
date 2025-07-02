import { Settings } from "@/lib/settings";
import { storageType } from "@/lib/storage";
import "../assets/hide.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main() {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

    if (enabled) return;

    showContent();

    const settings = await storage.getItem<Settings>(`${storageType}:settings`);

    if (!settings?.enableOnLocalhost && window.location.hostname === "localhost") return;

    const observer = new MutationObserver(showContent);

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  },
});
