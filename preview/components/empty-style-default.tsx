import { Empty } from "@/components/retroui";

export default function DefaultEmpty() {
  return (
    <Empty>
      <Empty.Content>
        <Empty.Icon className="size-10 md:size-12" />
        <Empty.Title>No Results</Empty.Title>
        <Empty.Separator />
        <Empty.Description>
          Your search didn't match any items. Try adjusting your filters.
        </Empty.Description>
      </Empty.Content>
    </Empty>
  );
}
