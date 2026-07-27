import type { AuthChannel, AuthFlowPurpose } from "@/types/auth";
import { create, type StateCreator } from "zustand";

type AuthFlowState = {
  channel: AuthChannel;
  purpose: AuthFlowPurpose;
  emailOrPhone: string;
  referralCode?: string;
  userId?: string;
};

type AuthFlowActions = {
  setRegisterFlow: (details: {
    channel: AuthChannel;
    emailOrPhone: string;
    referralCode?: string;
  }) => void;
  setForgotPasswordFlow: (details: {
    channel: AuthChannel;
    emailOrPhone: string;
  }) => void;
  setLoginOtpFlow: (details: {
    channel: AuthChannel;
    emailOrPhone: string;
  }) => void;
  setUserId: (userId: string) => void;
  reset: () => void;
};

const initialState: AuthFlowState = {
  channel: "email",
  purpose: "register",
  emailOrPhone: "",
};

const authFlowStore: StateCreator<AuthFlowState & AuthFlowActions> = (set) => ({
  ...initialState,
  setRegisterFlow: ({ channel, emailOrPhone, referralCode }) =>
    set({
      channel,
      purpose: "register",
      emailOrPhone,
      referralCode,
      userId: undefined,
    }),
  setForgotPasswordFlow: ({ channel, emailOrPhone }) =>
    set({
      channel,
      purpose: "forgot_password",
      emailOrPhone,
      referralCode: undefined,
      userId: undefined,
    }),
  setLoginOtpFlow: ({ channel, emailOrPhone }) =>
    set({
      channel,
      purpose: "login",
      emailOrPhone,
      referralCode: undefined,
      userId: undefined,
    }),
  setUserId: (userId) => set({ userId }),
  reset: () => set(initialState),
});

export const useAuthFlowStore = create(authFlowStore);
