import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import { HTMLAttributes } from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./retroui";

interface IComponentShowcase extends HTMLAttributes<HTMLDivElement> {}

const CopyableCommand = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-2 group">
      <code className="flex-1 overflow-x-auto">{command}</code>
      <Button size="sm" onClick={copyToClipboard} className="hidden md:block" title="Copy to clipboard">
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button className="md:hidden" size="icon" onClick={copyToClipboard} title="Copy to clipboard mobile">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export function CliCommand({
  npmCommand,
  yarnCommand,
  pnpmCommand,
  bunCommand,
}: {
  npmCommand: string;
  yarnCommand?: string;
  pnpmCommand?: string;
  bunCommand?: string;
}) {
  const isNpx = npmCommand.includes("npx");
  if (isNpx) {
    pnpmCommand = pnpmCommand ?? npmCommand.replace("npx", "pnpm dlx");
    yarnCommand = yarnCommand ?? npmCommand.replace("npx", "yarn dlx");
    bunCommand = bunCommand ?? npmCommand.replace("npx", "bunx");
  } else {
    pnpmCommand = pnpmCommand ?? npmCommand.replace("npm", "pnpm");
    yarnCommand = yarnCommand ?? npmCommand.replace("npm install", "yarn add");
    bunCommand = bunCommand ?? npmCommand.replace("npm", "bun");
  }

  return (
    <TabGroup className="p-4 my-2 bg-gray-800 rounded-md text-background/90 w-full">
      <TabList className="flex space-x-4 mb-6 text-sm">
        <Tab className="cursor-pointer text-gray-400 relative px-2 py-1 bg-transparent data-selected:border-b-2 border-accent data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          pnpm
        </Tab>
        <Tab className="cursor-pointer text-gray-400 relative px-2 py-1 bg-transparent data-selected:border-b-2 border-accent data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          npm
        </Tab>
        <Tab className="cursor-pointer text-gray-400 relative px-2 py-1 bg-transparent data-selected:border-b-2 border-accent data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          yarn
        </Tab>
        <Tab className="cursor-pointer text-gray-400 relative px-2 py-1 bg-transparent data-selected:border-b-2 border-accent data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          bun
        </Tab>
      </TabList>
      <TabPanels className="text-sm text-accent">
        <TabPanel>
          <CopyableCommand command={pnpmCommand} />
        </TabPanel>
        <TabPanel>
          <CopyableCommand command={npmCommand} />
        </TabPanel>
        <TabPanel>
          <CopyableCommand command={yarnCommand} />
        </TabPanel>
        <TabPanel>
          <CopyableCommand command={bunCommand} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

function ComponentInstallCli({
  npmCommand,
  yarnCommand,
  pnpmCommand,
  bunCommand,
}: {
  npmCommand: string;
  yarnCommand?: string;
  pnpmCommand?: string;
  bunCommand?: string;
}) {
  return (
    <TabPanel>
      <CliCommand
        npmCommand={npmCommand}
        yarnCommand={yarnCommand}
        pnpmCommand={pnpmCommand}
        bunCommand={bunCommand}
      />
    </TabPanel>
  );
}

function ComponentInstallManual({ children }: { children: React.ReactNode }) {
  return <TabPanel>{children}</TabPanel>;
}

function ComponentInstall({ children }: IComponentShowcase) {
  return (
    <TabGroup>
      <TabList className="border-b bg-transparent flex space-x-4 mb-6 text-sm">
        <Tab className="min-w-12 cursor-pointer relative px-2 py-1 bg-transparent data-selected:border data-selected:border-b-0 data-selected:bg-black data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          CLI
        </Tab>
        <Tab className="min-w-12 cursor-pointer relative px-2 py-1 bg-transparent data-selected:border data-selected:border-b-0 data-selected:bg-black data-selected:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Manual
        </Tab>
      </TabList>

      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
}

Object.assign(ComponentInstall, {
  Cli: ComponentInstallCli,
  Manual: ComponentInstallManual,
});

export { ComponentInstall };
