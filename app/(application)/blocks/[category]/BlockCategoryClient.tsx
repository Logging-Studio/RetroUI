"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Text } from "@/components/retroui";
import { useAuth } from "@/contexts/AuthContext";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import {
  ChevronRight,
  Home,
  Maximize2,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Eye,
} from "lucide-react";
import { blockConfig } from "@/config/blocks";

interface BlockItem {
  id: number;
  name: string;
  slug: string;
  code?: string;
  cover_img: string | null;
}

interface BlockCategoryClientProps {
  category: string;
  categoryInfo: typeof blockConfig.blocks[number];
  initialBlockItems: BlockItem[];
}

export default function BlockCategoryClient({
  category,
  categoryInfo,
  initialBlockItems,
}: BlockCategoryClientProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [deviceMode, setDeviceMode] = useState<Record<string, "desktop" | "tablet" | "mobile">>(() => {
    const initialDeviceMode: Record<string, "desktop" | "tablet" | "mobile"> = {};
    initialBlockItems.forEach((item) => {
      initialDeviceMode[item.slug] = "desktop";
    });
    return initialDeviceMode;
  });
  const [selectedTabIndex, setSelectedTabIndex] = useState<Record<string, number>>(() => {
    const initialTabIndex: Record<string, number> = {};
    initialBlockItems.forEach((item) => {
      initialTabIndex[item.slug] = 0;
    });
    return initialTabIndex;
  });

  const handleCopyCode = async (slug: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [slug]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [slug]: false }));
    }, 3000);
  };

  const getDeviceWidth = (mode: "desktop" | "tablet" | "mobile") => {
    switch (mode) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      default:
        return "w-full";
    }
  };

  const filteredBlocks = initialBlockItems.filter((item) =>
    searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <Link href="/" className="hover:underline flex items-center gap-1">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/blocks" className="hover:underline">
          Blocks
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize">{categoryInfo.type}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-bold">{categoryInfo.name}</span>
      </div>

      <Text as="h1" className="text-4xl lg:text-5xl text-card mb-24">
        <span className="text-card text-outline-foreground text-shadow-foreground tracking-wider">
          RetroUI {categoryInfo.name} Blocks
        </span>
      </Text>

      {/* Block Items */}
      <div className="space-y-24">
        {filteredBlocks.map((item) => (
          <div key={item.id} className="space-y-6">
            {/* Block Header */}
            <Text as="h2" className="text-3xl lg:text-4xl mb-6">
              {item.name}
            </Text>

            {/* Tab Controls */}
            <TabGroup
              selectedIndex={selectedTabIndex[item.slug]}
              onChange={(index) => {
                if (index === 1 && !user) {
                  router.push("/sign-in?redirect=/blocks/" + category);
                  return;
                }
                setSelectedTabIndex((prev) => ({
                  ...prev,
                  [item.slug]: index,
                }));
              }}
              className="bg-card border-2 shadow-lg"
            >
              <div className="flex justify-between items-center p-2 border-b-2 bg-white">
                <TabList className="inline-flex">
                  <Tab className="w-24 cursor-pointer relative text-sm p-1.5 bg-transparent data-selected:border-2 data-selected:bg-primary data-selected:text-primary-foreground focus:outline-hidden flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Tab>
                  <Tab className="w-24 cursor-pointer relative text-sm p-1.5 bg-transparent data-selected:border-2 data-selected:bg-primary data-selected:text-primary-foreground focus:outline-hidden flex items-center justify-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Code
                  </Tab>
                </TabList>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Device Size Toggles */}
                  {selectedTabIndex[item.slug] === 0 && (
                    <>
                      <button
                        onClick={() =>
                          setDeviceMode((prev) => ({
                            ...prev,
                            [item.slug]: "desktop",
                          }))
                        }
                        className={`p-2 border-2 cursor-pointer ${deviceMode[item.slug] === "desktop"
                          ? "bg-primary"
                          : "bg-white hover:bg-gray-50"
                          }`}
                        title="Desktop view"
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeviceMode((prev) => ({
                            ...prev,
                            [item.slug]: "tablet",
                          }))
                        }
                        className={`p-2 border-2 cursor-pointer ${deviceMode[item.slug] === "tablet"
                          ? "bg-primary"
                          : "bg-white hover:bg-gray-50"
                          }`}
                        title="Tablet view"
                      >
                        <Tablet className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeviceMode((prev) => ({
                            ...prev,
                            [item.slug]: "mobile",
                          }))
                        }
                        className={`p-2 border-2 cursor-pointer ${deviceMode[item.slug] === "mobile"
                          ? "bg-primary"
                          : "bg-white hover:bg-gray-50"
                          }`}
                        title="Mobile view"
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <a
                    href={`https://retroui-blocks.vercel.app/${category}/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 cursor-pointer border-black bg-white hover:bg-gray-50"
                    title="Copy code"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Preview/Code Content */}
              <TabPanels>
                <TabPanel>
                  <div
                    className={`${getDeviceWidth(
                      deviceMode[item.slug]
                    )} transition-all duration-300`}
                  >
                    {/* Live Preview iframe */}
                    <iframe
                      src={`https://retroui-blocks.vercel.app/${category}/${item.slug}`}
                      className="w-full h-[800px] flex items-center justify-center"
                      title={`Preview of ${item.name}`}
                      loading="lazy"
                    />
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="p-4 bg-gray-900 text-white min-h-[400px] overflow-auto">
                    {user && item.code ? (
                      <pre className="text-sm">
                        <code>{item.code}</code>
                      </pre>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <p className="text-gray-300 mb-4">Sign in to view the code</p>
                          <Button
                            onClick={() =>
                              router.push("/sign-in?redirect=/blocks/" + category)
                            }
                          >
                            Sign In
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        ))}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="text-center py-16">
          <Text as="h2" className="text-2xl mb-4">
            No blocks found
          </Text>
          <p className="text-muted-foreground mb-8">
            {searchQuery
              ? `No blocks match "${searchQuery}"`
              : "This category doesn't have any blocks yet."}
          </p>
          <Button onClick={() => router.push("/blocks")}>Browse All Blocks</Button>
        </div>
      )}
    </main>
  );
}
