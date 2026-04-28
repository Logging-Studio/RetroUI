import { Button } from "@/components/base-retroui/Button";
import { PenIcon } from "lucide-react";

export default function ButtonStyleIcon() {
  return (
    <Button size="icon">
      <PenIcon className="w-4 h-4" />
    </Button>
  );
}
