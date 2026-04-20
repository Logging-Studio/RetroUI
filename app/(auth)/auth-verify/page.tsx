"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Text } from "@/components/retroui";
import { verifyTokenAction } from "@/app/actions/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      // Prevent double-call in React Strict Mode
      if (hasVerified.current) return;
      hasVerified.current = true;

      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token provided");
        return;
      }

      try {
        const result = await verifyTokenAction(token);

        if (result.success && result.token) {
          // Store token in localStorage for client-side access
          localStorage.setItem("auth_token", result.token);

          // Fetch user data
          await checkAuth();

          setStatus("success");

          // Get redirect URL or default to /blocks
          const redirect = searchParams.get("redirect") || "/blocks";

          // Redirect after a short delay
          setTimeout(() => {
            router.push(redirect);
          }, 1500);
        } else {
          setStatus("error");
          setErrorMessage(result.error || "Failed to verify magic link");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "An error occurred");
      }
    };

    verifyToken();
  }, [searchParams, router, checkAuth]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-12">
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

        {status === "verifying" && (
          <div>
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <Text as="h1" className="text-2xl lg:text-3xl mb-4">
              Verifying your magic link...
            </Text>
            <p className="text-base text-muted-foreground">
              Please wait while we verify your authentication.
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="w-16 h-16 border-4 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <Text as="h1" className="text-2xl lg:text-3xl mb-4 text-green-600">
              Success!
            </Text>
            <p className="text-base text-muted-foreground">
              Redirecting you to your dashboard...
            </p>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="w-16 h-16 border-4 border-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <Text as="h1" className="text-2xl lg:text-3xl mb-4 text-red-600">
              Verification Failed
            </Text>
            <p className="text-base text-muted-foreground mb-8">
              {errorMessage || "Invalid or expired magic link. Please try signing in again."}
            </p>

            <div className="relative inline-block">
              <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black" />
              <Link
                href="/sign-in"
                className="inline-block px-6 py-3 font-bold text-white border-2 border-black relative bg-[#10B981] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
