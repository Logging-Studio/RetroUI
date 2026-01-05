import { Tabs, TabsPanels, TabsTrigger, TabsContent, TabsTriggerList } from "@/components/retroui/Tab";

export default function TabStyleDefault() {
  return (
    <Tabs className="w-full">
      <TabsTriggerList>
        <TabsTrigger>Home</TabsTrigger>
        <TabsTrigger>About</TabsTrigger>
        <TabsTrigger>Contact</TabsTrigger>
      </TabsTriggerList>
      <TabsPanels>
        <TabsContent>
          Welcome to RetroUI, a retro styled UI library built with React,
          Tailwind CSS & Headless UI.
        </TabsContent>
        <TabsContent>This is the about section!</TabsContent>
        <TabsContent>And, this is the contact section!</TabsContent>
      </TabsPanels>
    </Tabs>
  );
}
