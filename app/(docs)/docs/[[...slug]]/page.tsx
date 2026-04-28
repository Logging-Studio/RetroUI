"use client";

import { docs } from "#site/content";
import { notFound, useParams } from "next/navigation";
import { format } from "date-fns";
import MDX from "@/components/MDX";
import { Text } from "@/components/base-retroui";
import { MoveUpRightIcon } from "lucide-react";
import { generateToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import { CopyPageButton } from "@/components/CopyPageButton";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useLibrary } from "@/contexts/LibraryContext";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { library, setLibrary } = useLibrary();
  const [toc, setToc] = useState<any[]>([]);

  // Construct slug from params
  const slug = Array.isArray(params.slug)
    ? `/${params.slug.join("/")}`
    : params.slug
      ? `/${params.slug}`
      : "";

  // Check if this is a component page
  const isComponentPage = slug.startsWith("/components");

  // Construct the doc path based on library selection (only for component pages)
  const basePath = library === "baseui" ? "/components/baseui" : "/components";
  const fullPath = isComponentPage
    ? slug.replace("/components", basePath)
    : slug;
  const docUrl = `/docs${fullPath}`;

  // Find the doc based on library selection
  let doc = docs.find((d) => d.url === docUrl);

  // Fallback: if Base UI doc not found, try Radix UI doc (only for component pages)
  if (!doc && library === "baseui" && isComponentPage) {
    const radixUrl = `/docs${slug}`;
    doc = docs.find((d) => d.url === radixUrl);
  }

  // Generate table of contents when doc changes
  useEffect(() => {
    if (doc) {
      generateToc(doc.raw).then(setToc);
    }
  }, [doc]);

  if (!doc) {
    return notFound();
  }

  // Calculate selected tab index based on library
  const selectedIndex = library === "baseui" ? 1 : 0;

  return (
    <div className="relative flex items-start">
      {/* Main Content */}
      <div className="flex-1 space-y-12 max-w-2xl mx-auto w-full">
        <div className="border-b pb-6">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex-1">
              <Text as="h1" className="lg:text-4xl">
                <span className="text-card text-outline-foreground text-shadow-foreground">
                  {doc.title}
                </span>
              </Text>
              <p className="text-lg text-muted-foreground mt-2">
                {doc.description}
              </p>
            </div>
            <CopyPageButton rawContent={doc.raw} title={doc.title} />
          </div>


          <div className="flex justify-between items-start">
            {isComponentPage && (
              <TabGroup
                selectedIndex={selectedIndex}
                onChange={(index) => {
                  setLibrary(index === 1 ? "baseui" : "radix");
                }}
              >
                <TabList className="border bg-card p-1 text-sm inline-flex">
                  <Tab className="w-20 cursor-pointer relative text-sm p-1 bg-transparent data-selected:border data-selected:bg-primary data-selected:text-primary-foreground focus:outline-hidden">
                    Radix UI
                  </Tab>
                  <Tab className="w-20 cursor-pointer relative p-1 bg-transparent data-selected:border data-selected:bg-primary data-selected:text-primary-foreground focus:outline-hidden">
                    Base UI
                  </Tab>
                </TabList>
              </TabGroup>
            )}

            {doc.links && (
              <div className="flex space-x-2 text-sm">
                {doc.links?.api_reference && (
                  <a
                    className="flex items-center bg-card text-foreground px-1.5 py-1"
                    href={doc.links.api_reference}
                    target="_blank"
                  >
                    API Reference <MoveUpRightIcon className="h-3 w-3 ml-1" />
                  </a>
                )}
                {doc.links && doc.links?.source && (
                  <a
                    className="flex items-center bg-card text-foreground px-1.5 py-1"
                    href={doc.links.source}
                    target="_blank"
                  >
                    Source <MoveUpRightIcon className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            )}

          </div>
        </div>

        <div>
          <MDX code={doc.code} />
        </div>
        <p className="text-right">
          Last Updated: {format(doc.lastUpdated, "dd MMM, yyy")}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="hidden lg:block sticky lg:w-60 flex-shrink-0 top-30 self-start space-y-6">
        <TableOfContents toc={toc} />
      </div>
    </div>
  );
}
