"use client";

import { Checkbox } from "@/components/base-retroui/Checkbox";
import { Text } from "@/components/base-retroui/Text";

export default function CheckboxStyleDefault() {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox />
      <Text>Accept terms and conditions</Text>
    </div>
  );
}
