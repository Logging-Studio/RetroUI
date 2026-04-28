import { cn } from "@/lib/utils";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

const checkboxVariants = cva("border-2 rounded", {
  variants: {
    variant: {
      default: "data-[checked]:bg-primary data-[checked]:text-primary-foreground ",
      outline: "",
      solid:
        "data-[checked]:bg-foreground data-[checked]:text-background",
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

interface CheckboxProps
  extends React.ComponentProps<typeof BaseCheckbox.Root>,
    VariantProps<typeof checkboxVariants> {}

export const Checkbox = ({
  className,
  size,
  variant,
  ...props
}: CheckboxProps) => (
  <BaseCheckbox.Root
    className={cn(
      checkboxVariants({
        size,
        variant,
      }),
      className,
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="h-full w-full">
      <Check className="h-full w-full" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
);
