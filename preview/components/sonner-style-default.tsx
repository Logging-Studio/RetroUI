"use client";

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleDefault() {
  const onClick = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2025",
      cancel: {
        label: "Undo",
        onClick: () => {},
      },
    });
  };

  return <Button onClick={onClick}>Show Toast</Button>;
}
