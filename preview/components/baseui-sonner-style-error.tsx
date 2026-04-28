"use client";

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleError() {
  const onClick = () => {
    toast.error("Oops! you ran into a pot hole");
  };

  return <Button onClick={onClick}>Show Toast (Error)</Button>;
}
