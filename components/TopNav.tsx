"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/base-retroui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Drawer } from "@/components/retroui/Drawer";
import { navConfig } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";

export default function TopNav() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className={`transition-all mx-auto duration-300 ${
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
            {/* Mobile Menu Button */}
            <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="left">
              <Drawer.Trigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden p-2 mr-0 bg-card"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <div className="flex items-center justify-between">
                    <Drawer.Title className="text-foreground font-head text-xl">
                      Menu
                    </Drawer.Title>
                    <Drawer.Close asChild>
                      <Button variant="outline" size="sm" className="p-2 bg-card" aria-label="Close menu">
                        <X className="h-5 w-5" />
                      </Button>
                    </Drawer.Close>
                  </div>
                </Drawer.Header>
                <nav className="flex flex-col space-y-1 p-4">
                  {navConfig.topNavItems.map((item) => {
                    if (item.children && item.children.length > 0) {
                      return (
                        <div key={item.title} className="space-y-1">
                          <div className="font-medium text-foreground py-2 px-3">
                            {item.title}
                          </div>
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="block py-2 px-6 text-sm hover:bg-muted rounded"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block py-2 px-3 hover:bg-muted rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
                <Drawer.Footer>
                  <div className="flex flex-col gap-2 w-full">
                    {user ? (
                      <div className="px-3 py-2">
                        <UserMenu user={user} />
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          render={<Link href="/sign-in">Sign In</Link>}
                        />
                        <Button
                          size="sm"
                          className="w-full"
                          render={<Link href="/pricing">Get Access</Link>}
                        />
                      </>
                    )}
                  </div>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
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
      </div>
    </nav >
  );
}
