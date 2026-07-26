import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
