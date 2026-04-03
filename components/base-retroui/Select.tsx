"use client";

import { cn } from "@/lib/utils";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const Select = BaseSelect.Root;

const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) => {
  return (
    <BaseSelect.Trigger
      className={cn(
        "flex h-10 rounded min-w-40 items-center shadow-md focus:shadow-xs justify-between border-2 border-input border-border bg-transparent px-4 py-2 placeholder:text-muted-foreground outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronDown className="ml-2 h-4 w-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
};

const SelectValue = BaseSelect.Value;

const SelectIcon = BaseSelect.Icon;

const SelectContent = ({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup> & { position?: "popper" | "item-aligned" }) => {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Popup
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden border border-border bg-background text-foreground shadow-md data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <BaseSelect.ScrollUpArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
          <ChevronUp className="h-4 w-4" />
        </BaseSelect.ScrollUpArrow>
        {children}
        <BaseSelect.ScrollDownArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
          <ChevronDown className="h-4 w-4" />
        </BaseSelect.ScrollDownArrow>
      </BaseSelect.Popup>
    </BaseSelect.Portal>
  );
};

const SelectGroup = BaseSelect.Group;

const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Option>) => (
  <BaseSelect.Option
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-1.5 px-2 outline-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground focus:bg-primary focus:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <BaseSelect.OptionText>{children}</BaseSelect.OptionText>

    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <BaseSelect.OptionIndicator>
        <Check className="h-4 w-4 text-foreground" />
      </BaseSelect.OptionIndicator>
    </span>
  </BaseSelect.Option>
);

const SelectLabel = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("py-1.5 px-2 text-sm font-semibold", className)} {...props} />
);

const SelectSeparator = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
);

const SelectObj = Object.assign(Select, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
});

export { SelectObj as Select };
