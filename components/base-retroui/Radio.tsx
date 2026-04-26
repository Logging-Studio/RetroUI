"use client";

import { cn } from "@/lib/utils";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, VariantProps } from "class-variance-authority";

const radioVariants = cva("border-border border-2", {
  variants: {
    variant: {
      default: "",
      outline: "",
      solid: "",
    },
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const radioIndicatorVariants = cva("flex", {
  variants: {
    variant: {
      default: "bg-primary border-2 border-border",
      outline: "border-2 border-border",
      solid: "bg-border",
    },
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3.5 w-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

function RadioGroupRoot({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

interface RadioItemProps
  extends RadioPrimitive.Root.Props,
    VariantProps<typeof radioVariants> {}

function RadioItem({
  className,
  size,
  variant,
  ...props
}: RadioItemProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        radioVariants({
          size,
          variant,
        }),
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span className={radioIndicatorVariants({ size, variant })} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

const RadioComponent = Object.assign(RadioGroupRoot, {
  Item: RadioItem,
});

export { RadioComponent as RadioGroup };
