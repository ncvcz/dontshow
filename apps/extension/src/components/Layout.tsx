import { FunnelIcon, SettingsIcon } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleRedirect = (page: string) => {
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.update(tab.id, {
        url: chrome.runtime.getURL(`/tabs/${page}.html`)
      })
    })
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-200 border-b border-base-300">
        <div className="flex-1">
          <div className="flex gap-2">
            <button
              className="btn btn-ghost gap-2"
              onClick={() => handleRedirect("filters")}>
              <FunnelIcon className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <button
              className="btn btn-ghost gap-2"
              onClick={() => handleRedirect("settings")}>
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
