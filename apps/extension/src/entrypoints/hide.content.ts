import "../assets/hide.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main(_ctx) {
    const enabled = await storage.getItem<boolean>("sync:enabled");

    if (enabled) return;

    const styleOverride = document.createElement("style");

    styleOverride.innerText = `
    body {
      visibility: visible !important;
    }
    `
    document.head.appendChild(styleOverride)
  },
});
