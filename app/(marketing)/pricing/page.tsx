"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Text,
  Card,
  Badge,
  Accordion,
} from "@/components/retroui";
import { Check, Gift, Code2, Figma, Package } from "lucide-react";
import Footer from "@/components/footer";

type PricingType = "react" | "figma" | "combo";

const pricingData = {
  react: {
    free: { price: 0, name: "OS" },
    pro: { price: 119, label: "FOR POPULAR", name: "Solo" },
    team: { price: 399, label: "FOR AGENCIES", name: "Team" },
  },
  figma: {
    free: { price: 0, name: "Community" },
    pro: { price: 99, label: "FOR POPULAR", name: "Solo" },
    team: { price: 299, label: "FOR AGENCIES", name: "Team" },
  },
  combo: {
    free: { price: 0, name: "Community" },
    pro: { price: 199, label: "BEST VALUE", name: "Solo" },
    team: { price: 499, label: "FOR AGENCIES", name: "Team" },
  },
};

const essentialsFeatures = [
  { text: "20+ open-source components", enabled: true },
  { text: "Community Discord access", enabled: true },
  { text: "Public documentation", enabled: true },
  { text: "Personal use license", enabled: true },
  { text: "Premium components (60+)", enabled: false },
  { text: "Figma Design Kit", enabled: false },
  { text: "Video tutorials", enabled: false },
  { text: "Commercial license", enabled: false },
  { text: "Priority support", enabled: false },
];

const proFeatures = [
  { text: "Everything in Essential", enabled: true },
  { text: "30+ premium templates", enabled: true },
  { text: "Video tutorials", enabled: true },
  { text: "Priority email support", enabled: true },
  { text: "Advanced Figma components", enabled: true },
  { text: "3 developer seats", enabled: true },
  { text: "Early access - new components", enabled: true },
  { text: "Google Rich Snippets kit", enabled: true },
  { text: "Commercial use license", enabled: true },
];

const teamFeatures = [
  { text: "Everything in Pro", enabled: true },
  { text: "Unlimited developer seats", enabled: true },
  { text: "Custom component requests", enabled: true },
  { text: "Dedicated Slack channel", enabled: true },
  { text: "White-label license", enabled: true },
  { text: "Team onboarding call", enabled: true },
  { text: "Priority feature requests", enabled: true },
  { text: "Advanced design system kit", enabled: true },
  { text: "Google Seller Ratings kit", enabled: true },
];

const faqItems = [
  {
    question: "WHAT'S INCLUDED IN RETROUI PRO?",
    answer: [
      "A growing collection of premium React components",
      "Pre-built marketing & dashboard templates",
      "A Figma UI kit for designers",
      "Lifetime access to all current and future Pro components.",
    ],
  },
  {
    question: "WHO IS RETROUI PRO FOR?",
    answer: [
      "Developers who want to ship faster with pre-built components",
      "Designers who need a comprehensive Figma design system",
      "Agencies building multiple client projects",
      "Startups looking to validate ideas quickly",
    ],
  },
  {
    question: "IS THERE A SUBSCRIPTION FEE?",
    answer: [
      "No! RetroUI Pro is a one-time payment.",
      "You get lifetime access to all components and templates.",
      "All future updates are included at no extra cost.",
    ],
  },
  {
    question: "DO YOU OFFER REFUNDS?",
    answer: [
      "Yes, we offer a 14-day money-back guarantee.",
      "If you're not satisfied with your purchase, contact us for a full refund.",
      "No questions asked.",
    ],
  },
  {
    question: "CAN I CUSTOMIZE THE COMPONENTS?",
    answer: [
      "Absolutely! All components are built with Tailwind CSS.",
      "You have full access to the source code.",
      "Customize colors, spacing, and styles to match your brand.",
    ],
  },
  {
    question: "DO YOU OFFER SUPPORT?",
    answer: [
      "Pro users get priority email support.",
      "Team users get dedicated Slack channel support.",
      "We also have comprehensive documentation and video tutorials.",
    ],
  },
];

