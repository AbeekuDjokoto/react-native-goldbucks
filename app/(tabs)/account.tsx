import { Button } from "@/components/auth";
import { useAuthStore } from "@/store/auth-store";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

export default function AccountScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView className="flex-1 bg-page px-screen">
      <View className="flex-1 justify-center gap-y-large">
        <View className="items-center gap-y-x-small">
          <Text className="font-satoshi-bold text-xl text-neutral-900">
            Account
          </Text>
          {user?.email ? (
            <Text className="font-satoshi text-sm text-neutral-500">
              {user.email}
            </Text>
          ) : null}
        </View>

        <Button label="Log out" variant="secondary" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
