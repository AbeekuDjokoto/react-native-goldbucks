import { apiPatch, apiPost, unwrapApiData } from "@/lib/api-client";
import { encryptData } from "@/lib/encrypt";
import { getDeviceId } from "@/lib/device";
import { parseOtpCode } from "@/lib/validation";
import type {
  ApiMessageResponse,
  CreateAccountByEmailPayload,
  CreateAccountByPhonePayload,
  LoginResponse,
  ResetPasswordPayload,
  SendEmailOtpPayload,
  SendPhoneOtpPayload,
  SetupPasswordPayload,
  VerifyEmailOtpPayload,
  VerifyLoginOtpPayload,
  VerifyLoginOtpResponse,
  VerifyPhoneOtpPayload,
  VerifyRegisterOtpPayload,
  VerifyRegisterOtpResponse,
} from "@/types/auth";

export async function createAccountByEmail(payload: CreateAccountByEmailPayload) {
  return apiPost<ApiMessageResponse>("user/create-by-email", payload);
}

export async function createAccountByPhone(payload: CreateAccountByPhonePayload) {
  return apiPost<ApiMessageResponse>("user/create-by-phone", payload);
}

export async function sendRegisterEmailOtp(email: string) {
  return apiPost<ApiMessageResponse>("/user/send-register-email-otp", { email });
}

export async function sendRegisterPhoneOtp(phoneNumber: string) {
  return apiPost<ApiMessageResponse>("/user/send-register-phone-otp", {
    phoneNumber,
  });
}

export async function verifyRegisterOtp(payload: VerifyRegisterOtpPayload) {
  const response = await apiPost<VerifyRegisterOtpResponse>(
    "user/verify-register-otp",
    payload,
  );
  return unwrapApiData<VerifyRegisterOtpResponse>(response);
}

export async function setupPassword(payload: SetupPasswordPayload) {
  return apiPatch<ApiMessageResponse>("user/setup-password", payload);
}

export async function login(emailOrPhoneNumber: string, password: string) {
  const deviceId = await getDeviceId();
  const credentials = await encryptData({
    emailOrPhoneNumber,
    password,
    deviceId,
  });

  const response = await apiPost<LoginResponse>("user/login", { credentials });
  return unwrapApiData<LoginResponse>(response);
}

export async function sendEmailOtp(payload: SendEmailOtpPayload) {
  return apiPost<ApiMessageResponse>("user/send-email-otp", payload);
}

export async function sendPhoneOtp(payload: SendPhoneOtpPayload) {
  return apiPost<ApiMessageResponse>("user/send-phonenumber-otp", payload);
}

export async function verifyEmailLoginOtp(payload: VerifyLoginOtpPayload) {
  const response = await apiPost<VerifyLoginOtpResponse>(
    "user/verify-email-or-phone-login-otp",
    payload,
  );
  return unwrapApiData<VerifyLoginOtpResponse>(response);
}

export async function verifyForgotPasswordEmailOtp(
  payload: VerifyEmailOtpPayload,
) {
  return apiPost<ApiMessageResponse>("/user/verify-email-otp", payload);
}

export async function verifyForgotPasswordPhoneOtp(
  payload: VerifyPhoneOtpPayload,
) {
  return apiPost<ApiMessageResponse>("/user/verify-phonenumber-otp", payload);
}

export async function resetPassword(payload: ResetPasswordPayload) {
  return apiPatch<ApiMessageResponse>("user/reset-password", payload);
}

export async function resendRegisterOtp(
  channel: "email" | "phone",
  emailOrPhone: string,
) {
  if (channel === "email") {
    return sendRegisterEmailOtp(emailOrPhone);
  }

  return sendRegisterPhoneOtp(emailOrPhone);
}

export async function resendFlowOtp(
  channel: "email" | "phone",
  emailOrPhone: string,
  purpose: "login" | "forgot_password",
) {
  if (channel === "email") {
    return sendEmailOtp({
      email: emailOrPhone,
      purpose: purpose === "login" ? "login " : purpose,
    });
  }

  return sendPhoneOtp({
    phoneNumber: emailOrPhone,
    purpose: purpose === "login" ? "login " : purpose,
  });
}

export async function verifyFlowOtp(options: {
  flow: "register" | "forgot_password" | "login";
  channel: "email" | "phone";
  emailOrPhone: string;
  otp: string;
}) {
  const { flow, channel, emailOrPhone, otp } = options;
  const otpCode = parseOtpCode(otp);

  if (flow === "register") {
    return verifyRegisterOtp({ emailOrPhone, otp: otpCode });
  }

  if (flow === "forgot_password") {
    if (channel === "email") {
      return verifyForgotPasswordEmailOtp({
        email: emailOrPhone,
        otp: otpCode,
        purpose: "forgot_password",
      });
    }

    return verifyForgotPasswordPhoneOtp({
      phoneNumber: emailOrPhone,
      otp: otpCode,
      purpose: "forgot_password",
    });
  }

  const deviceId = await getDeviceId();
  return verifyEmailLoginOtp({
    emailOrPhone,
    otp: otpCode,
    purpose: "login",
    deviceId,
  });
}
