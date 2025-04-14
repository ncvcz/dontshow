import { storageType } from "@/lib/storage";
import {
  AlertCircleIcon,
  MoreVerticalIcon,
  PowerIcon,
  PowerOffIcon,
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
        <div className="flex flex-1 items-center justify-center">
          <button
            onClick={handleToggle}
            className={`${enabled ? "bg-error text-error-content" : "bg-success text-success-content"} rounded-full p-8 transition-all duration-100 active:scale-95`}
          >
            {enabled ? <PowerOffIcon className="h-32 w-32" /> : <PowerIcon className="h-32 w-32" />}
          </button>
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
