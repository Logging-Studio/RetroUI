"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Text } from "@/components/retroui";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  Filter,
  ChevronRight,
  Home,
  Copy,
  Check,
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
  const [selectedTab, setSelectedTab] = useState<Record<string, "preview" | "code">>(() => {
    const initialTabs: Record<string, "preview" | "code"> = {};
    initialBlockItems.forEach((item) => {
      initialTabs[item.slug] = "preview";
    });
    return initialTabs;
  });
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [deviceMode, setDeviceMode] = useState<Record<string, "desktop" | "tablet" | "mobile">>(() => {
    const initialDeviceMode: Record<string, "desktop" | "tablet" | "mobile"> = {};
    initialBlockItems.forEach((item) => {
      initialDeviceMode[item.slug] = "desktop";
    });
    return initialDeviceMode;
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
      <div className="flex items-center gap-2 text-sm mb-6">
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

      {/* Header */}
      <div className="mb-8">
        <Text as="h1" className="text-4xl lg:text-5xl uppercase mb-4">
          RetroUI {categoryInfo.name}
        </Text>
        <p className="text-base text-muted-foreground max-w-3xl">
          {categoryInfo.description ||
            `Clean Shadcn UI ${categoryInfo.name.toLowerCase()} blocks for high-impact landing pages. Preview layouts and copy ready-to-use blocks that work with any React framework.`}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-12">
        <div className="relative inline-block">
          <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black" />
          <Button
            variant="outline"
            className="relative bg-yellow-400 border-2 border-black font-bold"
            onClick={() => router.push("/blocks")}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              View All Blocks
            </span>
          </Button>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative inline-block flex-1 lg:flex-initial">
            <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
            <div className="relative flex items-center bg-white border-2 border-black">
              <Search className="w-4 h-4 ml-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="type something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-3 pr-4 pl-2 bg-transparent text-sm focus:outline-none w-full lg:w-[300px]"
              />
            </div>
          </div>

          {/* Filter Button */}
          <div className="relative inline-block">
            <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
            <Button
              variant="outline"
              className="relative bg-yellow-400 border-2 border-black font-bold"
            >
              <Filter className="w-4 h-4" />
              <span className="ml-2">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Block Items */}
      <div className="space-y-16">
        {filteredBlocks.map((item) => (
          <div key={item.id} className="space-y-6">
            {/* Block Header */}
            <div className="flex justify-between items-start">
              <div>
                <Text as="h2" className="text-2xl uppercase mb-2">
                  {item.name}
                </Text>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {categoryInfo.description ||
                    `Clean Shadcn UI ${categoryInfo.name.toLowerCase()} blocks for high-impact landing pages. Preview layouts and copy ready-to-use blocks that work with any React framework.`}
                </p>
              </div>

              {/* Preview in Figma Button */}
              <div className="relative inline-block hidden lg:block">
                <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                <Button
                  variant="outline"
                  className="relative bg-white border-2 border-black font-bold"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 38 57" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 28.5L19 57L0 47.5V28.5L19 38V28.5ZM0 9.5L19 0V19L0 28.5V9.5ZM19 19L38 9.5V28.5L19 38V19ZM0 47.5L19 57L19 38L0 47.5Z"
                      fill="#1ABCFE"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 0L38 9.5L19 19V0Z"
                      fill="#0ACF83"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 28.5L19 19L19 38L0 28.5Z"
                      fill="#FF7262"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 19L38 28.5V9.5L19 19Z"
                      fill="#F24E1E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 38L38 28.5L38 47.5L19 38Z"
                      fill="#A259FF"
                    />
                  </svg>
                  Preview in Figma
                </Button>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative inline-block">
                  <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                  <button
                    onClick={() =>
                      setSelectedTab((prev) => ({
                        ...prev,
                        [item.slug]: "preview",
                      }))
                    }
                    className={`px-4 py-2 border-2 border-black font-bold text-sm relative transition-all ${
                      selectedTab[item.slug] === "preview"
                        ? "bg-yellow-400"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <Eye className="w-4 h-4 inline-block mr-2" />
                    Preview
                  </button>
                </div>

                <div className="relative inline-block">
                  <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                  <button
                    onClick={() => {
                      if (!user) {
                        router.push("/sign-in?redirect=/blocks/" + category);
                        return;
                      }
                      setSelectedTab((prev) => ({
                        ...prev,
                        [item.slug]: "code",
                      }));
                    }}
                    className={`px-4 py-2 border-2 border-black font-bold text-sm relative transition-all ${
                      selectedTab[item.slug] === "code"
                        ? "bg-yellow-400"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <Code2 className="w-4 h-4 inline-block mr-2" />
                    Show Code
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Device Size Toggles */}
                {selectedTab[item.slug] === "preview" && (
                  <>
                    <button
                      onClick={() =>
                        setDeviceMode((prev) => ({
                          ...prev,
                          [item.slug]: "desktop",
                        }))
                      }
                      className={`p-2 border-2 border-black ${
                        deviceMode[item.slug] === "desktop"
                          ? "bg-yellow-400"
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
                      className={`p-2 border-2 border-black ${
                        deviceMode[item.slug] === "tablet"
                          ? "bg-yellow-400"
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
                      className={`p-2 border-2 border-black ${
                        deviceMode[item.slug] === "mobile"
                          ? "bg-yellow-400"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Copy & Fullscreen Buttons */}
                {selectedTab[item.slug] === "code" && user && item.code && (
                  <button
                    onClick={() => handleCopyCode(item.slug, item.code!)}
                    className="p-2 border-2 border-black bg-white hover:bg-gray-50"
                    title="Copy code"
                  >
                    {copiedStates[item.slug] ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}

                <button
                  className="p-2 border-2 border-black bg-white hover:bg-gray-50"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview/Code Content */}
            <div className="border-2 border-black bg-white relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-black" />

              <div className="relative bg-white">
                {selectedTab[item.slug] === "preview" ? (
                  <div className="p-4 flex justify-center bg-gray-50 min-h-[400px]">
                    <div
                      className={`${getDeviceWidth(
                        deviceMode[item.slug]
                      )} transition-all duration-300`}
                    >
                      {/* Live Preview iframe */}
                      <iframe
                        src={`https://retroui-blocks.vercel.app/${category}/${item.slug}`}
                        className="w-full h-[600px] border-2 border-black rounded bg-white"
                        title={`Preview of ${item.name}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
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
