import { ENV } from "@/constants/env";
import { useAuthStore } from "@/store/auth-store";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export class ApiError extends Error {
  status: number;
  type?: string;

  constructor(message: string, status: number, type?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.type = type;
  }
}

type ApiEnvelope<T = unknown> = {
  status?: string;
  message?: string;
  type?: string;
  token?: string;
  data?: T;
};

const CANCELLED_STATUS_CODE = 499;

function errorHandler(error: AxiosError<ApiEnvelope>) {
  let status = error.response?.status;
  status = error.code === "ERR_CANCELED" ? CANCELLED_STATUS_CODE : status;

  const payload = error.response?.data;

  throw new ApiError(
    payload?.message ??
      error.message ??
      "Sorry, an unexpected error occurred.",
    status ?? 0,
    payload?.type,
  );
}

function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  instance.interceptors.response.use((response) => {
    const setToken = useAuthStore.getState().setToken;
    const data = response.data;

    if (data?.token) {
      setToken(data.token);
    }

    if (data?.status === "error") {
      throw new ApiError(
        data.message ?? "Something went wrong. Please try again.",
        response.status,
        data.type,
      );
    }

    return data;
  }, errorHandler);
}

export const axiosClient = axios.create({
  baseURL: ENV.API_V1_URL,
});

export const axiosClientV2 = axios.create({
  baseURL: `${ENV.API_BASE_URL.replace(/\/$/, "")}/api/v2`,
});

attachInterceptors(axiosClient);
attachInterceptors(axiosClientV2);

/** Reads nested `data` from API envelopes like `{ status, message, data }`. */
export function unwrapApiData<T>(response: ApiEnvelope<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    (response as ApiEnvelope<T>).data !== undefined
  ) {
    return (response as ApiEnvelope<T>).data as T;
  }

  return response as T;
}

export function getApiMessage(response: ApiEnvelope | undefined): string | undefined {
  return response?.message;
}

export async function apiPost<T>(url: string, body?: unknown): Promise<ApiEnvelope<T> | T> {
  return (await axiosClient.post(url, body)) as ApiEnvelope<T> | T;
}

export async function apiPatch<T>(url: string, body?: unknown): Promise<ApiEnvelope<T> | T> {
  return (await axiosClient.patch(url, body)) as ApiEnvelope<T> | T;
}
