"use client";

import { ContextMenu } from "@/components/base-retroui/ContextMenu";

export default function ContextMenuStyleDefault() {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <ContextMenu>
        <ContextMenu.Trigger
          className="flex h-[150px] w-[300px] items-center justify-center 
            border-2 border-dashed border-border text-sm bg-background 
            transition-all"
        >
          Right click here
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Cut</ContextMenu.Item>
          <ContextMenu.Item>Paste</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Share</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More options</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Archive</ContextMenu.Item>
              <ContextMenu.Item>Delete</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Separator />
          <ContextMenu.CheckboxItem checked>
            Show hidden files
          </ContextMenu.CheckboxItem>
          <ContextMenu.RadioGroup value="one">
            <ContextMenu.Label>View mode</ContextMenu.Label>
            <ContextMenu.RadioItem value="one">List</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="two">Grid</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  );
}
