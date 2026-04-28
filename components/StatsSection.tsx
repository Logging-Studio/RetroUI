import { Button, Text } from "@/components/base-retroui";
import { GithubIcon, MessageCircleIcon, FigmaIcon } from "lucide-react";
import Image from "next/image";

export function StatsSection() {
  return (
    <section className="container mx-auto px-4 py-28">
      <div className="relative">
        <div className="absolute top-2 left-2 -right-2 -bottom-2 bg-primary border-2 border-border"></div>
        <div className="relative grid grid-cols-1 max-md:divide-y-2 md:grid-cols-3 md:divide-x-2 divide-border bg-card border-2 border-black *:h-[420px]">
          <div className="p-8 relative overflow-hidden">
            <Text className="text-lg font-medium mb-2">GitHub Stars</Text>
            <Text as="h3" className="mb-8 text-6xl lg:text-7xl [-webkit-text-stroke:6px_var(--foreground)] [paint-order:stroke_fill] text-[#01C971] tracking-[2px] [text-shadow:6px_6px_0_var(--foreground)]">1.5K+</Text>
            <Button className="bg-[#01C971] hover:bg-[#01C971]/80"><GithubIcon className="size-4 mr-2 stroke-3" /> Star on GitHub</Button>
            <Image src="/decor/github.svg" alt="GitHub" width={200} height={200} className="absolute -right-8 -bottom-8 transform -rotate-20" />
          </div>
          <div className="p-8 relative overflow-hidden">
            <Text className="text-lg font-medium mb-2">Discord Members</Text>
            <Text as="h3" className="mb-8 text-6xl lg:text-7xl [-webkit-text-stroke:6px_var(--foreground)] [paint-order:stroke_fill] text-[#01ABFF] tracking-[2px] [text-shadow:6px_6px_0_var(--foreground)]">120+</Text>
            <Button className="bg-[#01ABFF] hover:bg-[#01ABFF]/80"><MessageCircleIcon className="size-4 mr-2 stroke-3" /> Join Community</Button>
            <Image src="/decor/discord.svg" alt="Discord" width={200} height={200} className="absolute -right-4 -bottom-4 transform -rotate-10" />

          </div>
          <div className="p-8 relative overflow-hidden">
            <Text className="text-lg font-medium mb-2">Figma Users</Text>
            <Text as="h2" className="mb-8 text-6xl lg:text-7xl [-webkit-text-stroke:6px_var(--foreground)] [paint-order:stroke_fill] text-[#FF5C57] tracking-[2px] [text-shadow:6px_6px_0_var(--foreground)]">250+</Text>
            <Button className="bg-[#FF5C57] hover:bg-[#FF5C57]/80"><FigmaIcon className="size-4 mr-2 stroke-3" /> Get Free Kit</Button>
            <Image src="/images/logos/figma.svg" alt="Figma" width={200} height={200} className="absolute -right-10 -bottom-10 transform -rotate-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
