"use client";

import * as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"

export default function DrawerStyleDefault() {
    return (
        <Drawer>
            <Drawer.Trigger>
                <Button>Submit</Button>
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>Are you absolutely sure?</Drawer.Title>
                    <Drawer.Description>This action cannot be undone.</Drawer.Description>
                </Drawer.Header>
                <Drawer.Footer>
                    <div className="flex justify-center gap-3">
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
