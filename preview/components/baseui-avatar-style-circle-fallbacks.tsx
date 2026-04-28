import { Avatar } from "@/components/base-retroui/Avatar";

export default function AvatarStyleFallback() {
  return (
    <Avatar>
      <Avatar.Image src="broken-link" alt="Arif Logs" />
      <Avatar.Fallback>AH</Avatar.Fallback>
    </Avatar>
  );
}
