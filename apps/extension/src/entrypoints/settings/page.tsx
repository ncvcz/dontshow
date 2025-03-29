import { defaultSettings, Settings } from "@/lib/settings";
import Layout from "@/components/Layout";
import { useStorage } from "@/hooks/storage";
import { AlertTriangleIcon, EyeIcon, EyeOffIcon, ShieldIcon } from "lucide-react";

export default function Page() {
  const [enabled, setEnabled] = useStorage<boolean>("sync:enabled", false);
  const [settings, setSettings] = useStorage<Settings>("sync:settings", defaultSettings);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <Layout isSensitive>
      <div className="flex flex-col gap-8">
        {/* Main toggle */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl flex justify-between">
              <span>Extension Status</span>
              <div className="badge badge-lg badge-outline">
                {enabled ? "Active" : "Inactive"}
              </div>
            </h2>
            <p className="text-base-content/70 mb-4">
              Enable or disable HideWords. When active, website content will be modified according to your filters.
            </p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-lg">
                {enabled ? (
                  <EyeOffIcon className="w-6 h-6 text-success" />
                ) : (
                  <EyeIcon className="w-6 h-6 text-error" />
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
            <h2 className="card-title text-2xl mb-4">Settings</h2>
            
            <div className="divide-y divide-base-300">
              {/* Sensitive Alert Setting */}
              <div className="py-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="w-5 h-5 text-warning" />
                    <h3 className="font-semibold">Sensitive Content Alert</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Shows a warning when accessing pages with potentially sensitive or private settings. Useful during streaming or screen sharing.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.sensitiveAlert ?? true}
                  onChange={() => updateSetting("sensitiveAlert", !(settings.sensitiveAlert ?? true))}
                />
              </div>
              
              {/* Placeholder for future settings */}
              <div className="py-4 flex items-center justify-between opacity-60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="w-5 h-5 text-info" />
                    <h3 className="font-semibold">Advanced Protection</h3>
                  </div>
                  <p className="text-base-content/70 max-w-2xl">
                    Coming soon: Enable advanced protection for an enhanced level of security and privacy.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Information */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-2">System Status</h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Version</div>
                <div className="stat-value text-xl">1.0.0</div>
                <div className="stat-desc">HideWords Extension</div>
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
                <div className="stat-desc">{enabled ? "Protection running" : "Protection disabled"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
