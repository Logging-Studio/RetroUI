import { cn } from "@/lib/utils";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";

const Tabs = BaseTabs.Root;
const TabsPanels = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div className={className} {...props}>
    {children}
  </div>
);

interface ITabsTriggerList extends React.ComponentProps<typeof BaseTabs.List> {
  className?: string;
}
const TabsTriggerList = ({
  children,
  className,
  ...props
}: ITabsTriggerList) => {
  return (
    <BaseTabs.List className={cn("flex flex-row space-x-2 w-full", className)} {...props}>
      {children}
    </BaseTabs.List>
  );
};

interface ITabsTrigger extends React.ComponentProps<typeof BaseTabs.Tab> {
  className?: string;
}
const TabsTrigger = ({ children, className, ...props }: ITabsTrigger) => {
  return (
    <BaseTabs.Tab
      className={cn(
        "px-4 flex items-center py-1 border-2 border-transparent data-[active]:border-border data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:font-semibold focus:outline-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </BaseTabs.Tab>
  );
};

interface ITabsContent extends React.ComponentProps<typeof BaseTabs.Panel> {
  className?: string;
}
const TabsContent = ({ children, className, ...props }: ITabsContent) => {
  return (
    <BaseTabs.Panel className={cn("mt-2 w-full", className)} {...props}>
      {children}
    </BaseTabs.Panel>
  );
};

const TabsObj = Object.assign(BaseTabs.Root, {
  List: TabsTriggerList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsObj as Tabs };