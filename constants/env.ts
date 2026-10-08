const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  process.env.VITE_API_BASE_URL ??
  "https://demo-alertsavings-api.enyata.com";

const ALERT_ENCRYPTION_KEY =
  process.env.EXPO_PUBLIC_ALERT_ENCRYPTION_KEY ??
  process.env.VITE_ALERT_ENCRYPTION_KEY ??
  "0123456789abcdef0123456789abcdef";

export const ENV = {
  API_BASE_URL,
  API_V1_URL: `${API_BASE_URL.replace(/\/$/, "")}/api/v1`,
  ALERT_ENCRYPTION_KEY,
} as const;
