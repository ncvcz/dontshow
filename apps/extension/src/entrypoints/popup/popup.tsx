import { PowerIcon, PowerOffIcon, SettingsIcon, MoreVerticalIcon, AlertCircleIcon } from 'lucide-react';
import { storageType } from '@/lib/storage';

export default function Popup() {
  const [enabled, setEnabled] = useStorage(`${storageType}:enabled`, true);
  const [currentTabUrl, setCurrentTabUrl] = useState('');

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
      '_blank',
    );
  };

  return (
    <div className="card w-[300px] bg-base-100 shadow-xl">
      <div className="navbar bg-primary flex justify-center px-4 py-2">
        <h2 className="text-xl font-bold uppercase">Don't Show</h2>
      </div>
      <div className="card-body items-center justify-between h-[350px] p-0 relative">
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleToggle}
            className={`${enabled ? 'bg-error text-error-content' : 'bg-success text-success-content'} p-8 rounded-full active:scale-95 transition-all duration-100`}
          >
            {enabled ? <PowerOffIcon className="w-32 h-32" /> : <PowerIcon className="w-32 h-32" />}
          </button>
        </div>

        <div className="navbar bg-base-200 rounded-b-lg">
          <div className="flex items-center w-full px-0.5 gap-2">
            <button
              onClick={() => handleRedirect('settings')}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <div className="dropdown dropdown-top dropdown-end">
              <button tabIndex={0} className="btn btn-primary flex items-center justify-center gap-2">
                <MoreVerticalIcon className="w-5 h-5" />
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm p-2 shadow-lg bg-base-200 rounded-box w-48">
                <li>
                  <button
                    onClick={handleReportIssue}
                    className="flex items-center gap-3"
                  >
                    <AlertCircleIcon className="w-4 h-4" />
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
