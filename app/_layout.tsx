import "@/global.css";
import { AuthGate } from "@/components/auth/AuthGate";
import { useAuthHydration } from "@/hooks/use-auth-hydration";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrated = useAuthHydration();
  const [fontsLoaded, fontError] = useFonts({
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
    "Satoshi-LightItalic": require("@/assets/fonts/Satoshi-LightItalic.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Italic": require("@/assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Medium": require("@/assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-MediumItalic": require("@/assets/fonts/Satoshi-MediumItalic.otf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-BoldItalic": require("@/assets/fonts/Satoshi-BoldItalic.otf"),
    "Satoshi-Black": require("@/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-BlackItalic": require("@/assets/fonts/Satoshi-BlackItalic.otf"),
  });

  useEffect(() => {
    if ((fontsLoaded || fontError) && hydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, hydrated]);

  if ((!fontsLoaded && !fontError) || !hydrated) return null;

  return <AuthGate />;
}
