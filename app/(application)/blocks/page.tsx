"use client";

import { useState } from "react";
import { Card, Text, Tabs } from "@/components/base-retroui";
import { blockConfig } from "@/config/blocks";
import Image from "next/image";
import { Megaphone, Search, ListMinus, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function BlocksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter blocks based on active tab and search query
  const getFilteredBlocks = () => {
    let filtered = blockConfig.blocks.filter(block => block.stage === "published");

    // Filter by tab
    if (activeTab === "marketing") {
      filtered = filtered.filter(block => block.type === "marketing");
    } else if (activeTab === "application") {
      filtered = filtered.filter(block => block.type === "application");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(block =>
        block.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBlocks = getFilteredBlocks();

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex">
          <Text as="h1">
            RetroUI {" "}
            <span className="text-outline-foreground-sm text-shadow-foreground-sm">Blocks</span>
          </Text>
          <Image
            src="/decor/lego.svg"
            alt="blocks decoration"
            width={60}
            height={60}
            className="h-[60px] w-[60px] -ml-6 -mt-4"
          />
        </div>
        <p className="text-muted-foreground max-w-4xl">
          Accelerate development with 300+ React UI blocks for apps, dashboards, e-commerce, and AI.
          RetroUI Blocks enhance open-source components with layouts and design patterns. Designed for
          easy integration, these blocks are responsive and compatible with any React framework, speeding
          up UI development for MCP and LLM workflows.
        </p>
      </div>

      {/* Tabs and Search Section */}
      <Tabs
        defaultValue="all"
        onValueChange={(value) => setActiveTab(value as string)}
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-12">
          {/* Tabs */}
          <Tabs.List className="flex flex-row space-x-2">
            <Tabs.Trigger value="all">
              <ListMinus className="w-4 h-4 mr-2" />
              All Blocks
            </Tabs.Trigger>
            <Tabs.Trigger value="marketing">
              <Megaphone className="w-4 h-4 mr-2" />
              Marketing
            </Tabs.Trigger>
            <Tabs.Trigger value="application">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Application
            </Tabs.Trigger>
          </Tabs.List>

          {/* Search and Figma Preview */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-background" />
              <div className="relative bg-card border-2 flex items-center px-4 py-2 min-w-[300px]">
                <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="type something..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blocks Grid */}
        <Tabs.Content value="all">
          <BlocksGrid blocks={filteredBlocks} />
        </Tabs.Content>
        <Tabs.Content value="marketing">
          <BlocksGrid blocks={filteredBlocks} />
        </Tabs.Content>
        <Tabs.Content value="application">
          <BlocksGrid blocks={filteredBlocks} />
        </Tabs.Content>
      </Tabs>

      {/* No results message */}
      {filteredBlocks.length === 0 && (
        <div className="text-center py-16">
          <Text className="text-muted-foreground">
            No blocks found matching your search.
          </Text>
        </div>
      )}
    </main>
  );
}

function BlocksGrid({ blocks }: { blocks: typeof blockConfig.blocks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blocks.map((block) => (
        <Card key={block.slug} className="w-full group overflow-hidden">
          <Link href={`/blocks/${block.slug}`}>
            <Card.Content className="p-0">
              <div className="w-full h-auto bg-white flex items-center justify-center border-b-2 overflow-hidden">
                <Image
                  src={block.cover_image}
                  alt={block.name}
                  width={500}
                  height={300}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Text as="h4" className="mb-2">
                  {block.name}
                </Text>
                <p className="text-sm text-muted-foreground">
                  {block.description}
                </p>
              </div>
            </Card.Content>
          </Link>
        </Card>
      ))}
    </div>
  );
}
