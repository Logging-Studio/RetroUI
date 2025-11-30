"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GithubIcon, MoonIcon, SunIcon } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import { Button, Text } from "@/components/retroui";
import { navConfig } from "@/config/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function TopNav() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="sticky z-1 top-0 right-0 w-full border-b-2 bg-background">
      <div className="w-full bg-black text-white">
        <div className="container max-w-6xl mx-auto px-4 py-2 flex justify-center space-x-4 items-center">
          <Text className="text-sm lg:text-center">
            Ship faster with premium blocks and templates!
          </Text>
          <a href="https://dub.sh/retroui-pro" target="_blank">
            <Button
              size="sm"
              className="shadow-none font-sans font-bold px-2 py-1 w-30"
            >
              RetroUI Pro
              <ArrowUpRight className="ml-auto h-4 w-4 inline-block" />
            </Button>
          </a>
        </div>
      </div>
      <div className="container max-w-6xl px-4 lg:px-0 mx-auto">
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
          <div className="hidden md:flex space-x-4">
            {navConfig.topNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:underline decoration-primary underline-offset-2 transition-all"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <Link
              href="https://github.com/Logging-Stuff/retroui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </Link>
            <HamburgerMenu />
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="https://github.com/Logging-Stuff/retroui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="icon">
                <GithubIcon size="14"/>
              </Button>
            </Link>
            <Button variant="secondary" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <SunIcon size="14" /> : <MoonIcon size="14" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
