"use client";

import { Popover, Label, Button, Input } from "@/components/retroui";

export default function PopoverStyleDefaultShadow() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content className="w-80 shadow-md">
        <Popover.Header>
          <Popover.Title>Popover Title</Popover.Title>
          <Popover.Description>
            This is a popover description.
          </Popover.Description>
        </Popover.Header>
      </Popover.Content>
    </Popover>
  );
}
