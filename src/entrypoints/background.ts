import { defaultSettings } from "@/const";
import { Settings } from "@/types";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async e => {
    if (e.reason === "install" || e.reason === "update") {
      const isEnabled = (await storage.getItem("local:enabled")) ?? true;
      storage.setItem("local:enabled", isEnabled);

      storage.setItem("local:settings", defaultSettings);
    }

    if (e.reason === "update") {
      const settings = await storage.getItem<Settings>(`local:settings`);

      if (!settings) {
        storage.setItem(`local:settings`, defaultSettings);
        return;
      }

      const updatedSettings = Object.fromEntries(
        // @ts-ignore
        Object.entries(defaultSettings).map(([key, value]) => [key, settings?.[key] ?? value])
      );

      storage.setItem(`local:settings`, updatedSettings);
    }
  });
});
