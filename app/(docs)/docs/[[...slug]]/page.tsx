"use client";

import { docs } from "#site/content";
import { notFound, useParams } from "next/navigation";
import { format } from "date-fns";
import MDX from "@/components/MDX";
import { Text } from "@/components/retroui";
import { MoveUpRightIcon } from "lucide-react";
import { generateToc, TableOfContents as TOCType } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import { CopyPageButton } from "@/components/CopyPageButton";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [toc, setToc] = useState<TOCType>({});

  // Construct slug from params
  const slug = Array.isArray(params.slug)
    ? `/${params.slug.join("/")}`
    : params.slug
      ? `/${params.slug}`
      : "";

  const docUrl = `/docs${slug}`;

  // Find the doc
  const doc = docs.find((d) => d.url === docUrl);

  // Generate table of contents when doc changes
  useEffect(() => {
    if (doc) {
      generateToc(doc.raw).then(setToc);
    }
  }, [doc]);

  if (!doc) {
    return notFound();
  }

  return (
    <div className="relative flex items-start">
      {/* Main Content */}
      <div className="flex-1 space-y-12 max-w-2xl mx-auto w-full px-0 lg:px-12 xl:px-0">
        <div className="border-b pb-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
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
