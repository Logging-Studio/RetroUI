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
    <div className="relative max-w-[1400px] mx-auto px-4">
      <div className="flex lg:gap-20 items-start">
        {/* Sidebar */}
        <div className="hidden lg:block w-60 flex-shrink-0 sticky top-20 self-start">
          <SideNav />
        </div>
        <div className="flex-1 py-8">{children}</div>
      </div>
    </div>
  );
}
