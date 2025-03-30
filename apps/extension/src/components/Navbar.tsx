import { FunnelIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activePage, setActivePage] = useState<string | null>(null);

  // Set active page based on current URL when component mounts
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("word-filters.html")) {
      setActivePage("word-filters");
    } else if (currentUrl.includes("settings.html")) {
      setActivePage("settings");
    }
  }, []);

  const handleRedirect = (page: string) => {
    setActivePage(page);
    browser.tabs.getCurrent((tab) => {
      if (!tab?.id) return;

      browser.tabs.update(tab.id, {
        // @ts-ignore
        url: browser.runtime.getURL(`/${page}.html`),
      });
    });
  };

  return (
    <nav className="bg-primary shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Don't Show</h1>

          <div className="flex space-x-1 menu menu-horizontal">
            <li>
              <a 
                onClick={() => handleRedirect("word-filters")}
                className={`cursor-pointer ${activePage === "word-filters" ? "active font-medium" : ""}`}
              >
                Word Filters
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleRedirect("settings")}
                className={`cursor-pointer ${activePage === "settings" ? "active font-medium" : ""}`}
              >
                Settings
              </a>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
