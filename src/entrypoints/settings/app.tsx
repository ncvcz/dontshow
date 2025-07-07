import About from "./_components/sections/about";
import Filters from "./_components/sections/filters";
import General from "./_components/sections/general";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Tabs defaultValue="general">
        <TabsList className="w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <General />
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
