import {
  PowerIcon,
  PowerOffIcon,
  FunnelIcon,
  SettingsIcon,
} from "lucide-react";
import { storageType } from "@/lib/storage";

export default function Popup() {
  const [enabled, setEnabled] = useStorage(`${storageType}:enabled`, true);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleRedirect = (page: string) => {
    // @ts-ignore
    browser.tabs.create({ url: browser.runtime.getURL(`/${page}.html`) });
  };

  return (
    <div className="card w-[300px] bg-base-100 shadow-xl">
      <div className="navbar bg-primary flex justify-center px-4 py-2">
        <h2 className="text-xl font-bold uppercase">Don't Show</h2>
      </div>
      <div className="card-body items-center justify-between h-[350px] p-0">
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleToggle}
            className={`${enabled ? "bg-error text-error-content" : "bg-success text-success-content"} p-8 rounded-full active:scale-95 transition-all duration-100`}
          >
            {enabled ? (
              <PowerOffIcon className="w-32 h-32" />
            ) : (
              <PowerIcon className="w-32 h-32" />
            )}
          </button>
        </div>

        <div className="navbar bg-base-200 rounded-b-lg">
          <div className="flex-1">
            <div className="flex justify-between items-center w-full px-2">
              <span className="text-sm">
                v0.0.0-beta
              </span>
              <button
                onClick={() => handleRedirect("settings")}
                className="btn btn-primary flex items-center gap-2"
              >
                <SettingsIcon className="w-6 h-6" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
