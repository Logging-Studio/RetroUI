"use server";

import {
  Button,
  Text,
  Input,
  Textarea,
  Card,
  Avatar,
  Badge,
  CommandDisplay,
} from "@/components/retroui";
import AccordionStyleDefault from "@/preview/components/accordion-style-default";
import AlertStyleDefaultIcon from "@/preview/components/alert-style-with-icon";
import AvatarStyleCircle from "@/preview/components/avatar-style-circle-sizes";
import BadgeStyleVariants from "@/preview/components/badge-style-variants";
import {
  ArrowRightIcon,
  ChartArea,
  GithubIcon,
  MessageCircle,
  PaintbrushIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import WorksWithSection from "@/components/WorksWithSection";

async function getContributors(): Promise<
  { avatar: string; username: string; url: string }[]
> {
  const request = await fetch(
    `https://api.github.com/repos/Logging-Stuff/RetroUI/contributors`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const contributorsList = await request.json();
  return contributorsList.map(
    (c: { avatar_url: string; login: string; html_url: string }) => ({
      avatar: c.avatar_url,
      username: c.login,
      url: c.html_url,
    }),
  );
}

export default async function Home() {
  const contributors = await getContributors();

  return (
    <main>
      <div className="bg-image bg-cover bg-no-repeat bg-center flex flex-col items-center min-h-screen">
        <section className="container max-w-6xl mx-auto px-4 lg:px-0 text-gray-900 flex justify-center items-center lg:gap-28 my-28">
          <div className="text-center lg:text-left w-full lg:w-2/3">
            <Link href="/docs/components/toc" className="mb-4 inline-block">
              <Badge>
                New TOC & Drawer components!
                <PaintbrushIcon className="ml-2 h-4 w-4 inline-block" />
              </Badge>
            </Link>

            <Text as="h1" className="text-5xl text-foreground lg:text-6xl mt-8">
              Make your projects
              <br />
              <span className="text-outlined">stand out!</span>
            </Text>

            <p className="text-lg text-muted-foreground mb-8 mt-4">
              A NeoBrutalism styled React + TailwindCSS UI library for building bold, modern web apps.
              Perfect for any project using Shadcn/ui.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/docs" passHref>
                <Button
                  className="w-full"
                  aria-label="Get Started with RetroUI"
                >
                  Get Started
                </Button>
              </Link>
              <div className="w-full max-w-72 shadow shadow-primary">
                <CommandDisplay command='npx shadcn add @retroui/button' />
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <Image
              alt="retro tv radio"
              src="/images/tv_radio.png"
              layout="responsive"
              width={500}
              height={500}
              className="h-full w-full"
            />
          </div>
        </section>
        <section className="container max-w-6xl mx-auto px-4 lg:px-0 lg:my-36">
          {/* <Text as="h2" className="mb-16 text-center">
              Old school with modern twist! ✨
            </Text> */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-8">
            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Button</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </Card.Content>
            </Card>
            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Badge</Card.Title>
              </Card.Header>
              <Card.Content>
                <BadgeStyleVariants />
              </Card.Content>
            </Card>
            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Avatar</Card.Title>
              </Card.Header>
              <Card.Content>
                <AvatarStyleCircle />
              </Card.Content>
            </Card>
            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Accordion</Card.Title>
              </Card.Header>
              <Card.Content>
                <AccordionStyleDefault />
              </Card.Content>
            </Card>
            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Input & Textarea</Card.Title>
              </Card.Header>
              <Card.Content>
                <Input />
                <div className="h-4"></div>
                <Textarea className="border-foreground" />
              </Card.Content>
            </Card>

            <Card className="w-full bg-background shadow-none">
              <Card.Header>
                <Card.Title>Alert</Card.Title>
              </Card.Header>
              <Card.Content>
                <AlertStyleDefaultIcon />
              </Card.Content>
            </Card>
          </div>
        </section>
      </div>

      <section className="container max-w-6xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-12 lg:gap-16 lg:grid-cols-2 my-36">
        <div className="w-full lg:w-3/5">
          <Text as="h2">
            Easily <span className="text-outlined">Customize</span> to Your Own
            Needs! 🛠️
          </Text>
          <div className="flex flex-col space-y-1 mt-6 mb-8 text-muted-foreground">
            <Text className="text-lg">
              Copy-Paste Ready: Components that you can just copy paste.
            </Text>
            <Text className="text-lg">
              Tailwind Based: Customizable with Tailwind CSS.
            </Text>
            <Text className="text-lg">
              Type Safe: Typescript support for all components.
            </Text>
          </div>
          <Link href="/docs/components/button" passHref>
            <Button>See Examples</Button>
          </Link>
        </div>
        <div className="w-full lg:w-2/5">
          <Image
            src="/images/code_show.svg"
            width={600}
            height={400}
            alt="retroui code showcase"
          />
        </div>
      </section>

      <section className="container max-w-6xl max-lg:px-4 mx-auto bg-[url('/images/starts_bg.svg')] bg-cover bg-no-repeat py-12">
        <Text as="h2" className="text-center mb-28 max-w-2xl mx-auto">
          A <span className="text-outlined">Growing</span> Community of Developers and Designers.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-start relative mx-auto">
            <Text as="h3" className="mb-2 font-sans">
              Github Stars
            </Text>
            <Text className="text-outlined text-7xl lg:text-8xl font-head">
              1,200+
            </Text>
            <Image
              src="/images/shooting_star.svg"
              width={120}
              height={120}
              alt="shotting stars"
              className="absolute -top-[80px] -left-[80px]"
            />
          </div>
          <div className="flex flex-col items-start relative mx-auto">
            <Text as="h3" className="mb-2 font-sans">
              Discord Members
            </Text>
            <Text className="text-outlined text-7xl lg:text-8xl font-head">
              100+
            </Text>
            <Image
              src="/images/shooting_star.svg"
              width={120}
              height={120}
              alt="shotting stars"
              className="absolute -right-[80px] -bottom-[80px] rotate-180"
            />
          </div>
        </div>
      </section>

      <WorksWithSection />

      <section className="container max-w-6xl mx-auto border-2 bg-primary border-black py-16 px-4 lg:p-16 my-36">
        <Text as="h2" className="text-center text-black mb-2">
          Community Contributors
        </Text>
        <Text className="text-xl text-center text-black mb-8">
          RetroUI core is free and open-source, and it is made possible by our
          awesome contributors.
        </Text>
        <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-2 lg:gap-4">
          {contributors.map((contributor) => (
            <Link
              key={contributor.username}
              href={contributor.url}
              target="_blank"
              passHref
              className="flex flex-col items-center"
            >
              <Avatar className="h-10 w-10 border-black lg:h-16 lg:w-16">
                <Avatar.Image
                  src={contributor.avatar}
                  alt={contributor.username}
                />
              </Avatar>
            </Link>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="https://github.com/logging-stuff/retroui"
            target="_blank"
            passHref
          >
            <Button
              className="bg-background"
              variant="outline"
            >
              <GithubIcon size="16" className="mr-2" />
              Star on Github
            </Button>
          </Link>
          <Link href="https://discord.gg/Jum3NJxK6Q" target="_blank" passHref>
            <Button
              className="bg-background"
              variant="outline"
            >
              <MessageCircle size="16" className="mr-2" />
              Join Community
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto px-4">
        <div className="container max-w-6xl h-full mx-auto py-16 flex flex-col justify-between gap-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-3/5">
              <Text as="h1" className="text-4xl lg:text-5xl">
                Ship <span className="text-outlined">Faster</span> With Blocks
                <br />
                and Templates 🚀
              </Text>
              <Text
                as="p"
                className="text-muted-foreground font-medium text-xl mt-2 mb-8"
              >
                Get access to 100+ premium blocks, templates and figma kit,
                ready to make your project stand out.
              </Text>

              <Link href="https://pro.retroui.dev/blocks" target="_blank">
                <Button>Explore RetroUI Pro</Button>
              </Link>
            </div>

            <div className="w-full md:w-2/5">
              <Image
                src="/images/pro_showcase.svg"
                width={1920}
                height={1080}
                alt="retroui pro ui blocks showcase"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
