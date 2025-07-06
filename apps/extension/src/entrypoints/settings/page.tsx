import Layout from "@/components/Layout";
import { useStorage } from "@/hooks/storage";
import { defaultSettings, Settings } from "@/lib/settings";
import { storageType } from "@/lib/storage";
import {
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
  ServerIcon,
  TextCursorInputIcon,
} from "lucide-react";

export default function Page() {
  const [enabled, setEnabled] = useStorage<boolean>(`${storageType}:enabled`, false);
  const [settings, setSettings] = useStorage<Settings>(`${storageType}:settings`, defaultSettings);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        {/* Main toggle */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex justify-between text-2xl">
              <span>Extension Status</span>
              <div className="badge badge-lg badge-outline">{enabled ? "Active" : "Inactive"}</div>
            </h2>
            <p className="text-base-content/70 mb-4">
              Enable or disable Don't Show. When active, website content will be modified according
              to your filters.
            </p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-lg">
                {enabled ? (
                  <EyeOffIcon className="text-success h-6 w-6" />
                ) : (
                  <EyeIcon className="text-error h-6 w-6" />
                )}
                {enabled ? "Protection Active" : "Protection Inactive"}
              </span>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-success"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
            </div>
          </div>
        </div>

        {/* Settings options */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">Settings</h2>

            <div className="divide-base-300 divide-y">
              {/* Sensitive Alert Setting */}
              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="text-warning h-5 w-5" />
                    <h3 className="font-semibold">Sensitive Content Alert</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Shows a warning when accessing pages with potentially sensitive or private
                    settings. Useful during streaming or screen sharing.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.sensitiveAlert ?? true}
                  onChange={() =>
                    updateSetting("sensitiveAlert", !(settings.sensitiveAlert ?? true))
                  }
                />
              </div>

              {/* Input Censoring Setting */}
              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TextCursorInputIcon className="text-info h-5 w-5" />
                    <h3 className="font-semibold">Input Censoring</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Automatically censors text inputs in designated fields to prevent accidental
                    exposure of sensitive data.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.inputCensoring ?? true}
                  onChange={() =>
                    updateSetting("inputCensoring", !(settings.inputCensoring ?? true))
                  }
                />
              </div>

              {/* Uncensor on Focus Setting */}
              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <EyeIcon className="text-success h-5 w-5" />
                    <h3 className="font-semibold">Uncensor on Focus</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Automatically uncensors input fields when focused, allowing you to see the
                    original content while typing.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.uncensorOnFocus ?? true}
                  onChange={() =>
                    updateSetting("uncensorOnFocus", !(settings.uncensorOnFocus ?? true))
                  }
                />
              </div>

              {/* Enable on Localhost Setting */}
              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ServerIcon className="text-accent h-5 w-5" />
                    <h3 className="font-semibold">Enable on Localhost</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Allow the extension to run on localhost domains (e.g., `localhost:3000`). Useful
                    for development.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.enableOnLocalhost ?? false}
                  onChange={() =>
                    updateSetting("enableOnLocalhost", !(settings.enableOnLocalhost ?? false))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-2 text-2xl">System Status</h2>
            <div className="stats stats-vertical lg:stats-horizontal w-full shadow">
              <div className="stat">
                <div className="stat-title">Version</div>
                <div className="stat-value text-xl">1.0.0</div>
                <div className="stat-desc">Don't Show Extension</div>
              </div>

              <div className="stat">
                <div className="stat-title">Status</div>
                <div className="stat-value text-xl">
                  {enabled ? (
                    <span className="text-success">Active</span>
                  ) : (
                    <span className="text-error">Inactive</span>
                  )}
                </div>
                <div className="stat-desc">
                  {enabled ? "Protection running" : "Protection disabled"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
