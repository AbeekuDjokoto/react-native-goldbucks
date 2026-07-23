import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SavingsDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>SavingsDetail {id}</Text>
    </View>
  );
};

export default SavingsDetail;
