import {
  Button,
  Text,
  Card,
  Avatar,
  Badge,
} from "@/components/retroui";
import {
  ArrowRight,
  GithubIcon,
  MessageCircle,
  Star,
} from "lucide-react";
import Footer from "@/components/footer";
import Image from "next/image";
import { users } from "@/config/data";
import { BlocksParallax } from "@/components/BlocksParallax";

const testimonials = [
  {
    name: "Evelyn Myers",
    role: "UX Designer",
    avatar: "/placeholder-avatar.png",
    comment: "Great experience using RetroUI components in my design workflow. Highly recommended!",
  },
  {
    name: "Julian Marcus",
    role: "Frontend Developer",
    avatar: "/placeholder-avatar.png",
    comment: "I've integrated RetroUI components into my project, and I'm thrilled with the results.",
  },
  {
    name: "Evelyn Myers",
    role: "Product Designer",
    avatar: "/placeholder-avatar.png",
    comment: "RetroUI has truly elevated my design process. The components are versatile!",
  },
  {
    name: "Evelyn Myers",
    role: "Creative Lead",
    avatar: "/placeholder-avatar.png",
    comment: "The customization options are endless. RetroUI fits perfectly into our design system.",
  },
  {
    name: "Evelyn Myers",
    role: "Design Engineer",
    avatar: "/placeholder-avatar.png",
    comment: "Building with RetroUI has been a game-changer for our team's productivity.",
  },
  {
    name: "Evelyn Myers",
    role: "UI Developer",
    avatar: "/placeholder-avatar.png",
    comment: "Clean, modern, and easy to implement. RetroUI is now my go-to component library.",
  },
];

const componentsList = [
  { name: "ALERT", category: "Feedback" },
  { name: "AVATAR", category: "Display" },
  { name: "BADGE", category: "Display" },
  { name: "BUTTON", category: "Input" },
  { name: "CARD", category: "Layout" },
  { name: "CHECKBOX", category: "Input" },
  { name: "DRAWER", category: "Overlay" },
  { name: "DROPDOWN", category: "Overlay" },
  { name: "INPUT FIELD", category: "Input" },
];

