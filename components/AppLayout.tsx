"use client";

import { Tabs } from '@base-ui/react/tabs';
import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/TopNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tabs.Root defaultValue="react">
      <Tabs.List className="bg-foreground h-10 flex justify-center items-end">
        <div className="bg-background pt-1 px-1">
          <Tabs.Tab value="react" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
            <Link href="/" className="flex items-center">
              <Image src="/images/icons/react.svg" alt="React" width={16} height={16} className="mr-2" />
              React
            </Link>
          </Tabs.Tab>
          <Tabs.Tab value="figma" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
            <Link href="/figma" className="flex items-center">
              <Image src="/images/icons/figma.svg" alt="Figma" width={12} height={12} className="mr-2" />
              Figma
            </Link>
          </Tabs.Tab>
        </div>
        <Tabs.Indicator />
      </Tabs.List>
      <TopNav />
      <Tabs.Panel value="react">
        <div>
          {children}
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="figma">
        {children}
      </Tabs.Panel>
    </Tabs.Root>
  );
}
