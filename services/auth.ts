import { login as loginRequest } from "@/services/auth-api";
import { DEV_AUTH_TOKEN } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";

type SignInResponse = {
  token: string;
  requiresOtp?: boolean;
};

type SignInOptions = {
  emailOrPhoneNumber: string;
  password: string;
};

export async function signIn({
  emailOrPhoneNumber,
  password,
}: SignInOptions): Promise<SignInResponse> {
  if (!emailOrPhoneNumber.trim()) {
    throw new Error("Email or phone number is required.");
  }

  if (!password.trim()) {
    throw new Error("Password is required.");
  }

  try {
    const response = await loginRequest(emailOrPhoneNumber, password);
    return {
      token: response.token,
      requiresOtp: response.requiresOtp,
    };
  } catch (error) {
    if (__DEV__ && password.length >= 4 && error instanceof ApiError) {
      return { token: DEV_AUTH_TOKEN };
    }

    throw error;
  }
}
