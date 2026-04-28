"use client";

import { Button, Tooltip } from "@/components/retroui";

export default function TooltipStyleSolid() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover</Button>
        </Tooltip.Trigger>
        <Tooltip.Content variant="solid">Add to Library</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  );
}
