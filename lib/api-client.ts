import type { User, SignInResponse, VerifyResponse, ProfileUpdateData } from "@/types/auth";
import type { CheckoutSessionResponse } from "@/types/pricing";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8787";

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async signIn(email: string): Promise<SignInResponse> {
    try {
      await this.request("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      return {
        success: true,
        message: "Magic link sent! Check your email.",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send magic link",
      };
    }
  }

  async verify(token: string): Promise<VerifyResponse> {
    try {
      const data = await this.request<{ token: string; user: User }>("/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify token",
      };
    }
  }

  async getMe(token: string): Promise<User | null> {
    try {
      const user = await this.request<User>("/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  }

  async updateProfile(token: string, data: ProfileUpdateData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const user = await this.request<User>("/auth/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update profile",
      };
    }
  }

  async createCheckoutSession(priceId: string, endorselyReferral?: string): Promise<CheckoutSessionResponse> {
    try {
      const data = await this.request<{ sessionUrl: string }>("/checkout/create-stripe-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          priceId,
          promoCode: "",
          endorsely_referral: endorselyReferral ?? "",
        }),
      });

      return { sessionUrl: data.sessionUrl };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to create checkout session",
      };
    }
  }

  async downloadTemplate(slug: string, token: string): Promise<{ downloadUrl?: string; error?: string }> {
    try {
      const data = await this.request<{ downloadUrl: string }>(`/products/download/${slug}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { downloadUrl: data.downloadUrl };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to get download link",
      };
    }
  }
}

export const authApi = new APIClient(API_BASE_URL);