export default function ReactHomepage() {

  return (
    <main>
      <section className="bg-[url('/decor/bg-triangle-pattern.svg')] bg-cover bg-center">
        <div className="container max-w-7xl px-4 py-24 mx-auto text-center ">
          <Text as="h1" className="uppercase">
            Not every website has to
            <br />
            <span className="text-card text-outline-foreground text-shadow-foreground">L<Image src="/decor/eye.svg" alt="look decoration" height={98} width={98} className="inline-block -mx-2" />k the same!</span>
          </Text>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A bold, modern React + TailwindCSS UI library that makes your projects stand out from the crowd.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">

            <div className="relative inline-block group">
              {/* Outline frame - sits behind, extends to cover shadow */}
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />

              <button className="px-4 py-1.5 font-head border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5">
                Browse Blocks
              </button>
            </div>
            <Button variant="link">
              All Products <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
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
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <Text as="h2" className="mb-4 uppercase text-center">
          <span className="relative inline-block">
            <Image src="/decor/compas.svg" alt="compass decoration" width={80} height={80} className="inline-block -mb-2" />
          </span>
          DESIGNED TO SHIP FAST
          <br />
          WITHOUT LOOKING BORING
        </Text>
        <p className="text-muted-foreground mb-12 max-w-4xl mx-auto text-center">
          An ecosystem tailored for developers, featuring a reliable framework, reusable elements, and complete code control. It is crafted to enhance and sustain interfaces as products evolve.
        </p>

        {/* First Row - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          {/* Left Card - Spans 3 columns */}
          <div className="lg:col-span-3 relative">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
            <Card className="relative bg-[#FFF8E7] border-2 border-black shadow-none h-full">
              <Card.Content className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Illustration Section */}
                  <div className="flex items-center justify-center bg-[#FFF8E7] border-2 border-black p-8">
                    <Image src="/decor/compas.svg" alt="Design illustration" width={300} height={300} className="object-contain" />
                  </div>

                  {/* Text and CLI Section */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <Text className="font-bold text-2xl mb-4">COPY-PASTE OR JUST USE YOUR CLI</Text>
                      <p className="text-sm text-muted-foreground mb-6">
                        Discover our bold neo-brutalist sections. With striking hero blocks, pricing tables, and feature grids, your product will stand out in the market.
                      </p>
                    </div>

                    {/* Terminal Preview */}
                    <div className="relative">
                      <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-[#4ECDC4]" />
                      <div className="relative bg-white border-2 border-black p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 rounded-full bg-[#FF6B6B] border border-black"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFD93D] border border-black"></div>
                          <div className="w-3 h-3 rounded-full bg-[#4ECDC4] border border-black"></div>
                          <div className="ml-auto">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="8" y="8" width="8" height="8" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                        <code className="text-sm font-mono">npx shadcn add @retroui/button</code>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Right Card - Spans 2 columns */}
          <div className="lg:col-span-2 relative">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
            <Card className="relative bg-[#FFF8E7] border-2 border-black shadow-none h-full">
              <Card.Content className="p-0">
                {/* Illustration Section */}
                <div className="flex items-center justify-center bg-[#FFF8E7] border-b-2 border-black p-8 min-h-[300px]">
                  <Image src="/decor/customize.svg" alt="Customization" width={300} height={200} className="object-contain" />
                </div>

                {/* Text Section */}
                <div className="p-8">
                  <Text className="font-bold text-2xl mb-4">FULLY CUSTOMIZABLE</Text>
                  <p className="text-sm text-muted-foreground">
                    Own and modify every component. Tailwind CSS allows you to adjust colors, borders, shadows, and animations to fit your brand.
                  </p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Second Row - Equal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack Card */}
          <div className="relative">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
            <Card className="relative bg-[#FFF8E7] border-2 border-black shadow-none">
              <Card.Content className="p-0">
                {/* Illustration Section */}
                <div className="flex items-center justify-center bg-[#FFF8E7] border-b-2 border-black p-8 min-h-[280px]">
                  <Image src="/decor/techstack-hex.svg" alt="Tech stack hexagons" width={350} height={200} className="object-contain" />
                </div>

                {/* Text Section */}
                <div className="p-8">
                  <Text className="font-bold text-2xl mb-4">SEAMLESSLY INTEGRATE WITH YOUR FAVORITE TECH STACK</Text>
                  <p className="text-sm text-muted-foreground">
                    This solution integrates smoothly with React apps using TypeScript and Tailwind CSS, adhering to Shadcn/ui patterns while offering flexibility across frameworks.
                  </p>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* MCP Server Card */}
          <div className="relative">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
            <Card className="relative bg-[#FFF8E7] border-2 border-black shadow-none">
              <Card.Content className="p-8">
                <div className="mb-8">
                  <Text className="font-bold text-2xl mb-4">NATIVE MCP SERVER SUPPORT</Text>
                  <p className="text-sm text-muted-foreground mb-6">
                    Discover our bold neo-brutalist sections. With striking hero blocks, pricing tables, and feature grids, your product will stand out in the market.
                  </p>
                </div>

                {/* Illustration Section */}
                <div className="flex items-center justify-center bg-[#FFF8E7] border-2 border-black p-8 mb-6 min-h-[200px]">
                  <div className="relative w-full h-48">
                    {/* Placeholder for MCP server illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-dashed border-black rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Terminal Preview */}
                <div className="relative">
                  <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-[#4ECDC4]" />
                  <div className="relative bg-white border-2 border-black p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B6B] border border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFD93D] border border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-[#4ECDC4] border border-black"></div>
                      <div className="ml-auto">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="8" y="8" width="8" height="8" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <code className="text-sm font-mono">npx @retroui/mcp start</code>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* 199+ Components Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <Text as="h2" className="text-4xl lg:text-5xl font-bold">
            BUILD FASTER WITH <span className="text-outlined">199+</span>
            <br />
            COMPONENTS
          </Text>
          <Button className="bg-primary">Browse All Components</Button>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          From simple buttons to complex data tables, we've got you covered with a vast library of pre-built components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {componentsList.map((component, index) => (
            <Card key={index} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Card.Content className="p-6">
                <div className="h-32 bg-gray-200 border-2 border-black rounded flex items-center justify-center mb-4">
                  <Text className="text-gray-400 text-sm">{component.name}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text className="font-bold">{component.name}</Text>
                  <Badge variant="outline" className="text-xs">{component.category}</Badge>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      {/* Ready-to-Use Templates */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <Text as="h2" className="text-4xl lg:text-5xl font-bold">
            READY-TO-USE CUSTOMIZABLE
            <br />
            <span className="text-outlined">TEMPLATES</span>
          </Text>
          <Button className="bg-primary">Explore RetroUI Pro</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "MULTIPAGE SAAS TEMPLATE", type: "Multi-page" },
            { name: "AGENCY TEMPLATE", type: "Landing Page" },
            { name: "DEVTOOLS TEMPLATE", type: "Dark Mode" },
          ].map((template, index) => (
            <Card key={index} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Card.Content className="p-0">
                <div className="h-64 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                  <Text className="text-gray-400">Template Preview</Text>
                </div>
                <div className="p-4">
                  <Text className="font-bold mb-2">{template.name}</Text>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">See Demo</Button>
                    <Button size="sm">Get Template</Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      {/* UI Components Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-4">
          <Text as="h2" className="text-4xl lg:text-5xl font-bold uppercase">
            CUSTOMIZABLE UI
            <br />
            <span className="relative inline-block">
              <Image src="/decor/question.svg" alt="key decoration" width={80} height={80} className="inline-block -mb-2" />
              OMPONENTS
            </span>
          </Text>
        </div>

        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Discover scalable Shadcn UI components designed with Base UI and Radix UI, perfect for landing pages, SaaS dashboards, and modern web apps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { name: "ACCORDION", description: "Expandable content panels.", image: "accordion.png" },
            { name: "ALERT", description: "Notification messages.", image: "alert.png" },
            { name: "AVATAR", description: "User image placeholders.", image: "avatar.png" },
            { name: "BADGE", description: "Status indicator labels.", image: "badge.png" },
            { name: "CALENDAR", description: "Date picker interfaces.", image: "calender.png" },
            { name: "BUTTON", description: "Interactive action triggers.", image: "button.png" },
          ].map((component, index) => (
            <div key={index} className="relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-black" />
              <Card className="relative bg-white border-2 border-black shadow-none">
                <Card.Content className="p-0">
                  <div className="h-64 bg-white flex items-center justify-center border-b-2 border-black p-8">
                    <Image
                      src={`/images/components/${component.image}`}
                      alt={component.name}
                      width={300}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <Text className="font-bold text-lg mb-2">{component.name}</Text>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                </Card.Content>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative inline-block">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-black" />
            <Button className="relative bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-black border-2 border-black shadow-none font-bold px-8 py-6 text-lg">
              View All Components <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <Text as="h2" className="text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-outlined">LOVED</span> BY DEVS, DESIGNERS
          <br />
          & CREATORS
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Card.Content className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black" />
                  <div>
                    <Text className="font-bold text-sm">{testimonial.name}</Text>
                    <Text className="text-xs text-muted-foreground">{testimonial.role}</Text>
                  </div>
                </div>
                <p className="text-sm">{testimonial.comment}</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      {/* Works With Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <Text className="text-center text-sm text-muted-foreground mb-8">WORKS PERFECTLY WITH</Text>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {["Next.js", "React", "Vite", "TailwindCSS", "shadcn/ui", "Remix", "Astro", "T3 Stack"].map((tech) => (
            <div key={tech} className="px-6 py-3 border-2 border-black bg-white font-bold">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Community Contributors */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12">
          <Text as="h2" className="text-4xl lg:text-5xl font-bold mb-4">
            COMMUNITY
            <br />
            <span className="text-outlined">CONTRIBUTORS</span>
          </Text>

          <div className="flex gap-4 mb-8">
            <Button className="bg-primary">Join Discord</Button>
            <Button variant="outline">
              <GithubIcon className="w-4 h-4 mr-2" />
              Contribute on Github
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black" />
            ))}
          </div>

          <div className="mt-8 h-64 bg-gray-200 border-2 border-black rounded flex items-center justify-center">
            <Text className="text-gray-400">Community Illustration</Text>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
