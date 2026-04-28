"use client";

import { Button } from "@/components/base-retroui/Button";
import { Text } from "@/components/base-retroui/Text";
import { Mail, TwitterIcon, Github, Figma } from "lucide-react";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import Image from "next/image";

const companyLinks = [
  { name: "Blog", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const supportLinks = [
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Documentation", href: "/docs" },
  { name: "Changelog", href: "/changelog" },
  { name: "Discord Community", href: "https://discord.com/invite/Jum3NJxK6Q" },
  { name: "Email Support", href: "mailto:arif@retroui.dev" },
];

const productLinks = [
  { name: "OS Components", href: "/components" },
  { name: "UI Blocks", href: "/blocks" },
  { name: "Templates", href: "/templates" },
  { name: "Figma Kit", href: "/figma" },
  { name: "Themes", href: "/themes" },
  { name: "Neo Screenshot", href: "https://no.retroui.dev" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <footer className="mt-24 bg-card">
      <div className="border-t-2 relative">
        <div className="grid min-h-[400px] container px-4 mx-auto grid-cols-1 lg:grid-cols-5 gap-12 max-md:divide-y-2 md:divide-x-2 divide-border">
          <div className="lg:col-span-2 pr-8 py-12 relative mg">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/images/logo.png" alt="RetroUI" width={40} height={40} />
              <Text as="h3" className="lg:text-3xl font-head">
                RetroUI
              </Text>
            </div>
            <Text className="mb-8">The platform for developers and designers who love unique, playful, and brutalist design.</Text>

            <div className="flex gap-3">
              <Button
                size="icon"
                variant="secondary"
                render={
                  <a href="https://discord.com/invite/Jum3NJxK6Q"
                    target="_blank"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </a>
                }>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                render={
                  <a href="https://x.com/ariflogs"
                    target="_blank"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                }>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                render={
                  <a href="https://github.com/Logging-Studio/RetroUI"
                    target="_blank"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                }>
              </Button>
                            <Button
                size="icon"
                variant="secondary"
                render={
                  <a href="https://github.com/Logging-Studio/RetroUI"
                    target="_blank"
                  >
                    <Figma className="w-5 h-5" />
                  </a>
                }>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                render={
                  <a href="mailto:arif@retroui.dev"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                }
              ></Button>
            </div>

          </div>

          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8 max-md:divide-y-2 md:divide-x-2 divide-border">
            <div className="lg:col-span-1 py-8">
              <Text as="h6" className="mb-6">
                PRODUCT
              </Text>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline underline-offset-4 decoration-2 transition-all"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 py-8">
              <Text as="h6" className="mb-6">
                SUPPORT
              </Text>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline underline-offset-4 decoration-2 transition-all"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 py-8">
              <Text as="h6" className="mb-6">
                COMPANY
              </Text>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline underline-offset-4 decoration-2 transition-all"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full border-y-2">
            <Image
              src="/decor/footer_flower.png"
              alt="Footer decoration"
              width={1000}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <div className="grid max-md:divide-y-2 md:divide-x-2 divide-border grid-cols-1 lg:grid-cols-3 container mx-auto border-x-2">
            <a
              href="https://commercn.com"
              target="_blank"
              className="flex items-center justify-center gap-3 p-8 hover:bg-gray-50 transition-colors"
            >
              <Image src="/images/other_products/commercn.png" alt="CommerCN" width={150} height={300} className="object-contain" />
            </a>
            <a
              href="https://tanstackstarterkit.com"
              target="_blank"
              className="flex items-center justify-center gap-3 p-8 hover:bg-gray-50 transition-colors"
            >
              <Image src="/images/other_products/tssk.png" alt="TanStack Starter Kit" width={150} height={300} className="object-contain" />
            </a>
            <a
              href="https://evendeals.com"
              target="_blank"
              className="flex items-center justify-center gap-3 p-8 hover:bg-gray-50 transition-colors"
            >
              <Image src="/images/other_products/evendeals.png" alt="EvenDeals" width={80} height={200} className="object-contain" />
            </a>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t-2">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Text className="text-xs">
            © 2026 LOGGING STUDIO. ALL RIGHTS RESERVED.
          </Text>
        </div>
      </div>
    </footer >
  );
}

export default Footer;