"use client";

import { useState } from "react";
import { Text } from "@/components/base-retroui";
import { Tabs } from "@/components/base-retroui/Tab";
import { Button } from "@/components/base-retroui";
import { templateConfig } from "@/config/templates";
import Image from "next/image";
import { Search, Newspaper, ShoppingCart, LayoutDashboard, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter templates based on active tab and search query
  const getFilteredTemplates = () => {
    let filtered = templateConfig.templates.filter(
      (template) => template.stage === "published"
    );

    // Filter by tab (using template name/description keywords for now)
    if (activeTab === "landing") {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes("landing") ||
          template.description.toLowerCase().includes("landing")
      );
    } else if (activeTab === "ecommerce") {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes("ecommerce") ||
          template.name.toLowerCase().includes("shop") ||
          template.description.toLowerCase().includes("ecommerce")
      );
    } else if (activeTab === "dashboard") {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes("dashboard") ||
          template.name.toLowerCase().includes("saas") ||
          template.description.toLowerCase().includes("dashboard")
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-start mb-4">
          <Text as="h1">
            Modern React{" "}
            {/* <span className="relative inline-flex items-center">
              Templates
              <Image
                src="/decor/pay.svg"
                alt="templates decoration"
                width={60}
                height={60}
                className="h-[60px] w-[60px] -ml-2 -mt-2 inline-block"
              />
            </span> */}
            <span className="relative text-outline-foreground text-shadow-foreground">
              <Image src="/decor/paint_brush.svg" alt="components decoration" width={100} height={100} className="absolute h-[100px] w-[100px] -left-14 -top-8" />
              Templates
            </span>
            <br />
            Crafted with Tailwind CSS
          </Text>
        </div>
        <p className="text-base text-muted-foreground max-w-4xl leading-relaxed">
          Beautifully designed and highly customizable React templates created
          with Tailwind CSS. They serve as an ideal foundation for contemporary
          SaaS, dashboards, AI, finance, eCommerce, marketing, and business
          websites, tailored for actual production environments.
        </p>
      </div>

      {/* Tabs and Search Section */}
      <Tabs
        defaultValue="all"
        onValueChange={(value) => setActiveTab(value as string)}
      >
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-12">
          {/* Tabs */}
          <Tabs.List className="flex flex-row flex-wrap gap-2">
            <Tabs.Trigger value="all" className="relative">
              <div
                className={`absolute inset-0 ${activeTab === "all" ? "bg-primary" : "bg-transparent"
                  } -z-10`}
              />
              <Sparkles className="w-4 h-4 mr-2" />
              All Templates
            </Tabs.Trigger>
            <Tabs.Trigger value="landing">
              <Newspaper className="w-4 h-4 mr-2" />
              Landing Page
            </Tabs.Trigger>
            {/* <Tabs.Trigger value="ecommerce">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ecommerce
            </Tabs.Trigger> */}
            <Tabs.Trigger value="dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Tabs.Trigger>
          </Tabs.List>

          {/* Search */}
          <div className="w-full lg:w-auto">
            <div className="relative inline-block w-full lg:w-auto">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-background" />
              <div className="relative bg-card border-2 flex items-center px-4 py-2 min-w-[280px]">
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

        {/* Templates Grid */}
        <Tabs.Content value="all">
          <TemplatesGrid templates={filteredTemplates} />
        </Tabs.Content>
        <Tabs.Content value="landing">
          <TemplatesGrid templates={filteredTemplates} />
        </Tabs.Content>
        {/* <Tabs.Content value="ecommerce">
          <TemplatesGrid templates={filteredTemplates} />
        </Tabs.Content> */}
        <Tabs.Content value="dashboard">
          <TemplatesGrid templates={filteredTemplates} />
        </Tabs.Content>
      </Tabs>

      {/* No results message */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <Text className="text-muted-foreground">
            No templates found matching your search.
          </Text>
        </div>
      )}
    </main>
  );
}

function TemplatesGrid({
  templates,
}: {
  templates: typeof templateConfig.templates;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {templates.map((template) => (
        <div key={template.name} className="shadow-none">
          <div className="w-full h-auto relative mb-8">
            <div className={`absolute top-2 left-2 -bottom-2 -right-2 border-2 border-border`} style={{ backgroundColor: template.color }}></div>
            <Image
              src={template.cover_image}
              alt={template.name}
              width={600}
              height={800}
              className="object-contain relative z-1 border-2 border-border"
            />
          </div>

          <div>
            <Text as="h3" className="mb-2 font-normal">{template.name}</Text>
            <Text className="text-muted-foreground mb-4 text-sm">{template.description}</Text>
            <div className="flex justify-between gap-6">
              <Link href={`/templates/${template.slug}`} className="relative inline-block group flex-1">
                <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />

                <button className="px-4 py-1.5 font-head w-full border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5">
                  View Details
                </button>
              </Link>
              <Button variant="link" className="flex-1">Live Preview <ArrowUpRight className="ml-2" /></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
