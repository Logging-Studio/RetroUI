import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";

import { Checkbox } from "@/components/retroui/Checkbox";
import { Input } from "@/components/retroui/Input";
import { Field } from "@/components/retroui/Field";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useState } from "react";

export default function SignInBlock() {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded border-2 bg-card">
        <div className="bg-accent p-6">
          <Text as="h3" className="text-accent-foreground">Sign In</Text>
          <Text className="text-sm text-accent-foreground">
            Welcome back! Enter your details to access your account.
          </Text>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <Field className="space-y-2">
              <Field.Label htmlFor="email">Email</Field.Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </Field>
            <Field className="space-y-2">
              <div className="flex items-center justify-between">
                <Field.Label htmlFor="password">Password</Field.Label>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </Field>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <Button className="w-full justify-center">Sign In</Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                className="flex items-center justify-center"
              >
                <Github className="mr-2 h-5 w-5" />
                Github
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Google
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-bold underline underline-offset-4"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
  );
}