"use client";

import * as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Label } from "@/components/retroui/Label"
import { Textarea } from "@/components/retroui/Textarea"
import { Form } from "@base-ui/react";
import { Field } from "@/components/retroui/Field";

export default function DrawerStyleRightDirection() {
    return (
        <Drawer direction="right">
            <Drawer.Trigger>
                <Button>Review Us</Button>
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>Edit Profile</Drawer.Title>
                    <Drawer.Description>Make changes to your profile here. Click save when you're done.</Drawer.Description>
                </Drawer.Header>

                <Form className="flex flex-col space-y-4 p-4">
                     <Field className="flex flex-col space-y-2">
                        <Field.Label htmlFor="email">Email</Field.Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </Field>
                    <Field className="flex flex-col space-y-2">
                        <Field.Label htmlFor="comment">Comment</Field.Label>
                        <Textarea type="text" id="comment" placeholder="Enter your comment" />
                    </Field>
                </Form>
                <Drawer.Footer>
                    <div className="flex justify-start gap-3">
                        <Button>Submit</Button>
                        <Drawer.Close>
                            <Button variant="outline">Cancel</Button>
                        </Drawer.Close>
                    </div>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    )
}
