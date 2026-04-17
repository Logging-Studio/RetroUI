import React from "react";
import { docs } from "#site/content";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import MDX from "@/components/MDX";
import { Text } from "@/components/retroui/Text";
import { Metadata } from "next";
import { MoveUpRightIcon } from "lucide-react";
import { generateToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";

interface IProps {
  params: Promise<{ slug: string[] }>;
}

async function getDocParams(props: IProps) {
  const params = await props.params;
  const slug = `/docs${params.slug ? `/${params.slug.join("/")}` : ""}`;
  const doc = docs.find((doc) => doc.url === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const doc = await getDocParams(props);

  if (!doc) {
    return {
      title: "Not Found | Retro UI",
    };
  }

  return {
    title: `${doc.title} | Retro UI`,
    description: doc.description,
  };
}

export default async function page(props: IProps) {
  const doc = await getDocParams(props);

  if (!doc) {
    return notFound();
  }

  const toc = await generateToc(doc.raw);
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 space-y-12 py-12 px-4 max-w-2xl mx-auto w-full">
        <div className="border-b pb-6">
          <Text as="h1" className="text-4xl">
            {doc.title}
          </Text>
          <p className="text-lg text-muted-foreground mt-2">
            {doc.description}
          </p>
          {doc.links && (
            <div className="flex space-x-4 text-sm mt-4 text-black">
              {doc.links?.api_reference && (
                <a
                  className="flex items-center bg-gray-200 px-1.5 py-.5"
                  href={doc.links.api_reference}
                  target="_blank"
                >
                  API Reference <MoveUpRightIcon className="h-3 w-3 ml-1" />
                </a>
              )}
              {doc.links && doc.links?.source && (
                <a
                  className="flex items-center bg-gray-200 px-1.5 py-.5"
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
      <div className="hidden lg:block lg:w-60 flex-shrink-0 sticky top-36 self-start space-y-6">
        <TableOfContents toc={toc} />
      </div>
    </>
  );
}
