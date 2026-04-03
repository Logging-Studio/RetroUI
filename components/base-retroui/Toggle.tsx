"use client";

import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
    "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
    {
        variants: {
            variant: {
                default:
                    "bg-transparent hover:bg-muted/70 hover:text-muted-foreground data-[pressed]:bg-muted",
                outlined:
                    "border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground/80 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
                solid: "border-2 border-input bg-transparent hover:bg-secondary hover:text-secondary-foreground hover:border-secondary data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground data-[pressed]:border-secondary",
                "outline-muted":
                    "border-2 border-input bg-transparent hover:hover:bg-muted/70 hover:hover:text-muted-foreground data-[pressed]:bg-muted",
            },
            size: {
                default: "h-10 px-3 min-w-10",
                sm: "h-9 px-2.5 min-w-9",
                lg: "h-11 px-5 min-w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const Toggle = ({ className, variant, size, ref, ...props }: React.ComponentPropsWithRef<typeof BaseToggle.Root> & VariantProps<typeof toggleVariants>) => (
    <BaseToggle.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
    />
);

export { Toggle, toggleVariants };
