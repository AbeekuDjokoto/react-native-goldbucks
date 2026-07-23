import "@/global.css";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-background flex-1 items-center justify-center gap-x-small px-screen">
      <Text className="text-2xl font-bold text-brand-primary">GoldBucks</Text>
      <Text className="text-center text-sm text-neutral-500">
        Design tokens loaded from Figma
      </Text>
    </View>
  );
}
