import { notFound } from "next/navigation";
import { blockConfig } from "@/config/blocks";
import BlockCategoryClient from "./BlockCategoryClient";

interface BlockItem {
  id: number;
  name: string;
  slug: string;
  code?: string;
  cover_img: string | null;
}

interface BlockCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getBlockItems(category: string): Promise<BlockItem[]> {
  try {
    const response = await fetch(
      `https://workers.retroui.dev/blocks/categories/${category}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch block items");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return [];
  }
}

export default async function BlockCategoryPage(props: BlockCategoryPageProps) {
  const params = await props.params;
  const category = params.category;

  // Get category info from config
  const categoryInfo = blockConfig.blocks.find((block) => block.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  // Fetch block items on the server
  const blockItems = await getBlockItems(category);

  return (
    <BlockCategoryClient
      category={category}
      categoryInfo={categoryInfo}
      initialBlockItems={blockItems}
    />
  );
}

export async function generateStaticParams() {
  return blockConfig.blocks.map((block) => ({
    category: block.slug,
  }));
}
