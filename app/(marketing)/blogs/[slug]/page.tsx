import React from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import MDX from "@/components/MDX";
import { Avatar, Badge, Button, Text } from "@/components/retroui";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { JSXConverters } from "@/components/RichTextConverter";

interface IProps {
  params: { slug: string[] };
}

type Post = {
  id: number,
  title: string,
  slug: string,
  publishedAt: string,
  content: any,
  excerpt: string,
  tags: {
    name: string,
    slug: string
  }[],
  featuredImage: {
    url: string,
    alt: string
  },
}

async function getBlogParams({ params }: IProps) {
  const res = await fetch(`https://cms.retroui.dev/api/posts/slug/${params.slug}`, {
    method: 'GET',
    credentials: 'include',
  })
  const post = await res.json()
  return post;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const blog: Post = await getBlogParams({ params });

  if (!blog) {
    return {
      title: "Not Found | Retro UI",
    };
  }

  return {
    title: `${blog.title} | RetroUI Blogs`,
    description: blog.excerpt,
    openGraph: {
      images: blog.featuredImage.url,
      title: `${blog.title} | RetroUI Blogs`,
    },
  };
}

export default async function page({ params }: IProps) {
  const blog: Post | null = await getBlogParams({ params });

  if (!blog) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mt-8 mx-auto">
      <div className="border-b border-black pb-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Text className="text-muted-foreground text-sm font-medium">
            {format(new Date(blog.publishedAt), "dd, MMMM yyyy")}
          </Text>
          <Text>|</Text>
          <div className="flex items-center gap-3">
            {blog.tags.map((tag) => (
              <Badge
                key={tag.slug}
                size="sm"
                variant="surface"
                className={`bg-${["red", "green", "blue", "yellow", "purple", "pink"][
                  blog.tags.indexOf(tag) % 6
                ]
                  }-300`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        <Text as="h1" className="mb-2">
          {blog.title}
        </Text>
        <Text className="text-muted-foreground mb-12">
          {blog.excerpt}
        </Text>
        <Image
          src={`https://cms.retroui.dev${blog.featuredImage.url}`}
          alt={blog.featuredImage.alt}
          width={1200}
          height={800}
          className="mb-8"
        />
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <Avatar>
              <Avatar.Image src="https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/arif.jpg" alt="Arif Hossain" />
              <Avatar.Fallback>AH</Avatar.Fallback>
            </Avatar>
            <div>
              <Text as="h5">Arif Hossain</Text>
              {/* {blog.author.linkedin && (
                <Link
                  href={`https://www.linkedin.com/in/${blog.author.linkedin}`}
                  target="_blank"
                  className="text-muted-foreground"
                >
                  @{blog.author.linkedin}
                </Link>
              )} */}
              {/* {blog.author.x && ( */}
              <Link
                href={`https://x.com/@ariflogs`}
                target="_blank"
                className="text-muted-foreground"
              >
                @ariflogs
              </Link>
              {/* )} */}
            </div>
          </div>

          <Link
            target="_blank"
            href={`https://x.com/share?url=${`https://retroui.dev/blogs/${blog.slug}`}&text=${blog.title}.%0ACheck it out 👉`}
          >
            <Button size="sm" variant="outline">
              Share on X
            </Button>
          </Link>
        </div>
      </div>
      {/* <MDX code={blog.body.code} type="blog" /> */}
      <RichText
        data={blog.content}
        converters={JSXConverters}
      />

      <hr className="my-12" />

      <Button asChild aria-label="Return to all blog posts" variant="secondary">
        <Link href="/blogs" className="inline-flex">← Back to blogs</Link>
      </Button>
    </div>
  );
}
