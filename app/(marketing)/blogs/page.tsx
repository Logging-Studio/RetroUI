import { allBlogs } from "@/.contentlayer/generated";
import { Avatar, Card, Text } from "@/components/retroui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { sdk } from "@/lib/payload"

type Post = {
  id: number,
  title: string,
  slug: string,
  publishedAt: string,
  excerpt: string,
  featuredImage: {
    url: string,
    alt: string
  },
}

async function page() {
  const res = await fetch("https://cms.retroui.dev/api/posts/published", {
    method: 'GET',
    credentials: 'include',
  })
  const posts = await res.json()

  return (
    <div>
      <Text as="h1" className="mb-12">
        All RetroUI Blogs
      </Text>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.docs.map((blog: Post) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id}>
            <Card className="shadow-none hover:-translate-x-2 hover:-translate-y-2 hover:shadow-lg">
              <Card.Header>
                <Image
                  src={`https://cms.retroui.dev${blog.featuredImage?.url}`}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="mb-6 h-50"
                />
                <Text as="p" className="mb-2 text-sm text-muted-foreground">
                  {format(new Date(blog.publishedAt), "dd, MMMM yyyy")}
                </Text>
                <Card.Title className="line-clamp-2 text-2xl">{blog.title}</Card.Title>

                <Card.Description className="line-clamp-2 text-sm">{blog.excerpt}</Card.Description>
              </Card.Header>
              {/* <Card.Content className="pt-0">

                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8 border">
                    <Avatar.Image src="https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/arif.jpg" alt="Arif Hossain" />
                    <Avatar.Fallback>AH</Avatar.Fallback>
                  </Avatar>
                  <Text className="text-sm">Arif Hossain</Text>
                </div>
              </Card.Content> */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;


