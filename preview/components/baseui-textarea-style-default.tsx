"use client";

import { Textarea } from "@/components/base-retroui/Textarea";

export default function TextareaStyleDefault() {
  return (
    <Textarea
      rows={4}
      placeholder="type something..."
      className="px-4 py-2 w-full border-2 shadow-md transition focus:outline-hidden focus:shadow-xs"
    />
  );
}
