"use client";

import { useState } from "react";
import { Text } from "@/components/retroui";
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
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <Text className="text-2xl font-bold">RetroUI</Text>
        </div>

        {/* Heading */}
        <Text as="h1" className="text-2xl lg:text-3xl">
          Welcome Back!
        </Text>

        <p className="text-base text-muted-foreground mb-8">
          Sign in to your account to access your premium templates and
          dashboard.
        </p>

        {/* Sign-in Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success Message */}
          {success && (
            <div className="p-4 border-2 border-black bg-green-100 relative">
              <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
              <p className="font-bold text-green-800 relative">
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
            <div className="relative inline-block w-full">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border-2 border-black relative bg-white text-base focus:outline-none focus:ring-0"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative inline-block w-full">
            <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black transition-all duration-200" />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 font-bold text-white border-2 border-black transition-all duration-200 relative bg-[#10B981] shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
            >
              {isLoading ? "Sending magic link..." : "Sign in to Dashboard"}
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            You'll receive an email with a sign-in link
          </p>
        </form>

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
