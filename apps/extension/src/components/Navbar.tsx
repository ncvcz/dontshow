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

  const getRedirectUrl = (page: string): string => {
    // @ts-ignore

    return browser.runtime.getURL(`/${page}.html`);
  };

  return (
    <nav className="bg-primary shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-primary-content">Don't Show</h1>

          <div className="menu menu-horizontal flex space-x-1">
            <li>
              <a
                href={getRedirectUrl("word-filters")}
                className={`cursor-pointer text-primary-content ${activePage === "word-filters" ? "active font-medium" : ""}`}
              >
                Word Filters
              </a>
            </li>
            <li>
              <a
                href={getRedirectUrl("settings")}
                className={`cursor-pointer text-primary-content ${activePage === "settings" ? "active font-medium" : ""}`}
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
