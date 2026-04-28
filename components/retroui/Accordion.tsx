"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn(
      "border-2 bg-background rounded text-foreground shadow-md hover:shadow-sm data-[state=open]:shadow-sm transition-all overflow-hidden",
      className,
    )}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

interface AccordionHeaderProps extends AccordionPrimitive.AccordionTriggerProps {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
}

const AccordionHeader = ({
  className,
  children,
  icon,
  openIcon,
  closedIcon,
  ...props
}: AccordionHeaderProps) => {
  const renderIcon = () => {
    if (openIcon && closedIcon) {
      return (
        <>
          <span className="shrink-0 [[data-state=open]_&]:hidden">{closedIcon}</span>
          <span className="shrink-0 [[data-state=closed]_&]:hidden">{openIcon}</span>
        </>
      );
    }
    return icon || <ChevronDown className="h-4 w-4" />;
  };

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-start justify-between px-4 py-2 font-head cursor-pointer focus:outline-hidden [&>*]:transition-all [&>*]:duration-300 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        {renderIcon()}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};
AccordionHeader.displayName = "AccordionHeader";

const AccordionContent = ({ className, children, ...props }: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className="overflow-hidden font-body text-gray-700 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
    {...props}
  >
    <div className={cn("px-4 pt-2 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = "AccordionContent";

const AccordionComponent = Object.assign(Accordion, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Content: AccordionContent,
});

export { AccordionComponent as Accordion };
