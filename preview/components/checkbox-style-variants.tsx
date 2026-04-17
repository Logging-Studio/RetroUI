"use client";

import { Checkbox } from "@/components/retroui/Checkbox";

export default function CheckboxStyleVariants() {
  return (
    <div className="flex gap-4">
      <Checkbox />
      <Checkbox variant="outline" />
      <Checkbox variant="solid" />
    </div>
  );
}
