"use client";

import { useEffect } from "react";
import { Text, Card, Badge } from "@/components/retroui";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Footer from "@/components/footer";

export default function CheckoutSuccessPage() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Refresh user data to get updated isPro status
    checkAuth();
  }, [checkAuth]);

  return (
    <main>
      <section className="container max-w-3xl mx-auto px-4 py-16 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-[#10B981]" />
            <Badge className="relative bg-white border-2 border-black p-4">
              <CheckCircle2 className="w-16 h-16 text-[#10B981]" />
            </Badge>
          </div>
        </div>

        <Text as="h1" className="text-4xl lg:text-5xl font-bold mb-4 uppercase">
          Payment Successful!
        </Text>

        <Text className="text-muted-foreground mb-8 max-w-xl">
          Thank you for your purchase! Your account has been upgraded.
        </Text>

        <Card className="w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <Card.Content className="p-8">
            <Text as="h3" className="text-xl font-bold mb-4 uppercase">
              Next Steps
            </Text>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <Text className="text-sm">
                  Check your email for a confirmation receipt
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <Text className="text-sm">
                  Access all premium components and templates
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <Text className="text-sm">
                  Download the Figma design kit from your account
                </Text>
              </div>
            </div>
          </Card.Content>
        </Card>

        <div className="flex gap-4">
          <Link href="/blocks">
            <div className="relative inline-block group">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black transition-all duration-200" />
              <button className="px-6 py-3 font-bold border-2 border-black relative bg-primary transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                Browse Components
              </button>
            </div>
          </Link>
          <Link href="/account">
            <div className="relative inline-block group">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black transition-all duration-200" />
              <button className="px-6 py-3 font-bold border-2 border-black relative bg-white transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                View Account
              </button>
            </div>
          </Link>
        </div>

        <Text className="text-xs text-muted-foreground mt-8">
          Need help? Contact us at{" "}
          <a href="mailto:arif@retroui.dev" className="underline font-bold">
            arif@retroui.dev
          </a>
        </Text>
      </section>

      <Footer />
    </main>
  );
}
