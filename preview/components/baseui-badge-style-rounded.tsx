import { Badge } from "@/components/base-retroui/Badge";

export default function BadgeStyleRounded() {
  return (
    <div className="space-x-4">
      <Badge variant="solid" className="rounded-sm">
        Rounded
      </Badge>
      <Badge variant="solid" className="rounded-full">
        Full
      </Badge>
    </div>
  );
}
