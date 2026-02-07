import { Empty } from "@/components/retroui/Empty";

export default function CustomIconEmpty() {
  return (
    <Empty>
      <Empty.Content>
        <Empty.Icon>
          <span className="text-4xl">👻</span>
        </Empty.Icon>
        <Empty.Title>No data</Empty.Title>
        <Empty.Separator />
        <Empty.Description>
          There is nothing to show here yet. Imagine you wrote some good stuff
          here.
        </Empty.Description>
      </Empty.Content>
    </Empty>
  );
}
