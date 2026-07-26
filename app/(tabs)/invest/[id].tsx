import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const InvestDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>InvestDetail {id}</Text>
    </View>
  );
};

export default InvestDetail;
