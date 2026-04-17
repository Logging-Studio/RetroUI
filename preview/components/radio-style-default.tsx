"use client";

import { RadioGroup } from "@/components/retroui/Radio";

export default function RadioStyleSizes() {
  return (
    <RadioGroup>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="1" />
        <label htmlFor="1"> Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="2" />
        <label htmlFor="2"> Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="3" />
        <label htmlFor="3"> Option 3</label>
      </div>
    </RadioGroup>
  );
}
