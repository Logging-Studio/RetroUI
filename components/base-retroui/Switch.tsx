"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

const Switch = ({ className, ...props }: React.ComponentProps<typeof BaseSwitch.Root>) => (
  <BaseSwitch.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer border-2 border-foreground items-center disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary",
      className,
    )}
    {...props}
  >
    <BaseSwitch.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 bg-primary border-2 mx-0.5 border-foreground ring-0 transition-transform data-[checked]:translate-x-5 data-[unchecked]:translate-x-0 data-[checked]:bg-background",
      )}
    />
  </BaseSwitch.Root>
);

export { Switch };
