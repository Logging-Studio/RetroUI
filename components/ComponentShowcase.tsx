import { componentConfig } from "@/config";
import { TabGroup, TabList, TabPanels, TabPanel, Tab } from "@headlessui/react";
import React, { HTMLAttributes } from "react";
import { Button } from "./retroui";

interface IComponentShowcase extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof componentConfig.examples;
}

export function ComponentShowcase({ name, children }: IComponentShowcase) {
  // Get the example config, with fallback if Base UI preview doesn't exist
  const exampleConfig = componentConfig.examples[name];

  // If baseui- preview doesn't exist, fallback to radix version
  let Preview;
  if (exampleConfig) {
    Preview = exampleConfig.preview;
  } else if (typeof name === 'string' && name.startsWith('baseui-')) {
    // Fallback to Radix version
    const radixName = name.replace('baseui-', '');
    const radixConfig = componentConfig.examples[radixName as keyof typeof componentConfig.examples];
    Preview = radixConfig?.preview;
  }

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
          <div className="border px-6 lg:px-12 py-24 flex justify-center items-center min-h-80 mt-4 relative bg-card">
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
