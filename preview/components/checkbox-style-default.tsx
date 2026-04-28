"use client";

import { Checkbox } from "@/components/retroui/Checkbox";
import { Text } from "@/components/retroui/Text";

export default function CheckboxStyleDefault() {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox />
      <Text>Accept terms and conditions</Text>
    </div>
  );
}
