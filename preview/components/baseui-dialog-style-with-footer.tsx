"use client";

import { Button } from "@/components/base-retroui/Button";
import { Text } from "@/components/base-retroui/Text";
import { Dialog } from "@/components/base-retroui/Dialog";

export default function DialogStyleWithFooter() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header position={"fixed"} asChild>
          <Text as="h5">Confirm your action?</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <section className="text-xl">
            <p>Are you sure you want to delete this item?</p>
            <p>This action cannout be undone.</p>
          </section>
        </section>
        <Dialog.Footer>
          <Dialog.Trigger asChild>
            <Button>Confirm</Button>
          </Dialog.Trigger>
          <Dialog.Trigger asChild>
            <Button variant={"outline"}>Close</Button>
          </Dialog.Trigger>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
