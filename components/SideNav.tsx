"use client";

import { navConfig } from "@/config/navigation";
import { Badge, Text } from "@/components/retroui";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export default function SideNav({ setIsOpen }: SideNavProps) {
  const pathname = usePathname();

  return (
    <div className="sidebar-scroll border-r-2 overflow-y-scroll overscroll-y-contain h-full w-full bg-background flex flex-col justify-start py-8">
      <nav
        className="flex flex-col items-start max-lg:px-6 space-y-4"
        aria-label="Main navigation"
      >
        {navConfig.sideNavItems.map((item) => (
          <div key={item.title} className="w-full">
            <Text as="h5">{item.title}</Text>
            <div className="flex flex-col w-full">
              {item.children.map((child) => (
                <Link
                  key={child.title}
                  href={child.href}
                  onClick={() => setIsOpen && setIsOpen(false)}
                  target={child.href.startsWith("http") ? "_blank" : "_self"}
                  className={`px-2 py-1 w-full border border-transparent text-muted-foreground flex items-center justify-between hover:text-foreground hover:bg-muted/50 transition-colors ${
                    pathname === child.href &&
                    "bg-primary text-primary-foreground"
                  }`}
                >
                  {child.title}
                  {child.tag && (
                    <Badge
                      size="sm"
                      className="py-0.5 px-1.5 border text-xs border-secondary text-muted-foreground bg-secondary/10"
                    >
                      {child.tag}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
