import path from "node:path";
import fs from "node:fs";
import { defineConfig, defineCollection, s } from "velite";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { u } from "unist-builder";

const docs = defineCollection({
  name: "Doc",
  pattern: "docs/{*,**/*}.mdx",
  schema: s
    .object({
      title: s.string(),
      path: s.string(),
      description: s.string(),
      lastUpdated: s.isodate(),
      links: s
        .object({
          source: s.string().optional(),
          api_reference: s.string().optional(),
        })
        .optional(),
      metadata: s.metadata(),
      code: s.mdx(),
      raw: s.raw(),
    })
    .transform((data) => ({
      ...data,
      url: data.path === "/" ? "/docs" : `/docs${data.path}`,
    })),
});

const blogs = defineCollection({
  name: "Blog",
  pattern: "blogs/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      description: s.string(),
      coverImage: s.string(),
      publishedAt: s.isodate(),
      author: s.object({
        name: s.string(),
        avatar: s.string(),
        x: s.string().optional(),
        linkedin: s.string().optional(),
      }),
      tags: s.array(s.string()),
      status: s.enum(["draft", "published"]).default("draft"),
      metadata: s.metadata(),
      code: s.mdx(),
      raw: s.raw(),
    })
    .transform((data) => ({
      ...data,
      url: `/blogs/${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { docs, blogs },
  mdx: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      rehypeSlug,
      () => (tree: any) => {
        // Load component config from JSON file
        const configPath = path.join(process.cwd(), "velite-components.json");
        const componentConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

        visit(tree, (node: any) => {
          if (node.name === "ComponentSource" && node.attributes) {
            const nameAttr = node.attributes?.find((attr: any) => attr.name === "name");
            const name = nameAttr?.value;

            if (!name) {
              return null;
            }

            // Try to get component, with fallback for Base UI
            let component = componentConfig?.core?.[name];
            if (!component && name.startsWith('baseui-')) {
              // Fallback to Radix version
              const radixName = name.replace('baseui-', '');
              component = componentConfig?.core?.[radixName];
            }

            if (!component) {
              return null;
            }
            const filePath = path.join(process.cwd(), component.filePath);
            const source = fs.readFileSync(filePath, "utf8");

            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: filePath,
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              }),
            );
          }

          if (node.name === "ComponentShowcase" && node.attributes) {
            const nameAttr = node.attributes?.find((attr: any) => attr.name === "name");
            const name = nameAttr?.value;

            if (!name) {
              return null;
            }

            // Try to get example, with fallback for Base UI
            let component = componentConfig?.examples?.[name];
            if (!component && name.startsWith('baseui-')) {
              // Fallback to Radix version
              const radixName = name.replace('baseui-', '');
              component = componentConfig?.examples?.[radixName];
            }

            if (!component) {
              return null;
            }
            const filePath = path.join(process.cwd(), component.filePath);
            const source = fs.readFileSync(filePath, "utf8");

            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: component.filePath,
                  __rawString__: source,
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              }),
            );
          }
        });
      },
      [
        rehypePrettyCode as any,
        {
          theme: "dracula-soft",
        },
      ],
    ],
  },
});
