import { styled } from "nativewind";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

const Account = () => {
  return (
    <SafeAreaView className="bg-brand-primary-500 flex-1 items-center justify-center gap-x-small px-screen">
      <Text>Account</Text>
    </SafeAreaView>
  );
};

export default Account;
