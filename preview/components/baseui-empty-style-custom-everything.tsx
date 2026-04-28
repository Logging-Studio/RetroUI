import { Button, Empty } from "@/components/retroui";
import { InboxIcon } from "lucide-react";


export default function CustomEverythingEmpty() {
  return (
    <Empty>
      <Empty.Content>
        <Empty.Icon>
          <InboxIcon className="size-10 md:size-12" />
        </Empty.Icon>
        <Empty.Title>No data</Empty.Title>
        <Empty.Description>
          Get started by creating your first item
        </Empty.Description>
        <Button>Create now</Button>
      </Empty.Content>
    </Empty>
  );
}