export default function PricingPage() {
  const [pricingType, setPricingType] = useState<PricingType>("react");

  const currentPricing = pricingData[pricingType];

  return (
    <main>
      <section className="container max-w-7xl mx-auto px-4 py-16 text-center">
        <Text as="h1" className="mb-4 uppercase">
          <span className="text-card text-outline-foreground text-shadow-foreground relative inline-block pl-8">
            <Image
              src="/decor/pay.svg"
              alt="pay decoration"
              width={120}
              height={120}
              className="inline-block absolute -top-16 -left-8 w-30 h-30"
            />
            Pay
          </span>
          {" "}once, use forever
        </Text>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Get lifetime access to premium components, templates, figma kit,
          plus all future updates for a simple one-time price.
        </p>

        {/* Pricing Type Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-3xl mx-auto border-2 border-black bg-white p-2">
          <button
            onClick={() => setPricingType("react")}
            className={`flex items-center gap-2 px-4 py-3 flex-1 border-2 border-black transition-colors ${pricingType === "react" ? "bg-blue-100" : "bg-white"
              }`}
          >
            <Code2 className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <Text className="font-bold text-sm">React</Text>
              <Text className="text-xs text-muted-foreground">
                Get all coded components
              </Text>
            </div>
          </button>

          <button
            onClick={() => setPricingType("figma")}
            className={`flex items-center gap-2 px-4 py-3 flex-1 border-2 border-black transition-colors ${pricingType === "figma" ? "bg-purple-100" : "bg-white"
              }`}
          >
            <Figma className="w-5 h-5 text-purple-500" />
            <div className="text-left">
              <Text className="font-bold text-sm">Figma</Text>
              <Text className="text-xs text-muted-foreground">
                Get full Figma file
              </Text>
            </div>
          </button>

          <button
            onClick={() => setPricingType("combo")}
            className={`flex items-center gap-2 px-4 py-3 flex-1 border-2 border-black transition-colors relative ${pricingType === "combo" ? "bg-orange-100" : "bg-white"
              }`}
          >
            <Package className="w-5 h-5 text-orange-500" />
            <div className="text-left">
              <Text className="font-bold text-sm">Combo</Text>
              <Text className="text-xs text-muted-foreground">
                Get it all! Code + Figma file
              </Text>
            </div>
            <Badge className="absolute -top-3 -right-2 bg-primary text-black text-xs font-bold">
              BEST VALUE
            </Badge>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-[6px] border-l-primary">
            <Card.Content className="p-6">
              <div className="mb-6">
                <Gift className="w-10 h-10 mb-4" />
                <Text as="h3" className="text-2xl font-bold mb-2">
                  {currentPricing.free.name}
                </Text>
                <Text className="text-sm text-muted-foreground mb-4">
                  FOR STARTERS
                </Text>
                <Text className="text-sm text-muted-foreground mb-6">
                  Start building with RetroUI at zero cost. Perfect for side
                  projects and learning.
                </Text>
                <Text as="h2" className="text-5xl font-bold mb-6">
                  Free
                </Text>
                <Button className="w-full bg-white border-2 border-black hover:bg-gray-50">
                  Start for Free
                </Button>
                <Text className="text-xs text-center text-muted-foreground mt-2">
                  No credit card required
                </Text>
              </div>

              <div className="space-y-1 mt-8">
                <Text className="font-bold text-sm mb-3">WHAT'S INCLUDED</Text>
                {essentialsFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.enabled ? "text-green-600" : "text-gray-400"}`}
                    />
                    <Text className="text-sm">{feature.text}</Text>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Pro / Solo */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-[6px] border-l-blue-500">
            <Card.Content className="p-6">
              <div className="mb-6">
                <Package className="w-10 h-10 mb-4 text-blue-500" />
                <Text as="h3" className="text-2xl font-bold mb-2">
                  {currentPricing.pro.name}
                </Text>
                <Text className="text-sm text-muted-foreground mb-4">
                  {currentPricing.pro.label}
                </Text>
                <Text className="text-sm text-muted-foreground mb-6">
                  The full RetroUI toolkit — templates, tutorials, priority
                  support and {pricingType === "react" ? "1 developer" : pricingType === "figma" ? "1 designer" : "full"} license.
                </Text>
                <div className="flex items-baseline gap-2 mb-6">
                  <Text as="h2" className="text-5xl font-bold">
                    ${currentPricing.pro.price}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    one-time
                  </Text>
                </div>
                <Button className="w-full bg-blue-500 border-2 border-black text-white hover:bg-blue-600">
                  Get {currentPricing.pro.name}
                </Button>
                <Text className="text-xs text-center text-muted-foreground mt-2">
                  One-time payment, lifetime access
                </Text>
              </div>

              <div className="space-y-1 mt-8">
                <Text className="font-bold text-sm mb-3">WHAT'S INCLUDED</Text>
                {proFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.enabled ? "text-blue-600" : "text-gray-400"}`}
                    />
                    <Text className="text-sm">{feature.text}</Text>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Team */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-[6px] border-l-red-500">
            <Card.Content className="p-6">
              <div className="mb-6">
                <Package className="w-10 h-10 mb-4 text-red-500" />
                <Text as="h3" className="text-2xl font-bold mb-2">
                  {currentPricing.team.name}
                </Text>
                <Text className="text-sm text-muted-foreground mb-4">
                  {currentPricing.team.label}
                </Text>
                <Text className="text-sm text-muted-foreground mb-6">
                  Full collaboration suite for studios and teams building at
                  scale, no seat limits.
                </Text>
                <div className="flex items-baseline gap-2 mb-6">
                  <Text as="h2" className="text-5xl font-bold">
                    ${currentPricing.team.price}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    one-time
                  </Text>
                </div>
                <Button className="w-full bg-red-500 border-2 border-black text-white hover:bg-red-600">
                  Get {currentPricing.team.name}
                </Button>
                <Text className="text-xs text-center text-muted-foreground mt-2">
                  One-time payment, lifetime access
                </Text>
              </div>

              <div className="space-y-1 mt-8">
                <Text className="font-bold text-sm mb-3">WHAT'S INCLUDED</Text>
                {teamFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.enabled ? "text-red-600" : "text-gray-400"}`}
                    />
                    <Text className="text-sm">{feature.text}</Text>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Text as="h2" className="text-4xl lg:text-5xl font-bold mb-4">
              FREQUENTLY ASKED
              <br />
              <span className="text-outlined">QUESTIONS</span>
            </Text>
            <p className="text-muted-foreground mb-8">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <div>
            <Accordion className="space-y-4">
              {faqItems.map((item, index) => (
                <Accordion.Item key={index} value={`item-${index}`}>
                  <Accordion.Header>
                    <Text className="font-bold text-sm">{item.question}</Text>
                  </Accordion.Header>
                  <Accordion.Content>
                    <ul className="space-y-2">
                      {item.answer.map((line, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <Text className="text-sm">{line}</Text>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl">
          <Card.Content className="p-8">
            <Text as="h3" className="text-2xl font-bold mb-2">
              STILL HAVE A QUESTION?
            </Text>
            <Text className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </Text>
            <Button className="w-full bg-primary border-2 border-black">
              Contact Support
            </Button>
          </Card.Content>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
