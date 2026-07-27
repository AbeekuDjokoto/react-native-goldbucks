import { useAuthHydration } from "@/hooks/use-auth-hydration";
import { useAuthStore } from "@/store/auth-store";
import { useRouter, useSegments, type Href } from "expo-router";
import { useEffect } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const hydrated = useAuthHydration();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setRedirect = useAuthStore((state) => state.setRedirect);
  const redirect = useAuthStore((state) => state.redirect);

  useEffect(() => {
    if (!hydrated) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      const path = segments.filter(Boolean).join("/");
      if (path) {
        setRedirect(`/${path}`);
      }
      router.replace("/sign-in");
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace((redirect ?? "/(tabs)") as Href);
      if (redirect) {
        setRedirect(undefined);
      }
    }
  }, [hydrated, isAuthenticated, redirect, router, segments, setRedirect]);
}
