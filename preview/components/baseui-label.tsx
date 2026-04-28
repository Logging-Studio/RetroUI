"use client";

import { Checkbox } from "@/components/retroui";
import { Label } from "@/components/retroui";

export default function LabelDefault() {
  return (
    <div className="flex items-center bg-background space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
