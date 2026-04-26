"use client"

import { useState } from "react";
import Image from "next/image";
import {
  // Button,
  Text,
  Card,
  Badge,
  Accordion,
  Button,
} from "@/components/retroui";
import { Check, Gift, Rocket, Crown, Users } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/footer";
import { authApi } from "@/lib/api-client";
import { getPriceId, type PricingTier } from "@/lib/pricing";

const osFeatures = [
  { text: "All RetroUI base components", enabled: true },
  { text: "Figma community kit", enabled: true },
  { text: "Community Discord access", enabled: true },
  { text: "Public documentation", enabled: true },
  { text: "Commercial Usage", enabled: true }
];

const starterFeatures = [
  { text: "1 seat", enabled: true },
  { text: "200+ pro UI blocks", enabled: true },
  { text: "Lifetime access to future updates", enabled: true },
  { text: "Priority support", enabled: true },
  { text: "Everything in OS", enabled: true },
];

const proFeatures = [
  { text: "1 seat", enabled: true },
  { text: "200+ pro UI blocks", enabled: true },
  { text: "5 marketing site templates", enabled: true },
  { text: "1 admin dashboard template", enabled: true },
  { text: "Pro Figma kit access", enabled: true },
  { text: "Lifetime updates", enabled: true },
  { text: "Lifetime access to future updates", enabled: true },
  { text: "Priority support", enabled: true },
  { text: "Everything in OS", enabled: true },
];

const teamFeatures = [
  { text: "10 seat", enabled: true },
  { text: "200+ pro UI blocks", enabled: true },
  { text: "5 marketing site templates", enabled: true },
  { text: "1 admin dashboard template", enabled: true },
  { text: "Pro Figma kit access", enabled: true },
  { text: "Lifetime updates", enabled: true },
  { text: "Lifetime access to future updates", enabled: true },
  { text: "Priority support", enabled: true },
  { text: "Everything in OS", enabled: true },
];


