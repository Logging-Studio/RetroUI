import SideNav from "@/components/SideNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started | RetroUI",
};

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Sidebar — fixed to the viewport, left-aligned with the max-w-7xl (80rem)
          centered container. On screens narrower than 80rem, left is 0. */}
      <div className="fixed top-28 hidden h-[calc(100vh-7rem)] w-60 lg:left-[max(0px,calc((100vw-80rem)/2))] lg:block">
        <SideNav />
      </div>

      {/* Content area — pl-80 reserves space for the fixed sidebar (w-60) + gap (20).
          No independent centering: the parent max-w-7xl is the single source of truth. */}
      <div className="flex w-full items-start max-lg:px-4 lg:gap-20 lg:pl-80">
        {children}
      </div>
    </div>
  );
}
