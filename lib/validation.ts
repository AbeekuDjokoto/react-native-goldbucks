import { PASSWORD_REQUIREMENTS } from "@/constants/auth";

const PASSWORD_PATTERN =
  /^(?=.*[A-Z])(?=.*[!#%&*!])[A-Za-z\d!#%&*!]{8,}$/;

export function isValidPassword(password: string): boolean {
  return PASSWORD_PATTERN.test(password);
}

export function getPasswordValidationMessage(password: string): string | null {
  if (!password) return null;
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include one uppercase letter.";
  }
  if (!/[!#%&*!]/.test(password)) {
    return "Password must include one special character from {!#%&*!}.";
  }
  return null;
}

export function parseOtpCode(otp: string): number {
  const code = Number(otp.trim());
  if (!Number.isInteger(code)) {
    throw new Error("Invalid OTP code.");
  }
  return code;
}

export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password.length > 0 && password === confirmPassword;
}

export { PASSWORD_REQUIREMENTS };
