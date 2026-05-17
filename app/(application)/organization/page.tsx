"use client";

import { Card, Text, Button } from "@/components/retroui";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";

export default function OrganizationPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center px-4">
        <Card className="w-full max-w-md bg-white">
          <div className="p-6 text-center">
            <Text className="mb-4">Please sign in to view organization settings</Text>
            <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!user.isOrg) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center px-4">
        <Card className="w-full max-w-md bg-white">
          <div className="p-6 text-center">
            <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <Text as="h2" className="text-2xl mb-2">
              Organization Access Required
            </Text>
            <Text className="text-muted-foreground mb-6">
              This feature is only available for organization accounts.
            </Text>
            <Button onClick={() => router.push("/account")}>
              Back to Account
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center px-4 mt-10">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <Text as="h2" className="text-3xl">
            Organization Settings
          </Text>
          <Text className="text-muted-foreground font-medium mt-1">
            Manage your organization's preferences and team members
          </Text>
        </div>

        <Card className="w-full bg-white">
          <div className="p-6 text-center">
            <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <Text as="h3" className="text-xl mb-2">
              Organization Settings Coming Soon
            </Text>
            <Text className="text-muted-foreground mb-6">
              Organization management features are currently in development.
            </Text>
            <Button onClick={() => router.push("/account")}>
              Back to Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
