"use client";

import { useState } from "react";
import SideNav from "./SideNav";
import { AlignJustify, X } from "lucide-react";
import { Button } from "@/components/retroui";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        className="p-2"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <AlignJustify className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <button
          className="absolute top-0 left-0 right-0 w-full h-screen bg-black opacity-50 cursor-default"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu overlay"
          tabIndex={0}
        >
          <span className="sr-only">Close menu</span>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-0 bottom-0 h-screen left-0 z-10">
          <SideNav setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
}
