"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/retroui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { navConfig } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";

export default function TopNav() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`container mx-auto sticky z-50 w-full transition-all duration-300 px-4 ${
        isScrolled ? "top-4" : "top-0"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-card border-2 px-6 max-w-7xl"
            : "px-4 lg:px-0"
        }`}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="shrink-0">
            <a
              href="/"
              className="text-black font-head text-2xl flex items-end"
            >
              <Image
                src="/images/logo.png"
                alt="retro ui logo"
                className="mr-2"
                height={30}
                width={30}
              />
              <div className="text-foreground">RetroUI</div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {navConfig.topNavItems.map((item) => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <NavigationMenuItem key={item.title} className="relative">
                        <NavigationMenuTrigger>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="border">
                          <div className="w-48 p-2">
                            {item.children.map((child) => (
                              <NavigationMenuLink key={child.title} asChild className="hover:bg-none hover:underline decoration-primary decoration-4 underline-offset-4">
                                <Link
                                  href={child.href}
                                  className="hover:bg-none hover:underline decoration-primary decoration-4 underline-offset-4"
                                >
                                  {child.title}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild className="hover:bg-none hover:underline decoration-primary decoration-4 underline-offset-4">
                        <Link href={item.href}>
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button variant="outline" size="sm" className="bg-card" render={<Link href="/sign-in">Sign In</Link>} />
                <Button size="sm" render={<Link href="/pricing">Get Access</Link>} />
              </>
            )}
          </div>
        </div>
      </div>
    </nav >
  );
}
