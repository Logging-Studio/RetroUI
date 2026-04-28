"use client";

import { RadioGroup } from "@/components/base-retroui/Radio";

export default function RadioStyleVariants() {
  return (
    <div className="flex gap-4">
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="default" variant="default" />
          <label htmlFor="default">Default Style</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="outline" variant="outline" />
          <label htmlFor="outline">Outline Style</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item value="solid" variant="solid" />
          <label htmlFor="solid">Solid Style</label>
        </div>
      </RadioGroup>
    </div>
  );
}
