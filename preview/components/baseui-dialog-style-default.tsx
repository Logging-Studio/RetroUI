"use client";

import { Button } from "@/components/base-retroui/Button";
import { Dialog } from "@/components/base-retroui/Dialog";
import { Text } from "@/components/base-retroui/Text";

export default function DialogStyleDefault() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Text as="h5">Confirm your action?</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <section className="text-xl">
            <p>Are you sure you want to delete this item?</p>
            <p>This action cannout be undone.</p>
          </section>
          <section className="flex w-full justify-end">
            <Dialog.Trigger>
              <Button>Confirm</Button>
            </Dialog.Trigger>
          </section>
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
