"use client";

import { Command } from "@/components/base-retroui/Command";

import {
  Settings,
  User,
  Calendar,
  Calculator,
  Smile,
  CreditCard,
} from "lucide-react";

export default function CommandStyleDefault() {
  return (
    <div className="space-y-4">
      <Command className="border shadow-md md:min-w-[450px] max-w-[500px]">
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>
              <Calendar />
              <span>Calendar</span>
            </Command.Item>
            <Command.Item>
              <Smile />
              <span>Search Emoji</span>
            </Command.Item>
            <Command.Item disabled>
              <Calculator />
              <span>Calculator</span>
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item>
              <User />
              <span>Profile</span>
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <CreditCard />
              <span>Billing</span>
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Settings />
              <span>Settings</span>
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
