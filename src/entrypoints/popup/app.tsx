import Disabled from "./_components/disabled";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCurrentTab } from "@/hooks/browser";
import { useStorage } from "@/hooks/storage";
import { PointerIcon, SettingsIcon } from "lucide-react";

function App() {
  const currentTab = useCurrentTab();
  const [disabledWebsites, setDisabledWebsites] = useStorage<string[]>(
    "local:disabledWebsites",
    []
  );

  const handleDisableWebsite = (checked: boolean) => {
    if (!currentTab || !currentTab.url) return;

    const hostname = new URL(currentTab.url!).hostname;

    if (checked) {
      setDisabledWebsites(disabledWebsites.filter((site: string) => site !== hostname));
    } else {
      setDisabledWebsites([...disabledWebsites, hostname]);
    }
  };

  if (
    !currentTab ||
    !currentTab.url ||
    currentTab.url.startsWith("about:") ||
    currentTab.url.startsWith("chrome://") ||
    currentTab.url.startsWith("chrome-extension://") ||
    currentTab.url.startsWith("file://")
  ) {
    return <Disabled />;
  }

  return (
    <div className="h-[300px] w-[250px]">
      <Card className="flex h-[50px] w-full items-center justify-center rounded-none border-x-0 border-t-0">
        <h1 className="text-center text-lg font-semibold">{new URL(currentTab.url).hostname}</h1>
      </Card>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Switch
          className="scale-[400%]"
          checked={!disabledWebsites.includes(new URL(currentTab.url!).hostname)}
          onCheckedChange={handleDisableWebsite}
        />
      </div>
      <div className="absolute right-2 bottom-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={async () =>
            await browser.tabs.sendMessage(currentTab.id!, "exposing-element-selection")
          }
        >
          <PointerIcon />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => browser.runtime.openOptionsPage()}>
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
}

export default App;
