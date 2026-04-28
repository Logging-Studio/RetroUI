"use client";

import { Toggle } from "@/components/retroui";
import { Bold } from "lucide-react";

export default function ToggleStyleOutlineMuted() {
  return (
    <Toggle variant="outline-muted">
      <Bold />
    </Toggle>
  );
}
