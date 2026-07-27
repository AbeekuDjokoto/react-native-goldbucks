import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AdminUser, User } from "@/types";

type State = {
  token?: string | null;
  user?: User | AdminUser | null;
  isAuthenticated: boolean;
  redirect?: string;
  loginUrl: string;
  fcmToken?: string | null;
};

type Actions = {
  /** reset auth store to initial state */
  reset: () => void;
  /**
   * authenticate user
   * @param details - object containing token and optional login URL
   */
  authenticate: (details: { token: string; loginUrl?: string }) => void;
  setRedirect: (redirect?: string) => void;
  getToken: () => State["token"];
  setToken: (newToken: string) => void;
  logout: () => void;
  setUser: (newUser: User | AdminUser) => void;
  setFcmToken: (newFcmToken: string) => void;
};

const initialState: State = {
  token: null,
  isAuthenticated: false,
  user: null,
  loginUrl: "/sign-in",
};

const authStore: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,
  reset: () => set(initialState),
  authenticate: ({ token, loginUrl = "/(auth)/sign-in" }) => {
    const user: User = jwtDecode(token);
    set({
      user,
      token,
      isAuthenticated: true,
      loginUrl,
    });
  },
  logout: () => {
    set(initialState);
  },
  setRedirect: (redirect?: string) => set({ redirect }),
  getToken: () => get().token,
  setToken: (newToken: string) => set({ token: newToken }),
  setUser: (newUser: User | AdminUser) => set({ user: newUser }),
  setFcmToken: (newFcmToken: string) => set({ fcmToken: newFcmToken }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "goldbucks-mobile-auth-store",
    storage: createJSONStorage(() => AsyncStorage),
  }),
);

export { useAuthStore };
