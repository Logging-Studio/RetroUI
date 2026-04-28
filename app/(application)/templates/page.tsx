"use client";

import { useState } from "react";
import { Text } from "@/components/base-retroui";
import { Tabs } from "@/components/base-retroui/Tab";
import { templateConfig } from "@/config/templates";
import Image from "next/image";
import { Search, Newspaper, ShoppingCart, LayoutDashboard, Sparkles, ArrowRight, Check } from "lucide-react";
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
            <span className="relative inline-flex items-center">
              Templates
              <Image
                src="/decor/pay.svg"
                alt="templates decoration"
                width={60}
                height={60}
                className="h-[60px] w-[60px] -ml-2 -mt-2 inline-block"
              />
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
                className={`absolute inset-0 ${
                  activeTab === "all" ? "bg-primary" : "bg-transparent"
                } -z-10`}
              />
              <Sparkles className="w-4 h-4 mr-2" />
              All Templates
            </Tabs.Trigger>
            <Tabs.Trigger value="landing">
              <Newspaper className="w-4 h-4 mr-2" />
              Landing Page
            </Tabs.Trigger>
            <Tabs.Trigger value="ecommerce">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ecommerce
            </Tabs.Trigger>
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
        <Tabs.Content value="ecommerce">
          <TemplatesGrid templates={filteredTemplates} />
        </Tabs.Content>
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
        <div key={template.slug} className="space-y-6">
          {/* Template Preview Image */}
          <div className="relative group">
            <div
              className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black"
              style={{ backgroundColor: template.color }}
            />
            <div className="relative border-2 border-black overflow-hidden bg-white">
              <Image
                src={template.cover_image}
                alt={template.name}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Template Info */}
          <div className="space-y-4">
            <Text as="h3" className="text-2xl font-bold uppercase">
              {template.name.split("|")[1]?.trim() || template.name}
            </Text>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {template.description}
            </p>

            {/* Features List */}
            <div className="space-y-2">
              {template.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-black stroke-[3]" />
                  </div>
                  <Text className="text-sm">{feature}</Text>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              {/* Get Template Button */}
              <div className="relative inline-block flex-1">
                <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-primary transition-all duration-200" />
                <Link
                  href={`/templates/${template.slug}`}
                  className="block w-full px-6 py-3 font-bold border-2 border-black transition-all duration-200 relative bg-white shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 text-center"
                >
                  Get Template
                </Link>
              </div>

              {/* Live Preview Link */}
              <Link
                href={`/templates/${template.slug}/preview`}
                className="flex items-center gap-2 font-bold text-sm hover:underline whitespace-nowrap"
              >
                Live Preview
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
