"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = BaseAccordion.Root;

const AccordionItem = ({ className, ref, ...props }: BaseAccordion.Item.Props) => (
  <BaseAccordion.Item
    ref={ref}
    className={cn(
      "border-2 bg-background rounded text-foreground shadow-md hover:shadow-sm data-[open]:shadow-sm transition-all overflow-hidden",
      className,
    )}
    {...props}
  />
);

const AccordionHeader = ({ className, children, ref, ...props }: BaseAccordion.Trigger.Props) => (
  <BaseAccordion.Header className="flex">
    <BaseAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-between px-4 py-2 font-head cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&[data-open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
);

const AccordionContent = ({ className, children, ref, ...props }:   BaseAccordion.Panel.Props) => (
  <BaseAccordion.Panel
    ref={ref}
    className="overflow-hidden font-body bg-white text-gray-700 data-[open]:animate-accordion-down data-[closed]:animate-accordion-up"
    {...props}
  >
    <div className={cn("px-4 pt-2 pb-4", className)}>{children}</div>
  </BaseAccordion.Panel>
);

const AccordionComponent = Object.assign(Accordion, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Content: AccordionContent,
});

export { AccordionComponent as Accordion };
