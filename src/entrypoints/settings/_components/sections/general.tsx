import { Setting } from "../ui/setting";
import { Settings } from "@/types";

export default function General() {
  const [settings, setSettings] = useStorage<Settings>("local:settings", {});
  return (
    <div>
      <h1 className="text-2xl font-bold">General Settings</h1>
      <p className="text-muted-foreground mt-2">
        Here you can manage general settings for the extension, such as enabling or disabling it,
        and adjusting other preferences.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <Setting
          title="Sensitive Alert"
          description="Show a warning when a page contains sensitive content."
          checked={settings.sensitiveAlert}
          onChange={value => setSettings({ ...settings, sensitiveAlert: value })}
        />
        <Setting
          title="Enable on Localhost"
          description="Enable the extension on localhost for development purposes."
          checked={settings.enableOnLocalhost}
          onChange={value => setSettings({ ...settings, enableOnLocalhost: value })}
        />
        <Setting
          title="Censure Inputs"
          description="Automatically censure inputs containing sensitive content."
          checked={settings.inputCensoring}
          onChange={value => setSettings({ ...settings, inputCensoring: value })}
        />
        <Setting
          title="Uncensor Inputs on Focus"
          description="Uncensor inputs when they are focused, allowing you to see the original content."
          checked={settings.uncensorOnFocus}
          onChange={value => setSettings({ ...settings, uncensorOnFocus: value })}
        />
      </div>
    </div>
  );
}
