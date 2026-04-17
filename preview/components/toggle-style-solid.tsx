"use client";

import { Toggle } from "@/components/retroui";
import { Italic } from "lucide-react";

export default function ToggleStyleSolid() {
  return (
    <Toggle variant="solid">
      <Italic /> Italics
    </Toggle>
  );
}
