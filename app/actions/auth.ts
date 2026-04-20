"use server";

import { authApi } from "@/lib/api-client";
import { setAuthCookie, clearAuthCookie, getAuthToken } from "@/lib/auth";
import type { SignInResponse, VerifyResponse, ProfileUpdateData } from "@/types/auth";

export async function signInAction(email: string): Promise<SignInResponse> {
  try {
    const result = await authApi.signIn(email);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign in",
    };
  }
}

export async function verifyTokenAction(token: string): Promise<VerifyResponse> {
  try {
    const result = await authApi.verify(token);

    console.log("Verify token result:", result);
    if (result.success && result.token) {
      // Set httpOnly cookie
      await setAuthCookie(result.token);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to verify token",
    };
  }
}

export async function logoutAction(): Promise<{ success: boolean }> {
  try {
    await clearAuthCookie();
    return { success: true };
  } catch (error) {
    console.error("Failed to logout:", error);
    return { success: false };
  }
}

export async function updateProfileAction(data: ProfileUpdateData) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const result = await authApi.updateProfile(token, data);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
