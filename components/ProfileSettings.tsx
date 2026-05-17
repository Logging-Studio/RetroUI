"use client";

import { useState, useEffect } from "react";
import { Card, Button, Text } from "@/components/retroui";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfileAction } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProfileSettings() {
  const { user, isLoading, checkAuth, logout } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateProfileAction({
        name: formData.name,
        newEmail: user?.email !== formData.email ? formData.email : undefined,
      });

      if (result.success) {
        toast.success("Profile updated successfully");
        await checkAuth();
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="w-full bg-white">
        <div className="p-6 text-center">
          <Text className="mb-4">Please sign in to view your profile</Text>
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Form */}
      <Card className="w-full bg-white">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold">
                Name
              </label>
              <div className="relative inline-block w-full">
                <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-black relative bg-white text-base focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold">
                Email
              </label>
              <div className="relative inline-block w-full">
                <div className="absolute -bottom-1 -right-1 left-1 top-1 border-2 border-black bg-black" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email"
                  className="w-full px-4 py-3 border-2 border-black relative bg-white text-base focus:outline-none focus:ring-0"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This email is used for notifications and login.
              </p>
            </div>

            <div className="flex flex-row gap-4 pt-4">
              <div className="relative inline-block">
                <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black" />
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 font-bold text-white border-2 border-black relative bg-[#10B981] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Card>

      {/* Logout Section */}
      <Card className="w-full bg-white">
        <div className="p-6">
          <Text as="h3" className="text-xl mb-2">
            Sign Out
          </Text>
          <Text className="text-muted-foreground text-sm mb-4">
            Sign out of your account on this device.
          </Text>
          <div className="relative inline-block">
            <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 border-black bg-black" />
            <button
              onClick={handleLogout}
              className="px-6 py-3 font-bold text-white border-2 border-black relative bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Card>

      {/* Account Info */}
      <Card className="w-full bg-white">
        <div className="p-6">
          <Text as="h3" className="text-xl mb-4">
            Account Information
          </Text>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="font-bold">Plan:</span>
              <span className="px-2 py-0.5 bg-yellow-400 border border-black text-xs font-bold">
                {user.isPro ? "PRO" : "ESSENTIAL"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-bold">Account Type:</span>
              <span>{user.isOrg ? "Organization" : "Individual"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-bold">Email:</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
