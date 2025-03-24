import { useStorage } from "@plasmohq/storage/hook"
import {PenIcon, SettingsIcon } from "lucide-react"

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

  return (
    <div className="min-w-[300px] min-h-[200px] bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
          title="Edit Filters"
        >
          <PenIcon className="w-5 h-5 text-gray-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
          title="Settings"
        >
          <SettingsIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50"></div>
          <div className="relative text-8xl transform transition-transform duration-300 hover:scale-110">
            {enabled ? "🙈" : "🙉"}
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {enabled ? "BlurThat is Active" : "BlurThat is Paused"}
          </h2>
          <p className="text-sm text-gray-600">
            {enabled 
              ? "Information are being blurred" 
              : "Information are currently visible"}
          </p>
        </div>

        <button
          onClick={handleToggle}
          className={`
            px-6 py-3 rounded-full font-medium text-sm
            transform transition-all duration-200 w-full
            ${enabled 
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl" 
              : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
            }
          `}
        >
          {enabled ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
