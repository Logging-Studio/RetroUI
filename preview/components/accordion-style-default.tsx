"use client";

import { Accordion } from "@/components/retroui/Accordion";

export default function AccordionStyleDefault() {
  return (
    <Accordion className="space-y-4 w-full">
      <Accordion.Item value="item-1">
        <Accordion.Header>Accordion Item 1</Accordion.Header>
        <Accordion.Content>
          This is the content of the first accordion item.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Header>Accordion Item 2</Accordion.Header>
        <Accordion.Content>
          This is the content of the second accordion item.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Header>Accordion Item 3</Accordion.Header>
        <Accordion.Content>
          This is the content of the third accordion item.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
