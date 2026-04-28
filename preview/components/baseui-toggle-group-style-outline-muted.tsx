"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleOutlineMuted() {
  return (
    <ToggleGroup type="multiple" variant="outline-muted">
      <ToggleGroupItem value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
