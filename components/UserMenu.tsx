"use client";

import React from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogOut, Building } from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useAuth } from "@/contexts/AuthContext";
import type { User as UserType } from "@/types/auth";
import { Badge } from "./retroui";

export default function UserMenu({ user }: { user: UserType }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="outline-none">
          <Avatar className="w-10 h-10 cursor-pointer border" {...genConfig(user?.email || "User")} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[240px] bg-white border-2 border-black mt-2 relative z-10 shadow-md"
          sideOffset={8}
          align="end"
        >
          <div className="relative bg-popover">
            {/* User Info Header */}
            <div className="flex items-center space-x-2 p-4">
              <Avatar className="size-14 border bg-primary" {...genConfig(user?.email || "User")} />
              <div>
                <p className="font-medium mb-1">{user.name || "User"}</p>
                <Badge size="sm" variant="solid">
                  {user.isPro ? "Pro" : "Essential"} Plan
                </Badge>
              </div>
            </div>

            <hr className="border mb-2" />

            {/* Menu Items */}
            <div className="space-y-1 p-4">
              {user.isOrg && (
                <DropdownMenu.Item asChild>
                  <Link
                    href="/organization"
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary transition-colors duration-200 outline-none cursor-pointer"
                  >
                    <Building className="w-4 h-4" />
                    <span>Organization</span>
                  </Link>
                </DropdownMenu.Item>
              )}

              <DropdownMenu.Item asChild>
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary transition-colors duration-200 outline-none cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-primary transition-colors duration-200 outline-none cursor-pointer text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </DropdownMenu.Item>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
