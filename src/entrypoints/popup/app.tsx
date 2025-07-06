import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useStorage } from "@/hooks/storage";
import { SettingsIcon } from "lucide-react";

function App() {
  const [enabled, setEnabled] = useStorage("local:enabled", true);
  return (
    <div className="flex h-[300px] w-[250px] items-center justify-center">
      <div>
        <Switch className="scale-[400%]" checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className="absolute right-4 bottom-4">
        <Button className="cursor-pointer">
          <SettingsIcon className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}

export default App;
