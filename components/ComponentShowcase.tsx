import { componentConfig } from "@/config";
import { TabGroup, TabList, TabPanels, TabPanel, Tab } from "@headlessui/react";
import React, { HTMLAttributes } from "react";
import { Button } from "./retroui";

interface IComponentShowcase extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof componentConfig.examples;
}

export function ComponentShowcase({ name, children }: IComponentShowcase) {
  // Get the example config
  const exampleConfig = componentConfig.examples[name];
  const Preview = exampleConfig?.preview;

  const Code = React.Children.toArray(children)[0];
  return (
    <TabGroup>
      <TabList className="border bg-card p-1 text-sm inline-flex">
        <Tab className="w-20 cursor-pointer relative text-sm p-1 bg-transparent data-selected:border data-selected:bg-primary data-selected:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Preview
        </Tab>
        <Tab className="w-20 cursor-pointer relative p-1 bg-transparent data-selected:border data-selected:bg-primary data-selected:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Code
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="border px-4 lg:px-12 py-24 flex justify-center items-center min-h-80 mt-4 relative bg-card">
            {Preview ? <Preview /> : <div className="text-muted-foreground">Preview not available</div>}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="relative rounded-sm overflow-auto">{Code}</div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
