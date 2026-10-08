import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Stack } from "expo-router";

export function AuthGate() {
  useAuthGuard();

  return <Stack screenOptions={{ headerShown: false }} />;
}
