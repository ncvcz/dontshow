import { storageType } from "@/lib/storage";
import {
  AlertCircleIcon,
  MoreVerticalIcon,
  SettingsIcon,
} from "lucide-react";

export default function Popup() {
  const [enabled, setEnabled] = useStorage(`${storageType}:enabled`, true);
  const [currentTabUrl, setCurrentTabUrl] = useState("");

  useEffect(() => {
    const getCurrentTab = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]?.url) {
        setCurrentTabUrl(tabs[0].url);
      }
    };
    getCurrentTab();
  }, []);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleRedirect = (page: string) => {
    // @ts-ignore
    browser.tabs.create({ url: browser.runtime.getURL(`/${page}.html`) });
  };

  const handleReportIssue = () => {
    window.open(
      `https://docs.google.com/forms/d/e/1FAIpQLSfRmBOtM7oS_TXdUxawm1DRSn5Pb_1qhMWDqRBsrXBsmUVuSg/viewform?usp=pp_url&entry.855414027=${encodeURIComponent(currentTabUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="card bg-base-100 w-[300px] shadow-xl">
      <div className="navbar bg-primary flex justify-center px-4 py-2">
        <h2 className="text-xl font-bold uppercase">Don't Show</h2>
      </div>
      <div className="card-body relative h-[350px] items-center justify-between p-0">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              aria-pressed={enabled}
              onClick={handleToggle}
              className="relative w-[180px] h-[90px] focus:outline-none select-none"
              tabIndex={0}
            >
              <span
                className={`absolute left-0 top-0 h-full w-full rounded-full transition-colors duration-200 ${enabled ? "bg-success" : "bg-base-300"}`}
              />
              <span
                className={`absolute top-1/2 left-2 transition-transform duration-200 transform -translate-y-1/2 shadow-xl bg-white border-4 ${enabled ? "border-success" : "border-base-100"} rounded-full ${enabled ? "translate-x-[86px]" : "translate-x-0"}`}
                style={{ width: 82, height: 82 }}
              />
              <input
                type="checkbox"
                checked={enabled}
                onChange={handleToggle}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
            </button>
            <p className={`text-center text-sm font-semibold transition-colors duration-200 ${enabled ? "text-success" : "text-base-content/70"}`}>
              {enabled ? "Words will be censored" : "Words will not be censored"}
            </p>
          </div>
        </div>

        <div className="navbar bg-base-200 rounded-b-lg">
          <div className="flex w-full items-center gap-2 px-0.5">
            <button
              onClick={() => handleRedirect("settings")}
              className="btn btn-primary flex flex-1 items-center justify-center gap-2"
            >
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <div className="dropdown dropdown-top dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <MoreVerticalIcon className="h-5 w-5" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm bg-base-200 rounded-box z-[1] w-48 p-2 shadow-lg"
              >
                <li>
                  <button onClick={handleReportIssue} className="flex items-center gap-3">
                    <AlertCircleIcon className="h-4 w-4" />
                    Report broken site
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