const faqs = [
  {
    question: "What's included in RetroUI Pro?",
    answer: [
      "→ A growing collection of premium React components",
      "→ Pre-built marketing & dashboard templates",
      "→ A Figma UI kit for designers",
      "→ Lifetime access to all current and future Pro components.",
    ],
  },
  {
    question: "Who is RetroUI Pro for?",
    answer: [
      "→ Developers building React-based web apps.",
      "→ Designers looking for a unique, bold aesthetic for their projects.",
      "→ Product managers who need to build beautiful, functional dashboards.",
      "→ Anyone who loves the neo-brutalism design style!",
    ],
  },
  {
    question: "Is there a subscription fee?",
    answer: [
      "No, RetroUI Pro is a one-time purchase. Once you buy it, you’ll have lifetime access to all current and future Pro components.",
    ],
  },
  {
    question: "Do you offer refunds?",
    answer: [
      "No, we do not offer refunds. But if you have any issues with the product, please contact us at arif@retroui.dev and we'll do our best to help you.",
    ],
  },
  {
    question: "Can I customize the components?",
    answer: [
      "Absolutely! All components are built with React and TailwindCSS, making them highly customizable. You can easily adjust colors, spacing, typography, and more to match your project’s design.",
    ],
  },
  {
    question: "Can I suggest new components or features?",
    answer: ["Yes, We take feature requests and suggestions from our users."],
  },
  {
    question: "Do you offer support?",
    answer: [
      "Yes, We have a private Discord community where you can ask questions and get help from the team and other users.",
    ],
  },
  {
    question: "Do you offer student discounts?",
    answer: [
      "Yes! Email us at arif@retroui.dev with your .edu email address and we'll send you a 50% discount code.",
    ],
  },
];

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (tier: PricingTier) => {
    setLoadingTier(tier);

    try {
      const priceId = getPriceId(tier);

      // Grab Endorsely referral ID from window (if available)
      const endorselyReferral = typeof window !== 'undefined'
        ? (window as any).endorsely_referral
        : undefined;

      const result = await authApi.createCheckoutSession(priceId, endorselyReferral);

      if (result.sessionUrl) {
        window.location.href = result.sessionUrl;
      } else {
        toast.error(result.error || "Failed to start checkout");
        setLoadingTier(null);
      }
    } catch (error) {
      toast.error("Failed to start checkout");
      setLoadingTier(null);
    }
  };

  return (
    <main>
      <section className="container max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <Text as="h1" className="uppercase inline-flex items-center justify-center">
            <Image
              src="/decor/pay.svg"
              alt="pay decoration"
              width={80}
              height={80}
              className="inline-block w-20 h-20 -mr-2"
            />
            <span className="text-card text-outline-foreground text-shadow-foreground">
              Pay
            </span>
            {" "}once, use forever
          </Text>
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Get lifetime access to premium components, templates, figma kit,
          plus all future updates for a simple one-time price.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* OS - Free Tier */}
          <Card className="shadow-none h-full">
            <Card.Header className="p-6">
              <Gift className="w-6 h-6 mb-4" />
              <Text as="h4" className="mb-2">
                OS
              </Text>
              <Text className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Start building with RetroUI at zero cost.
              </Text>
              <Text className="text-5xl font-head mb-8">
                $0
              </Text>
              <Button>
                Browse Components
              </Button>
            </Card.Header>

            <Card.Content className="space-y-3 border-t-2 p-6">
              <Text className="font-bold text-sm mb-4 uppercase tracking-wider">WHAT'S INCLUDED</Text>
              {osFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                >
                  <div className={`w-4 h-4 border-2 border-black flex-shrink-0 flex items-center justify-center ${feature.enabled ? "bg-black" : "bg-white"}`}>
                    {feature.enabled && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                    {!feature.enabled && (
                      <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </div>
                  <Text className="text-sm leading-tight">{feature.text}</Text>
                </div>
              ))}
            </Card.Content>
          </Card>

          {/* Starter */}
          <Card className="relative bg-white border-2 border-black shadow-none h-full">
            <Card.Header className="p-6">
              <Rocket className="w-6 h-6 mb-4" />
              <Text as="h4" className="mb-2">
                Starter
              </Text>
              <Text className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Only want Blocks and don't care for the rest?
              </Text>
              <Text className="text-5xl font-head mb-8">
                $119
              </Text>
              <Button
                onClick={() => handleCheckout("starter")}
                disabled={loadingTier === "starter"}
              >
                {loadingTier === "starter" ? "Loading..." : "Get Starter"}
              </Button>
            </Card.Header>

            <Card.Content className="space-y-3 border-t-2 p-6">
              <Text className="font-bold text-sm mb-4 uppercase tracking-wider">WHAT'S INCLUDED</Text>
              {starterFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                >
                  <div className={`w-4 h-4 border-2 border-black flex-shrink-0 flex items-center justify-center ${feature.enabled ? "bg-black" : "bg-white"}`}>
                    {feature.enabled && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                    {!feature.enabled && (
                      <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </div>
                  <Text className="text-sm leading-tight">{feature.text}</Text>
                </div>
              ))}
            </Card.Content>
          </Card>

          {/* Pro - Most Popular */}
          <div className="relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-primary text-black text-xs font-bold px-3 py-1 border-2 border-black">
              MOST POPULAR
            </Badge>
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-primary" />
            <Card className="relative bg-white border-2 border-black shadow-none h-full">
              <Card.Header className="p-6">
                <Crown className="w-6 h-6 mb-4" />
                <Text as="h4" className="mb-2">
                  Pro
                </Text>
                <Text className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Get everything RetroUI has to offer - Blocks, Template & Figma Kit
                </Text>
                <Text className="text-5xl font-head mb-8">
                  $199
                </Text>
                <Button
                  onClick={() => handleCheckout("pro")}
                  variant="secondary"
                  disabled={loadingTier === "pro"}
                >
                  {loadingTier === "pro" ? "Loading..." : "Get Pro"}
                </Button>
              </Card.Header>

              <Card.Content className="space-y-3 border-t-2 p-6">
                <Text className="font-bold text-sm mb-4 uppercase tracking-wider">WHAT'S INCLUDED</Text>
                {proFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                  >
                    <div className={`w-4 h-4 border-2 border-black flex-shrink-0 flex items-center justify-center ${feature.enabled ? "bg-primary" : "bg-white"}`}>
                      {feature.enabled && (
                        <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                      )}
                      {!feature.enabled && (
                        <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      )}
                    </div>
                    <Text className="text-sm leading-tight">{feature.text}</Text>
                  </div>
                ))}
              </Card.Content>
            </Card>
          </div>

          {/* Team */}
          <Card className="relative bg-white border-2 border-black shadow-none h-full">
            <Card.Header className="p-6">
              <Users className="w-6 h-6 mb-4" />
              <Text as="h4" className="mb-2">
                Team
              </Text>
              <Text className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Full collaboration suite for studios and teams building at scale.
              </Text>
              <Text className="text-5xl font-head mb-8">
                $499
              </Text>
              <Button
                onClick={() => handleCheckout("team")}
                disabled={loadingTier === "team"}
              >
                {loadingTier === "team" ? "Loading..." : "Get Team"}
              </Button>
            </Card.Header>

            <Card.Content className="space-y-3 border-t-2 p-6">
              <Text className="font-bold text-sm mb-4 uppercase tracking-wider">WHAT'S INCLUDED</Text>
              {teamFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${!feature.enabled ? "opacity-40" : ""}`}
                >
                  <div className={`w-4 h-4 border-2 border-black flex-shrink-0 flex items-center justify-center ${feature.enabled ? "bg-black" : "bg-white"}`}>
                    {feature.enabled && (
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    )}
                    {!feature.enabled && (
                      <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </div>
                  <Text className="text-sm leading-tight">{feature.text}</Text>
                </div>
              ))}
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
              {faqs.map((item, index) => (
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
            {/* <Button className="w-full bg-primary border-2 border-black"> */}
            Contact Support
            {/* </Button> */}
          </Card.Content>
        </Card>
      </section>

      <Footer />
    </main >
  );
}
