import React from "react";
import { Text } from "./Text";
import { Input } from "./Input";
import { Button } from "./Button";
import Link from "next/link";

export function Login() {
  return (
    <div className="max-w-80 p-4  border-2 border-black shadow-md space-y-3">
      <div className="text-center">
        <Text as="h2">Login</Text>
      </div>
      <form className="flex flex-col gap-5 ">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="email" className="w-11/12">
            Email
          </label>
          <Input id="email" type="email" placeholder="email" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="password" className="w-11/12">
            Password
          </label>
          <Input id="password" type="password" placeholder="password" />
        </div>
        <div className="flex flex-col items-center justify-center py-4 gap-1">
          <Button className="rounded-full active:shadow-none active:scale-95">
            Submit
          </Button>
          <div className="px-4 py-2 space-x-1">
            <span>Don&apos;t have an account?</span>
            <Link href="/" className="text-primary-700 hover:underline">
              sign-in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
