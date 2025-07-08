import { Setting } from "../ui/setting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings } from "@/types";
import { Trash2Icon } from "lucide-react";

export default function General() {
  const [enable, setEnable] = useStorage<boolean>("local:enabled", true);
  const [settings, setSettings] = useStorage<Settings>("local:settings", {});
  const [disabledWebsites, setDisabledWebsites] = useStorage<string[]>(
    "local:disabledWebsites",
    []
  );

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground text-base">
        Here you can manage general settings for the extension, such as enabling or disabling it,
        and adjusting other preferences.
      </p>

      <div>
        <Setting
          title="Enable Extension"
          description="Toggle the extension on or off globally."
          checked={enable}
          onChange={value => setEnable(value)}
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">General Settings</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title="Sensitive Alert"
          description="Show a warning when a page contains sensitive content."
          checked={settings.sensitiveAlert}
          onChange={value => setSettings({ ...settings, sensitiveAlert: value })}
        />
        <Setting
          title="Censure Inputs"
          description="Automatically censure inputs containing sensitive content."
          checked={settings.inputCensoring}
          onChange={value => setSettings({ ...settings, inputCensoring: value })}
        />
        <Setting
          title="Uncensor Inputs on Focus"
          description="Uncensor inputs when they are focused, allowing you to see the original content."
          checked={settings.uncensorOnFocus}
          onChange={value => setSettings({ ...settings, uncensorOnFocus: value })}
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">Websites Settings</h2>
      <Setting
        title="Enable on Localhost"
        description="Enable the extension on localhost for development purposes."
        checked={settings.enableOnLocalhost}
        onChange={value => setSettings({ ...settings, enableOnLocalhost: value })}
      />
      <Card>
        <CardContent>
          <h3 className="mt-2 text-lg font-semibold">Ignored Websites</h3>
          {disabledWebsites.length === 0 ? (
            <p className="text-muted-foreground text-base">
              No websites are disabled. You can disable websites by going to it and disabling it
              from the extension popup.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disabledWebsites.map(website => (
                  <TableRow key={website}>
                    <TableCell>{website}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          setDisabledWebsites(disabledWebsites.filter(w => w !== website))
                        }
                        variant="destructive"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <h2 className="mt-6 text-2xl font-semibold">Developer Settings</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title="Debug Messages"
          description="Show debug messages in the console."
          checked={settings.debugMessages}
          onChange={value => setSettings({ ...settings, debugMessages: value })}
        />
      </div>
    </div>
  );
}
