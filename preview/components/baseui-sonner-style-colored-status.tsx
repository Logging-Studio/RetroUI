"use client";

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleRichColors() {
  const onClick = () => {
    toast.success("Congrats man (Colored) 🎉", {
      richColors: true,
    });
  };

  return <Button onClick={onClick}>Congratulate Me</Button>;
}
