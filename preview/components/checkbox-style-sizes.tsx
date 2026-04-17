"use client";

import { Checkbox } from "@/components/retroui/Checkbox";

export default function CheckboxStyleSizes() {
  return (
    <div className="flex gap-4">
      <Checkbox size="sm" />
      <Checkbox />
      <Checkbox size="lg" />
    </div>
  );
}
