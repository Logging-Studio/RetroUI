"use client";

import { cn } from "@/lib/utils";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import React, { ComponentPropsWithoutRef } from "react";

const Menu = BaseMenu.Root;
const Trigger = BaseMenu.Trigger;

interface IMenuContent
  extends ComponentPropsWithoutRef<typeof BaseMenu.Popup> {}

const Content = ({ className, ...props }: IMenuContent) => (
  <BaseMenu.Portal>
    <BaseMenu.Popup
      className={cn(
        "bg-white border-2 shadow-md absolute top-2 min-w-20",
        className,
      )}
      {...props}
    />
  </BaseMenu.Portal>
);

const MenuItem = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative text-black flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-primary focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
MenuItem.displayName = "MenuItem";

const MenuComponent = Object.assign(Menu, {
  Trigger,
  Content,
  Item: MenuItem,
});

export { MenuComponent as Menu };
