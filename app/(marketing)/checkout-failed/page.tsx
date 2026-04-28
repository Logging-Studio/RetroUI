"use client";

import { Text, Card, Badge } from "@/components/base-retroui";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

export default function CheckoutFailedPage() {
  return (
    <main>
      <section className="container max-w-3xl mx-auto px-4 py-16 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute -bottom-2 -right-2 left-2 top-2 border-2 border-black bg-red-600" />
            <Badge className="relative bg-white border-2 border-black p-4">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </Badge>
          </div>
        </div>

        <Text as="h1" className="text-4xl lg:text-5xl font-bold mb-4 uppercase">
          Payment Failed
        </Text>

        <Text className="text-muted-foreground mb-8 max-w-xl">
          We couldn't process your payment. This can happen for several reasons:
        </Text>

        <Card className="w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <Card.Content className="p-8">
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="text-primary">→</span>
                <Text className="text-sm">
                  Your card was declined by your bank
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">→</span>
                <Text className="text-sm">
                  Insufficient funds in your account
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">→</span>
                <Text className="text-sm">
                  Incorrect card details were entered
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">→</span>
                <Text className="text-sm">
                  Payment was cancelled before completion
                </Text>
              </div>
            </div>
          </Card.Content>
        </Card>

        <div className="flex gap-4">
          <Link href="/pricing">
            <div className="relative inline-block group">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black transition-all duration-200" />
              <button className="px-6 py-3 font-bold border-2 border-black relative bg-primary transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                Try Again
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
