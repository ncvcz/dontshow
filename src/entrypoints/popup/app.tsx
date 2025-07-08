import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useStorage } from "@/hooks/storage";
import { SettingsIcon } from "lucide-react";

function App() {
  const [enabled, setEnabled] = useStorage("local:enabled", true);
  return (
    <div className="h-[300px] w-[250px]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Switch className="scale-[400%]" checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <div>
        <Button
          className="absolute right-2 bottom-2"
          variant="ghost"
          size="icon"
          onClick={() => browser.runtime.openOptionsPage()}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
}

export default App;
