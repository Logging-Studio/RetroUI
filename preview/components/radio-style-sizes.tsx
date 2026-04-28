"use client";

import { RadioGroup } from "@/components/retroui/Radio";

export default function RadioStyleSizes() {
  return (
    <div className="flex gap-4">
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="sm" size="sm" />
          <label htmlFor="sm" className="text-sm">
            Small
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="md" size="md" />
          <label htmlFor="md">Medium</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="lg" size="lg" />
          <label htmlFor="lg" className="text-lg">
            Large Size
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
