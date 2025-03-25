import { useStorage } from "@plasmohq/storage/hook"
import { PenIcon, SettingsIcon } from "lucide-react"
import { Button } from "@blurthat/ui/src/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@blurthat/ui/src/components/ui/card"
import { cn } from "@blurthat/ui/src/lib/utils"

import "./style.css"

function IndexPopup() {
  const [enabled, setEnabled] = useStorage("enabled", true)

  const handleToggle = () => {
    setEnabled(!enabled);
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id)
      }
    )
  }

  return (
    <Card className="w-[320px] border-none shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-end space-x-2">
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
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-6 py-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative text-8xl transform transition-all duration-300 hover:scale-110 hover:rotate-12">
            {enabled ? "🙈" : "🙉"}
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {enabled ? "BlurThat is Active" : "BlurThat is Paused"}
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            {enabled 
              ? "Information is being blurred" 
              : "Information is currently visible"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          onClick={handleToggle}
          size="lg"
          className={cn(
            "w-full",
            enabled 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          )}
        >
          {enabled ? "Disable" : "Enable"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default IndexPopup
