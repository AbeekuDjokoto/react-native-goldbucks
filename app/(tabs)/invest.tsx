import { styled } from "nativewind";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

const Invest = () => {
  return (
    <SafeAreaView className="bg-page flex-1 items-center justify-center gap-x-small px-screen">
      <Text>Invest</Text>
    </SafeAreaView>
  );
};

export default Invest;
