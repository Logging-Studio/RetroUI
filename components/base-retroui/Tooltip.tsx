"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const tooltipContentVariants = cva(
  "z-50 overflow-hidden border-2 border-border bg-background px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        solid: "bg-black text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TooltipProvider = BaseTooltip.Provider;

const Tooltip = BaseTooltip.Root;

const TooltipTrigger = BaseTooltip.Trigger;

const TooltipContent = ({ className, variant, ref, ...props }: React.ComponentPropsWithRef<typeof BaseTooltip.Popup> & VariantProps<typeof tooltipContentVariants>) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Popup
      ref={ref}
      className={cn(
        tooltipContentVariants({
          variant,
          className,
        }),
      )}
      {...props}
    />
  </BaseTooltip.Portal>
);

const TooltipObject = Object.assign(Tooltip, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
});

export { TooltipObject as Tooltip };
