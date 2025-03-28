import { AlertTriangleIcon, FunnelIcon, SettingsIcon } from "lucide-react"

import { useStorage } from "@/hooks/storage";
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
  isSensitive?: boolean
}

export default function Layout({ children, isSensitive }: LayoutProps) {
  const [enabled, setEnabled] = useStorage<boolean>("sync:enabled", false)
  const [continueBrowsing, setContinueBrowsing] = useState(false)

  const handleRedirect = (page: string) => {
    browser.tabs.getCurrent((tab) => {
      if (!tab?.id) return;

      browser.tabs.update(tab.id, {
        // @ts-ignore
        url: browser.runtime.getURL(`/${page}.html`)
      })
    })
  }

  return !enabled || (continueBrowsing || !isSensitive) ? (
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
      <main className="container mx-auto p-4">{children}</main>
    </div>
  ) : (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center space-y-4">
      <AlertTriangleIcon className="w-32 h-32 text-warning" />
      <h1 className="text-5xl font-bold">
        This page contains sensitive content
      </h1>
      <p className="text-lg text-center max-w-2xl">
        This page may display sensitive personal information. If you’re screen sharing or live streaming, consider enabling protection to avoid exposing private data.
      </p>
      <button className="btn btn-error" onClick={() => setContinueBrowsing(true)}>
        Continue Browsing (at your own risk)
      </button>
    </div>
  )
}
