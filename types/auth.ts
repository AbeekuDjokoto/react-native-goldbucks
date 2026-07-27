export type AuthChannel = "email" | "phone";

export type AuthFlowPurpose = "register" | "forgot_password" | "login";

export type OtpPurpose = "login" | "forgot_password";

export type ApiMessageResponse = {
  message?: string;
  success?: boolean;
};

export type CreateAccountByEmailPayload = {
  email: string;
  referralCode?: string;
};

export type CreateAccountByPhonePayload = {
  phoneNumber: string;
  referralCode?: string;
};

export type SendEmailOtpPayload = {
  email: string;
  purpose: OtpPurpose | "login ";
};

export type SendPhoneOtpPayload = {
  phoneNumber: string;
  purpose: OtpPurpose | "login ";
};

export type VerifyRegisterOtpPayload = {
  emailOrPhone: string;
  otp: number;
};

export type VerifyRegisterOtpResponse = {
  id: string;
  email?: string;
  phoneNumber?: string | null;
  referralCode?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type VerifyEmailOtpPayload = {
  email: string;
  otp: number;
  purpose: "forgot_password";
};

export type VerifyPhoneOtpPayload = {
  phoneNumber: string;
  otp: number;
  purpose: "forgot_password";
};

export type VerifyLoginOtpPayload = {
  emailOrPhone: string;
  otp: number;
  purpose: OtpPurpose;
  deviceId: string;
};

export type VerifyLoginOtpResponse = {
  token: string;
  message?: string;
};

export type SetupPasswordPayload = {
  userId: string;
  password: string;
};

export type ResetPasswordPayload = {
  emailOrPhoneNumber: string;
  password: string;
};

export type LoginPayload = {
  credentials: string;
};

export type LoginResponse = {
  token: string;
  requiresOtp?: boolean;
  message?: string;
};
