import { Text, Card, Avatar } from "@/components/retroui";

interface TestimonialCardProps {
  quote: string;
  avatarSrc: string;
  name: string;
  title: string;
}

export default function TestimonialCard({
  quote,
  avatarSrc,
  name,
  title,
}: TestimonialCardProps) {
  return (
    <Card className="w-full max-w-[400px] shadow-none hover:shadow-md">
      <Card.Content>
        <Text className="text-lg">{quote}</Text>

        <div className="flex items-center space-x-2 mt-6">
          <Avatar className="h-10 w-10">
            <Avatar.Image alt={`${name} avatar`} src={avatarSrc} />
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
