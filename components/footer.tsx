"use client";

import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Mail, TwitterIcon } from "lucide-react";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const quickLinks = [
  { name: "Docs", href: "/docs" },
  { name: "Blogs", href: "/blogs" },
  { name: "Community", href: "https://discord.com/invite/Jum3NJxK6Q" },
  { name: "Pro Blocks", href: "https://pro.retroui.dev" },
];

const projectLinks = [
  { name: "CommerCN", href: "#" },
  { name: "Tanstack Starter Kit", href: "#" },
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
    <footer className="border-t-2 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 max-w-md">
            <Text as="h2" className="mb-6">
              STAY CONNECTED
            </Text>
            <Text className="text-muted-foreground leading-relaxed mb-2 text-sm">
              Join our community to stay updated with new component releases, updates, and special offers.
            </Text>
            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button className="w-54 justify-center" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : "SUBSCRIBE"}
                </Button>
              </div>
              {status === "success" && (
                <Text className="text-green-600 text-sm mt-2">Subscribed successfully!</Text>
              )}
              {status === "error" && (
                <Text className="text-red-600 text-sm mt-2">Failed to subscribe. Try again.</Text>
              )}
            </form>

            <div className="flex space-x-6">
              <a href="mailto:arif@retroui.dev" target="_blank" className="flex items-center gap-2">
                <div className="bg-black text-white p-1 shadow shadow-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="hover:underline underline-offset-4">
                  arif@retroui.dev
                </span>
              </a>

              <a href="https://x.com/ariflogs" target="_blank" className="flex items-center gap-2">
                <div className="bg-black text-white p-1 shadow shadow-primary">
                  <TwitterIcon className="w-4 h-4" />
                </div>
                <span className="hover:underline underline-offset-4">@ariflogs</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Text as="h4" className="mb-6">
              Quick Links
            </Text>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:underline font-medium underline-offset-4 decoration-primary decoration-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <Text as="h4" className="mb-6">
              By Makers of RetroUI
            </Text>
            <ul className="space-y-2">
              {projectLinks.map((project) => (
                <li key={project.name}>
                  <a
                    href={project.href}
                    target="_blank"
                    className="hover:underline font-medium underline-offset-4 decoration-primary decoration-2 transition-all"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <Text className="text-sm text-background">
            © 2026 Logging Studio. Crafted with ❤️ and ☕.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;