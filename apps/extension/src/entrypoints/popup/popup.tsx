import {
  EyeIcon,
  EyeOffIcon,
  FunnelIcon,
  SettingsIcon,
} from "lucide-react";

export default function Popup() {
  const [enabled, setEnabled] = useStorage("local:enabled", true);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleRedirect = (page: string) => {
    // @ts-ignore
    browser.tabs.create({ url: browser.runtime.getURL(`/${page}.html`) });
  };

  return (
    <div className="card w-[300px] bg-base-100 shadow-xl">
      <div className="navbar flex justify-between items-center bg-base-200 rounded-t-lg px-4 py-2">
        <h2 className="text-xl font-bold">HideWords</h2>

        <div className="badge badge-primary">FREE</div>
      </div>
      <div className="card-body items-center justify-between h-[300px] p-0">
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleToggle}
            className={enabled ? "text-error" : "text-success"}
          >
            {enabled ? (
              <EyeOffIcon className="w-32 h-32" />
            ) : (
              <EyeIcon className="w-32 h-32" />
            )}
          </button>
        </div>

        <div className="navbar bg-base-200 rounded-b-lg">
          <div className="flex-1">
            <div className="flex justify-around w-full">
              <button
                onClick={() => handleRedirect("filters")}
                className="btn btn-ghost flex items-center gap-2"
              >
                <FunnelIcon className="w-6 h-6" />
                <span>Filters</span>
              </button>
              <button
                onClick={() => handleRedirect("settings")}
                className="btn btn-ghost flex items-center gap-2"
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
