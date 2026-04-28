"use client";

import * as React from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

const Progress = ({ className, value, ref, ...props }: React.ComponentPropsWithRef<typeof BaseProgress.Root>) => (
  <BaseProgress.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden bg-background border-2",
      className,
    )}
    value={value}
    {...props}
  >
    <BaseProgress.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </BaseProgress.Root>
);

export { Progress };
