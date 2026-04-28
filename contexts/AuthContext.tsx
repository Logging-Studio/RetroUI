"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api-client";
import { logoutAction } from "@/app/actions/auth";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage for token on mount
    const checkInitialAuth = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("auth_token");

      // If we have an initialUser from server, we're already authenticated
      if (initialUser) {
        if (token) {
          // Token exists, user is set from server
          return;
        }
      }

      // If we have a token but no initial user, fetch user data
      if (token && !initialUser) {
        await checkAuth();
      }
    };

    checkInitialAuth();
  }, [initialUser]);

  const checkAuth = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("auth_token");

    if (!token) {
      setUser(null);
      setError("No authentication token");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userData = await authApi.getMe(token);

      if (userData) {
        setUser(userData);
        setError(null);
      } else {
        setUser(null);
        setError("Failed to fetch user data");
        // Clear invalid token
        localStorage.removeItem("auth_token");
      }
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : "Authentication failed");
      // Clear invalid token
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      // Clear server-side cookie
      await logoutAction();

      // Clear client-side state
      setUser(null);
      setError(null);

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }

      // Redirect to home
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    checkAuth,
    logout,
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
