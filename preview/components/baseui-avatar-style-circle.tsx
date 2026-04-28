import { Avatar } from "@/components/base-retroui/Avatar";

export default function AvatarStyleCircle() {
  return (
    <Avatar>
      <Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
      <Avatar.Fallback>AH</Avatar.Fallback>
    </Avatar>
  );
}
