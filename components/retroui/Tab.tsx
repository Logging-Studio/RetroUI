import { cn } from "@/lib/utils";
import {
  Tab,
  TabGroup,
  TabList,
  TabListProps,
  TabPanel,
  TabPanelProps,
  TabPanels,
  TabProps,
} from "@headlessui/react";

const Tabs = TabGroup;
const TabsPanels = TabPanels;

interface ITabsTriggerList extends TabListProps {
  className?: string;
}
const TabsTriggerList = ({
  children,
  className,
  ...props
}: ITabsTriggerList) => {
  return (
    <TabList className={cn("flex flex-row space-x-2 w-full", className)} {...props}>
      {children}
    </TabList>
  );
};

interface ITabsTrigger extends TabProps {
  className?: string;
}
const TabsTrigger = ({ children, className, ...props }: ITabsTrigger) => {
  return (
    <Tab
      className={cn(
        "px-4 py-1 border-2 border-transparent data-selected:border-border data-selected:bg-primary data-selected:text-primary-foreground data-selected:font-semibold focus:outline-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </Tab>
  );
};

interface ITabsContent extends TabPanelProps {
  className?: string;
}
const TabsContent = ({ children, className, ...props }: ITabsContent) => {
  return (
    <TabPanel
      className={cn("border-2 border-border mt-2 p-4 w-full", className)}
      {...props}
    >
      {children}
    </TabPanel>
  );
};

export { Tabs, TabsPanels, TabsTrigger, TabsContent, TabsTriggerList };
