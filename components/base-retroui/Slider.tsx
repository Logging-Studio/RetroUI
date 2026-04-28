"use client";

import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

const Slider = ({ className, ref, ...props }: React.ComponentPropsWithRef<typeof BaseSlider.Root>) => (
  <BaseSlider.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <BaseSlider.Track className="relative h-3 w-full grow overflow-hidden bg-background border-2">
      <BaseSlider.Indicator className="absolute h-full bg-primary" />
    </BaseSlider.Track>
    <BaseSlider.Thumb className="block h-4.5 w-4.5 border-2 bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </BaseSlider.Root>
);

export { Slider };
