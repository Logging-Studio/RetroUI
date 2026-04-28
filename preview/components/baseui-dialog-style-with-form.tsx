"use client";

import { Button } from "@/components/base-retroui/Button";
import { Dialog } from "@/components/base-retroui/Dialog";
import { Input } from "@/components/base-retroui/Input";
import { Text } from "@/components/base-retroui/Text";

export default function DialogStyleWithForm() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open Form</Button>
      </Dialog.Trigger>
      <Dialog.Content size={"md"}>
        <Dialog.Header position={"fixed"}>
          <Text as="h5">Contact Us</Text>
        </Dialog.Header>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col p-4 gap-4">
            <div className="flex-col gap-2">
              <label htmlFor="name">
                Your name <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Type your name" required />
            </div>
            <div className="flex-col gap-2">
              <label htmlFor="name">
                Your e-email <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Type your name" required />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Trigger asChild>
              <Button type="submit">Submit</Button>
            </Dialog.Trigger>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
