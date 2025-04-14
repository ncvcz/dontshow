import { storageType } from "@/lib/storage";
import "../assets/hide.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main(ctx) {
    const enabled = await storage.getItem<boolean>(`${storageType}:enabled`);

    if (enabled) return;

    document.documentElement.setAttribute("data-ds-ready", "true");
  },
});
