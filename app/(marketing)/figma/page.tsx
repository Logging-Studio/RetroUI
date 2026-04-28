import {
  Button,
  Text,
  Card,
} from "@/components/base-retroui";
import { ArrowRight, Figma } from "lucide-react";
import Image from "next/image";
import { StatsSection } from "@/components/StatsSection";
import Link from "next/link";

export default function FigmaHomepage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[url('/decor/bg-triangle-pattern.svg')] bg-cover bg-center">
        <div className="container px-4 py-24 lg:py-28 mx-auto text-center relative">
          <Image src="/images/logos/figma.svg" alt="figma logo" width={60} height={60} className="hidden lg:block absolute top-10 left-10 transform -rotate-30" />
          <Image src="/images/logos/dribble.svg" alt="dribbble logo" width={60} height={60} className="hidden lg:block absolute bottom-10 right-12 transform -rotate-30" />
          <Image src="/images/logos/lucide.png" alt="lucide logo" width={70} height={70} className="hidden lg:block absolute bottom-20 left-32 transform -rotate-30" />

          <Text as="h1" className="uppercase text-5xl lg:text-6xl mb-6 max-w-5xl mx-auto">
            The Figma Kit for
            <br />
            <span className="relative inline-block text-outline-foreground text-shadow-foreground">
              Neo Brutalist Design
              <Image
                src="/decor/pen.svg"
                alt="design decoration"
                width={150}
                height={150}
                className="absolute -right-4 lg:-right-14 top-6 lg:-top-8 size-20 lg:size-25 inline-block"
              />
            </span>
          </Text>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
            Fully unique design system with RetroUI (Figma) Kit comes with 300+ neobrutal code components, designed for LLMs and optimized for production environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <div className="relative inline-block group">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />
              <button className="px-6 py-3 font-head border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5 flex items-center gap-2">
                <Figma className="w-4 h-4" />
                Get Started
              </button>
            </div>
            <Button variant="link">
              Notion Docs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Figma Preview Hero Image */}
      <section className="container max-w-6xl mx-auto px-4 py-24 relative">
        <div className="relative">
          <div className="absolute top-2 -right-2 -bottom-2 left-2 bg-[#FF5C57] border-2 border-black" />

          <div className="relative bg-white border-2 border-black">
            <div className="bg-primary border-b-2 border-black p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-foreground rounded-full" />
                  <div className="w-3 h-3 bg-foreground rounded-full" />
                  <div className="w-3 h-3 bg-foreground rounded-full" />
                </div>
              </div>
            </div>

            {/* Figma Interface */}
            <div className="bg-white h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for Figma screenshot */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
              <div className="relative text-center z-10">
                <div className="mb-6 relative">
                  <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
                  <Figma className="w-32 h-32 mx-auto text-gray-300 relative" />
                </div>
                <Text className="text-gray-400 text-3xl font-bold mb-2">
                  Figma Interface Preview
                </Text>
                <Text className="text-gray-400 text-sm">
                  Complete design system with components
                </Text>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-12 right-8">
            <Image src="/decor/cursor.svg" alt="cursor" width={80} height={80} />
          </div>
        </div>
      </section>

      {/* Scale Design and Development */}
      <section className="container max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="relative inline-block mb-6">
          <Image
            src="/decor/compas.svg"
            alt="scale decoration"
            width={100}
            height={100}
            className="absolute -left-4 lg:-left-20 -top-4 lg:-top-8 size-18 lg:size-24"
          />
          <Text as="h2" className="uppercase text-4xl lg:text-5xl">
            <span className="text-outline-foreground text-shadow-foreground">Scale</span> Design and
            <br />
            Development
          </Text>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Build consistent, on-brand interfaces faster. Our Figma kit provides all the building blocks you need with components and variants to take Figma's auto-layout for production, and two-way sync using code.
        </p>
      </section>

      {/* Features Grid */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Foundational Components */}
            <div className="relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FFD93D]" />
              <Card className="relative shadow-none p-6">
                <Text as="h4" className="mb-4">
                  Contains all the foundational
                  RetroUI components.
                </Text>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every RetroUI component, from buttons to dialogs, is accessible as a Figma component. Design confidently, assured that your designs will align seamlessly with your codebase.
                </p>
              </Card>
            </div>

            <div className="relative border-2 shadow-lg h-[700px] flex flex-col">
              <div className="bg-[#01ABFF] border-b-2 border-black p-3">
                <Figma className="w-5 h-5" />
              </div>

              <div className="bg-background flex items-end flex-1 justify-center relative overflow-hidden">
                <Image src="/images/figma/tailwind_classes.png" alt="Typography styles panel" width={400} height={600} className="h-[600px] w-auto" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#FF5C57]" />
              <Card className="relative shadow-none p-6">
                <Text as="h4" className="mb-4">
                  Easily customize your theme
                </Text>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every RetroUI component, from buttons to dialogs, is accessible as a Figma component. Design confidently, assured that your designs will align seamlessly with your codebase.
                </p>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative border-2 shadow-lg">
              <div className="bg-primary border-b-2 border-black p-3">
                <Figma className="w-5 h-5" />
              </div>

              <div className="bg-background flex items-center justify-center relative overflow-hidden">
                <Image src="/images/figma/components.png" alt="Components panel" width={800} height={600} className="w-full h-full" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#01ABFF]" />
              <Card className="relative shadow-none p-6">
                <Text as="h4" className="mb-4">
                  Tailwind classes support
                </Text>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every RetroUI component, from buttons to dialogs, is accessible as a Figma component. Design confidently, assured that your designs will align seamlessly with your codebase.
                </p>
              </Card>
            </div>

            <div className="relative border-2 shadow-lg h-[600px] flex flex-col">
              <div className="bg-[#FF5C57] border-b-2 border-black p-3">
                <Figma className="w-5 h-5" />
              </div>

              <div className="bg-background flex items-center flex-1 justify-end relative overflow-hidden">
                <Image src="/images/figma/theme.png" alt="Themes panel" width={400} height={400} className="h-[480px] w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      {/* Figma Preview Window */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <Text as="h2" className="uppercase mb-4 text-4xl lg:text-5xl">
            <span className="relative inline-block">
              <Image
                src="/images/logos/figma.svg"
                alt="figma decoration"
                width={85}
                height={160}
                className="absolute -left-12 -bottom-4 size-18 lg:size-22 transform -rotate-20"
              />
              <span className="text-outline-foreground text-shadow-foreground">Figma</span>
            </span>{" "}
            Preview
          </Text>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the full Figma file with all components, styles, and assets. Try it for free.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-gray-300" />
          <Card className="relative bg-white border-2 border-black shadow-none">
            <Card.Content className="p-4">
              {/* Browser Top Bar */}
              <div className="bg-white border-2 border-black p-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-[#FF5F56] rounded-full border border-black" />
                  <div className="w-3 h-3 bg-[#FFBD2E] rounded-full border border-black" />
                  <div className="w-3 h-3 bg-[#27C93F] rounded-full border border-black" />
                </div>
                <div className="flex-1 bg-gray-100 border-2 border-black px-4 py-2 text-xs font-mono">
                  figma.com/file/retroui-neobrutalism-kit
                </div>
              </div>

              {/* Preview Content */}
              <div className="bg-gray-100 border-2 border-black border-t-0 h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6 relative">
                    <div className="absolute -inset-4 bg-purple-500/10 blur-2xl rounded-full" />
                    <Figma className="w-40 h-40 mx-auto text-gray-300 relative" />
                  </div>
                  <Text className="text-gray-400 text-3xl font-bold mb-2">
                    Figma File Preview
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    Full design system with components and styles
                  </Text>
                </div>
              </div>

              {/* Browser Bottom Bar */}
              <div className="bg-[#FFD93D] border-2 border-black border-t-0 p-3 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
                <div className="w-2.5 h-2.5 bg-black/30 rounded-full" />
                <div className="w-2.5 h-2.5 bg-black/30 rounded-full" />
              </div>
            </Card.Content>
          </Card>
        </div>
      </section>


      {/* Start Building CTA */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="relative bg-[#0EA5E9] border-2 p-8 h-[600px] flex justify-center items-center">
          <Image src="/decor/pen-drawing.svg" alt="Pen Drawing" width={400} height={200} className="max-lg:hidden absolute top-0 left-12" />
          <Image src="/decor/pencil.svg" alt="Pencil" width={200} height={50} className="w-40 lg:w-50 absolute top-0 right-12" />
          <Image src="/decor/color-pick.svg" alt="Color pick" width={280} height={280} className="max-lg:hidden absolute bottom-0 left-0" />
          <Image src="/decor/using-figma.svg" alt="Using figma" width={160} height={300} className="max-lg:hidden absolute bottom-20 right-12" />
          <Image src="/decor/green-pointy-thing.svg" alt="star decoration" width={100} height={50} className="w-15 lg:w-25 absolute bottom-0 right-100" />

          {/* Content */}
          <div className="text-center max-w-2xl mx-auto">
            <Text as="h2" className="text-5xl lg:text-6xl mb-8">
              <span className="text-outline-foreground-sm text-shadow-foreground-sm">Design Your Next Dream Project</span>
            </Text>

            <div className="relative inline-block group">
              <Button className="text-lg" render={<Link href="/signup">Get Started</Link>} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
