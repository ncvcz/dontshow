import {
  EyeIcon,
  EyeOffIcon,
  FunnelIcon,
  InfoIcon,
  LifeBuoyIcon,
  SettingsIcon
} from "lucide-react"

import { useStorage } from "@plasmohq/storage/hook"

import "./style.css"

function IndexPopup() {
  const [enabled, setEnabled] = useStorage("enabled", true)

  const handleToggle = () => {
    setEnabled(!enabled)
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id)
      }
    )
  }

  const handleRedirect = (page: string) => {
    chrome.tabs.create({ url: chrome.runtime.getURL(`/tabs/${page}.html`) })
  }

  return (
    <div className="card w-[300px] bg-base-100 shadow-xl">
      <div className="navbar flex justify-between items-center bg-base-200 rounded-t-lg px-4 py-2">
        <h2 className="text-xl font-bold">
          HideWords
        </h2>

        <div className="badge badge-primary">FREE</div>
      </div>
      <div className="card-body items-center justify-between h-[300px] p-0">
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleToggle}
            className={enabled ? "text-error" : "text-success"}>
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
                className="btn btn-ghost btn-circle">
                <FunnelIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleRedirect("settings")}
                className="btn btn-ghost btn-circle">
                <SettingsIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleRedirect("support")}
                className="btn btn-ghost btn-circle">
                <LifeBuoyIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleRedirect("about")}
                className="btn btn-ghost btn-circle">
                <InfoIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
