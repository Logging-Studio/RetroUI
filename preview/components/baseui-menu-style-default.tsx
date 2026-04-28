"use client";

import { Button } from "@/components/base-retroui/Button";
import { Menu } from "@/components/base-retroui/Menu";

export default function MenuDefault() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>Menu</Button>
      </Menu.Trigger>
      <Menu.Content className="min-w-36">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
