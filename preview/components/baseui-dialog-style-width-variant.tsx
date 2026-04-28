"use client";

import { Button } from "@/components/base-retroui/Button";
import { Dialog } from "@/components/base-retroui/Dialog";
import { Text } from "@/components/base-retroui/Text";
import { useState } from "react";

type Variants =
  | "auto"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "screen";

export default function DialogStyleWidthVariant() {
  const [variant, setVariant] = useState<Variants>("auto");

  const sizes: Variants[] = [
    "auto",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "screen",
  ];

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content size={variant}>
        <Dialog.Header>
          <Text as="h5">Dialog with variants</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <section className="text-xl">
            <p>Choose your width size</p>
            <section className="flex flex-wrap gap-4">
              {sizes.map((singleVariant) => (
                <Button
                  key={"variant-list-" + singleVariant}
                  type="button"
                  variant={singleVariant == variant ? "default" : "outline"}
                  onClick={() => setVariant(singleVariant)}
                >
                  {singleVariant}
                </Button>
              ))}
            </section>
          </section>
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
