"use client";

import * as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Label } from "@/components/retroui/Label"
import { Textarea } from "@/components/retroui/Textarea"

export default function DrawerStyleRightDirection() {
    return (
        <Drawer swipeDirection="right">
            <Drawer.Trigger>
                <Button>Review Us</Button>
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>Edit Profile</Drawer.Title>
                    <Drawer.Description>Make changes to your profile here. Click save when you're done.</Drawer.Description>
                </Drawer.Header>

                <form className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Comment</Label>
                        <Textarea rows={4} placeholder="Enter your comment" />
                    </div>
                </form>
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
