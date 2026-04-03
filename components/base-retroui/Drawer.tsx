"use client"

import * as React from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close>) {
  return <BaseDrawer.Close data-slot="drawer-close" {...props} />
}

function DrawerBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Backdrop>) {
  return (
    <BaseDrawer.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerBackdrop />
      <BaseDrawer.Popup
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=top]:rounded-b data-[side=top]:border-b-2",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:rounded-t data-[side=bottom]:border-t-2",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-3/4 data-[side=right]:border-l-2 data-[side=right]:sm:max-w-sm",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-3/4 data-[side=left]:border-r-2 data-[side=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-foreground mx-auto mt-4 hidden h-1 w-[60px] shrink-0 rounded-full group-data-[side=bottom]/drawer-content:block" />
        {children}
      </BaseDrawer.Popup>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      className={cn("text-foreground text-xl font-head font-medium", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

const DrawerComponent = Object.assign(Drawer, {
    Trigger: DrawerTrigger,
    Portal: DrawerPortal,
    Backdrop: DrawerBackdrop,
    Close: DrawerClose,
    Content: DrawerContent,
    Header: DrawerHeader,
    Footer: DrawerFooter,
    Title: DrawerTitle,
    Description: DrawerDescription,
});

export { DrawerComponent as Drawer };
