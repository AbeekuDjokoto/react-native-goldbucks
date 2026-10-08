export const AUTH_USER = {
  name: "Monica Geller",
  email: "monicageller@email.com",
  maskedEmail: "****eller@email.com",
  phone: "+234 801 234 5678",
} as const;

/** Dev-only JWT for local sign-in until the API is wired. */
export const DEV_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJtb25pY2FnZWxsZXJAZW1haWwuY29tIiwibmFtZSI6Ik1vbmljYSBHZWxsZXIifQ.dev";

export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 118;

export const PASSWORD_REQUIREMENTS =
  "Password should have a minimum of 8 characters, one UPPERCASE letter and one special character {!#%&*!}";
