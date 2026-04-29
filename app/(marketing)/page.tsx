import {
  Button,
  Text,
  Card,
} from "@/components/base-retroui";
import {
  ArrowRight,
  ArrowUpRight,
  CopyIcon,
  MessageCircle,
  Star,
} from "lucide-react";
import Footer from "@/components/footer";
import Image from "next/image";
import { users } from "@/config/data";
import { BlocksParallax } from "@/components/BlocksParallax";
import { componentConfig } from "@/config/components";
import Link from "next/link";
import { blockConfig } from "@/config/blocks";
import { templateConfig } from "@/config/templates";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const coreComponents = Object.entries(componentConfig.core)
  .filter(([_, component]) => component.cover)
  .slice(0, 6)
  .map(([key, component]) => ({
    id: key,
    ...component,
    displayName: component.name.toUpperCase().replace(/-/g, " "),
  }));


export default function ReactHomepage() {

  return (
    <main>
      <section className="bg-[url('/decor/bg-triangle-pattern.svg')] bg-cover bg-center">
        <div className="container px-4 py-24 lg:py-28 mx-auto text-center relative">
          {/* <Image src="/images/logos/tailwind.svg" alt="tailwind logo" width={80} height={60} className="hidden lg:block absolute top-6 right-50 transform" />
          <Image src="/images/logos/react.svg" alt="react logo" width={70} height={70} className="hidden lg:block absolute bottom-10 right-12 transform" />
          <Image src="/images/logos/nextjs.svg" alt="nextjs logo" width={70} height={70} className="hidden lg:block absolute bottom-30 -left-6 transform" /> */}


          <Text as="h1" className="uppercase text-5xl lg:text-6xl">
            Not every website has to
            <br />
            <span className="text-card text-outline-foreground text-shadow-foreground">L<Image src="/decor/eye.svg" alt="look decoration" height={98} width={98} className="inline-block -mx-2" />k the same!</span>
          </Text>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A bold, modern React + TailwindCSS UI library that makes your projects stand out from the crowd.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">

            <Link className="relative inline-block group" href="/blocks">
              {/* Outline frame - sits behind, extends to cover shadow */}
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />

              <button className="px-4 py-1.5 text-lg font-head border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5">
                Browse Blocks
              </button>
            </Link>
            <Button variant="link" className="text-lg" render={<Link href="/pricing" />}>
              Get All Access <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
            <div className="flex -space-x-3">
              {users.map((user) => (
                <div key={user.name} className="rounded-full border-2 bg-card">
                  <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                </div>
              ))}
            </div>
            <Text className="text-sm">Loved by <span className="font-bold">1,500+</span><br />Devs & Designers</Text>
          </div>
        </div>
      </section>

      <BlocksParallax />


      {/* Features Section */}
      <section className="container mx-auto px-4 py-28 space-y-14">
        <div className="text-center space-y-6">
          <Text as="h2" className="uppercase text-4xl lg:text-5xl">
            <span className="relative text-outline-foreground text-shadow-foreground">
              <Image src="/decor/pen_design.svg" alt="components decoration" width={140} height={140} className="absolute h-[140px] w-[140px] -left-18 -top-14" />
              Designed to Ship Fast
            </span>
            <br />
            Without Looking Boring
          </Text>
          <p className="text-muted-foreground mb-12 max-w-4xl mx-auto text-center">
            An ecosystem tailored for developers, featuring a reliable framework, reusable elements, and complete code control. It is crafted to enhance and sustain interfaces as products evolve.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
              <Card className="relative h-full shadow-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-x-2 h-full">
                  <div className="bg-background relative overflow-hidden">
                    <Image src="/decor/clipboard.png" alt="Design illustration" width={450} height={450} className="object-fit h-[400px] w-auto absolute -right-14 -bottom-12" />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <Text as="h3" className="mb-4">Copy-paste or just use your CLI</Text>
                      <p className="text-sm text-muted-foreground mb-6">
                        Discover our bold neo-brutalist sections. With striking hero blocks, pricing tables, and feature grids, your product will stand out in the market.
                      </p>
                    </div>

                    {/* Terminal Preview */}
                    <div className="relative">
                      <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-border bg-primary" />
                      <div className="relative bg-background border-2 border-border p-3">
                        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D] border"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4] border"></div>
                          <div className="ml-auto">
                            <CopyIcon className="w-4 h-4" />
                          </div>
                        </div>
                        <code className="text-sm font-mono">npx shadcn add @retroui/button</code>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Card - Spans 2 columns */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
              <Card className="relative shadow-none h-full divide-y-2">
                <div className="flex bg-background relative h-[250px] overflow-hidden">
                  <Image src="/decor/customize.svg" alt="Customization" width={450} height={450} className="object-contain h-[220px] w-auto absolute -left-8 -bottom-8" />
                </div>

                <div className="p-6">
                  <Text as="h3" className="mb-4">Fully customizable</Text>
                  <p className="text-sm text-muted-foreground">
                    Own and modify every component. Tailwind CSS allows you to adjust colors, borders, shadows, and animations to fit your brand.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 ">
            {/* Tech Stack Card */}
            <div className="relative lg:col-span-2">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
              <Card className="relative shadow-none divide-y-2">
                <div className="bg-background h-[250px] overflow-hidden relative">
                  <Image src="/decor/techstack-hex.svg" alt="Tech stack hexagons" width={400} height={200} className="object-contain absolute -right-12 -bottom-12" />
                </div>

                <div className="p-6">
                  <Text as="h3" className="mb-4">Integrate with your favorite tech stack</Text>
                  <p className="text-sm text-muted-foreground">
                    This solution integrates smoothly with React apps using TypeScript and Tailwind CSS, adhering to Shadcn/ui patterns while offering flexibility across frameworks.
                  </p>
                </div>
              </Card>
            </div>

            {/* MCP Server Card */}
            <div className="relative lg:col-span-3">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
              <Card className="relative shadow-none h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-x-2 h-full">
                  <div className="bg-background relative overflow-hidden">
                    <Image src="/decor/retroui_mcp.png" alt="Design illustration" width={400} height={400} className="object-contain h-[350px] w-[350px] absolute -right-6 -bottom-0" />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <Text as="h3" className="mb-4">MCP server support with Shadcn</Text>
                      <p className="text-sm text-muted-foreground mb-6">
                        Discover our bold neo-brutalist sections. With striking hero blocks, pricing tables, and feature grids, your product will stand out in the market.
                      </p>
                    </div>

                    {/* Terminal Preview */}
                    <div className="relative">
                      <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-border bg-primary" />
                      <div className="relative bg-background border-2 border-border p-3">
                        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D] border"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4] border"></div>
                          <div className="ml-auto">
                            <CopyIcon className="w-4 h-4" />
                          </div>
                        </div>
                        <code className="text-sm font-mono">npx shadcn@latest mcp init</code>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* UI Components Section */}
      <section className="container mx-auto px-4 py-28 space-y-14">
        <div className="text-center space-y-6">
          <Text as="h2" className="uppercase text-4xl lg:text-5xl">
            Neo Brutalist UI
            <br />
            <span className="relative text-outline-foreground text-shadow-foreground">
              <Image src="/decor/compas.svg" alt="components decoration" width={80} height={80} className="absolute h-[80px] w-[80px] -left-10 -top-4" />
              components
            </span>
          </Text>

          <Text className="text-muted-foreground max-w-2xl mx-auto">
            Discover scalable Shadcn UI components designed with Base UI and Radix UI, perfect for landing pages, SaaS dashboards, and modern web apps.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreComponents.map((component) => (
            <Link
              key={component.id}
              href={`/docs/components/${component.id}`}
              className="group"
            >
              <Card className="w-full">
                <Card.Content className="p-0">
                  {/* Image Section */}
                  {component.cover && (
                    <Image
                      src={component.cover}
                      alt={component.displayName}
                      width={400}
                      height={200}
                      className="object-contain w-full h-auto hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Text Section */}
                  <div className="p-4 border-t-2">
                    <Text as="h3" className="mb-2">
                      {component.displayName}
                    </Text>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button render={<Link href="/docs/components" />}>
            View All Components <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Blocks Section */}
      <section className="container mx-auto px-4 py-28 space-y-14">
        <div className="text-center space-y-6">
          <Text as="h2" className="uppercase text-4xl lg:text-5xl">
            Build faster with 200+
            <br />
            <span className="relative text-outline-foreground text-shadow-foreground">
              <Image src="/decor/lego.svg" alt="components decoration" width={90} height={90} className="absolute h-[90px] w-[90px] -left-16 -top-6" />
              Blocks
            </span>
          </Text>

          <Text className="text-muted-foreground max-w-2xl mx-auto">
            Discover scalable Shadcn UI components designed with Base UI and Radix UI, perfect for landing pages, SaaS dashboards, and modern web apps.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blockConfig.blocks.slice(0, 9).map((block) => (
            <Link key={block.slug} href={`/blocks/${block.slug}`}>
              <Card className="w-full group overflow-hidden">
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
                    <Text as="h3" className="mb-2">{block.name}</Text>
                    <p className="text-sm text-muted-foreground">{block.description}</p>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button render={<Link href="/blocks" />}>
            View All Blocks <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Ready-to-Use Templates */}
      <section className="container mx-auto px-4 py-28 space-y-14">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center md:justify-between">
          <Text as="h2" className="uppercase text-4xl lg:text-5xl">
            Pre-built and Customizable
            <br />
            <span className="relative text-outline-foreground text-shadow-foreground">
              <Image src="/decor/paint_brush.svg" alt="components decoration" width={100} height={100} className="absolute h-[100px] w-[100px] -left-14 -top-8" />
              Templates
            </span>
          </Text>
          <Button className="bg-primary" render={<Link href="/templates">All Templates</Link>} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {templateConfig.templates.slice(0, 3).map((template) => (
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
                <Text className="text-sm text-muted-foreground mb-4">{template.description}</Text>
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
      </section>


      <TestimonialsSection />
      <StatsSection />
    </main>
  );
}
