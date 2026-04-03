import { cn } from "@/lib/utils";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
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

const radioIndicatorVariants = cva("flex ", {
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

interface RadioGroupProps
  extends React.ComponentProps<typeof RadioPrimitive.Root> {}

export const RadioGroupRoot = ({ className, ...props }: RadioGroupProps) => (
  <RadioPrimitive.Root className={cn("grid gap-2", className)} {...props} />
);

interface RadioProps
  extends React.ComponentProps<typeof RadioPrimitive.Item>,
    VariantProps<typeof radioVariants> {}

export const RadioItem = ({
  children,
  className,
  size,
  variant,
  ...props
}: RadioProps) => (
  <RadioPrimitive.Item
    {...props}
    className={cn(
      radioVariants({
        size,
        variant,
      }),
      className,
    )}
  >
    <RadioPrimitive.Indicator className="flex justify-center items-center">
      <span className={radioIndicatorVariants({ size, variant })}></span>
    </RadioPrimitive.Indicator>
    {children}
  </RadioPrimitive.Item>
);

const RadioComponent = Object.assign(RadioGroupRoot, {
  Item: RadioItem,
});

export { RadioComponent as RadioGroup };
