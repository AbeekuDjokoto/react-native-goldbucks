import "@/global.css";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="bg-brand-primary-500 flex-1 items-center justify-center gap-x-small px-screen">
      <Text className="text-2xl font-bold text-brand-primary">GoldBucks</Text>
      <Text className="text-center text-sm  text-neutral-500">
        Design tokens loaded from Figma
      </Text>
    </SafeAreaView>
  );
}
