import { ExposingElement } from "@/types";
import { getCssSelector } from "css-selector-generator";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount(container) {
        document.addEventListener("mouseover", event => {
          const target = event.target as HTMLElement;

          if (target.textContent?.trim() === "") return;

          target.style.outline = "2px solid blue";
          target.style.outlineOffset = "2px";
        });

        document.addEventListener("mouseout", event => {
          const target = event.target as HTMLElement;
          target.style.outline = "";
        });

        document.addEventListener("click", async event => {
          event.preventDefault();
          event.stopPropagation();

          const target = event.target as Element;
          const selector = getCssSelector(target);
          const elements =
            (await storage.getItem<ExposingElement[]>("local:exposingElements")) || [];

          const newElement: ExposingElement = {
            selector,
            website: new URL(document.location.href).hostname,
            action: "censor",
          };

          elements.push(newElement);
          await storage.setItem("local:exposingElements", elements);
        });
      },
    });

    browser.runtime.onMessage.addListener(message => {
      if (message === "exposing-element-selection") {
        if (ui.mounted) {
          ui.remove();
        } else {
          ui.mount();
        }
      }
    });
  },
});
