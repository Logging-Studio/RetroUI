"use client";

import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const popoverContentVariants = cva(
  "z-50 w-72 border-2 bg-background p-4 text-popover-foreground outline-none data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
);

const Popover = BasePopover.Root;

const PopoverTrigger = BasePopover.Trigger;

const PopoverAnchor = BasePopover.Anchor;

const PopoverContent = ({ className, align = "center", sideOffset = 4, ref, ...props }: React.ComponentPropsWithRef<typeof BasePopover.Popup> & VariantProps<typeof popoverContentVariants>) => (
  <BasePopover.Portal>
    <BasePopover.Popup
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        popoverContentVariants({
          className,
        }),
      )}
      {...props}
    />
  </BasePopover.Portal>
);

const PopoverObject = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
});

export { PopoverObject as Popover };
