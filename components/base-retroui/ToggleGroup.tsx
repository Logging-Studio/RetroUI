"use client";

import * as React from "react";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "./Toggle";

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants>
>({
    size: "default",
    variant: "default",
});

const ToggleGroup = React.forwardRef<
    React.ElementRef<typeof BaseToggleGroup.Root>,
    React.ComponentPropsWithoutRef<typeof BaseToggleGroup.Root> &
        VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
    <BaseToggleGroup.Root
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
    >
        <ToggleGroupContext.Provider value={{ variant, size }}>
            {children}
        </ToggleGroupContext.Provider>
    </BaseToggleGroup.Root>
));

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
    React.ElementRef<typeof BaseToggleGroup.Item>,
    React.ComponentPropsWithoutRef<typeof BaseToggleGroup.Item> &
        VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    return (
        <BaseToggleGroup.Item
            ref={ref}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className,
            )}
            {...props}
        >
            {children}
        </BaseToggleGroup.Item>
    );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
