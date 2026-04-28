"use client";

import { Slider } from "@/components/retroui/Slider";

export default function SliderDefault() {
  return (
    <div className="w-[400px]">
      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        aria-label="Slider Control"
      />
    </div>
  );
}
