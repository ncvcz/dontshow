import { FunnelIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activePage, setActivePage] = useState<string | null>(null);
  
  // Set active page based on current URL when component mounts
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("filters.html")) {
      setActivePage("filters");
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
        url: browser.runtime.getURL(`/${page}.html`)
      })
    })
  }

  return (
    <nav className="bg-primary shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center bg-base-200 rounded-full p-1.5">
            <img src="/icon.png" alt="Don't Show" className="w-10 h-10" />
          </div>
          
          <div className="flex space-x-1 menu menu-horizontal">
            <li><a onClick={() => handleRedirect("word-filters")}>Word Filters</a></li>
            <li><a onClick={() => handleRedirect("settings")}>Settings</a></li>
          </div>
        </div>
      </div>
    </nav>
  );
}