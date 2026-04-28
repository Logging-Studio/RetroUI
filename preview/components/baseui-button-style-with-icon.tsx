import { Button } from "@/components/base-retroui/Button";
import { Trash } from "lucide-react";

export default function ButtonStyleWithIcon() {
  return (
    <Button className="bg-destructive text-white hover:bg-destructive/90">
      <Trash className="h-4 w-4 mr-2" /> Delete
    </Button>
  );
}
