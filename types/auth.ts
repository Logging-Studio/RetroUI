export interface User {
  email: string;
  isPro: boolean | null;
  isOrg: boolean | null;
  name: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface SignInResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface VerifyResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  newEmail?: string;
}
