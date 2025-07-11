import About from "./_components/sections/about";
import Filters from "./_components/sections/filters";
import Settings from "./_components/sections/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation("settings", { keyPrefix: "tabs" });

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Tabs defaultValue="settings">
        <TabsList className="w-full">
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
          <TabsTrigger value="filters">{t("filters")}</TabsTrigger>
          <TabsTrigger value="about">{t("about")}</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="filters">
          <Filters />
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
