"use client";

import { useState } from "react";
import { Button, Input, Text } from "@/components/retroui";
import Link from "next/link";
import Image from "next/image";
import { signInAction } from "@/app/actions/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const result = await signInAction(email);

    if (result.success) {
      setSuccess(true);
      setEmail("");
    } else {
      setError(result.error || "Failed to send magic link");
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8">
            <Image src="/images/logo.png" alt="RetroUI" width={32} height={32} />
          </div>
          <Text className="text-2xl font-bold">RetroUI</Text>
        </div>

        {/* Heading */}
        <div className="bg-card border-2 p-6">
          <Text as="h1" className="text-2xl lg:text-3xl mb-2">
            Welcome Back!
          </Text>

          <p className="text-base text-muted-foreground mb-8">
            Sign in to your account to access all the pro features
          </p>

          {/* Sign-in Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="p-4 border-2 border-black relative">
                <p className="font-medium">
                  Check your email for the magic link!
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 border-2 border-black bg-red-100 relative">
                <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                <p className="font-bold text-red-800 relative">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending magic link..." : "Sign In"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              You'll receive an email with a sign-in link
            </p>
          </form>
        </div>

        {/* Sign-up Link */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              href="/pricing"
              className="font-bold underline hover:no-underline"
            >
              Purchase Now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
