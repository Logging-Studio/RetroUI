"use client";

import { Tabs } from "@/components/retroui/Tab";

export default function TabStyleDefault() {
  return (
    <Tabs className="w-full">
      <Tabs.List>
        <Tabs.Trigger value="home">Home</Tabs.Trigger>
        <Tabs.Trigger value="about">About</Tabs.Trigger>
        <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="home">
        Welcome to RetroUI, a retro styled UI library built with React,
        Tailwind CSS & Headless UI.
      </Tabs.Content>
      <Tabs.Content value="about">This is the about section!</Tabs.Content>
      <Tabs.Content value="contact">And, this is the contact section!</Tabs.Content>
    </Tabs>
  );
}
