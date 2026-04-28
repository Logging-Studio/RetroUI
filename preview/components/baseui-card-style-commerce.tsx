import { Button } from "@/components/base-retroui/Button";
import { Card } from "@/components/base-retroui/Card";

export default function CommerceCard() {
  return (
    <Card className="w-[350px] shadow-none hover:shadow-none">
      <Card.Content className="pb-0">
        <img
          src="/images/gameboy.jpg"
          className="w-full h-full"
          alt="Gameboy"
        />
      </Card.Content>
      <Card.Header className="pb-0">
        <Card.Title>Classic 8-bit Gameboy</Card.Title>
      </Card.Header>
      <Card.Content className="flex justify-between items-center">
        <p className="text-lg font-semibold">$29.90</p>
        <Button>Add to cart</Button>
      </Card.Content>
    </Card>
  );
}
