import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const InterestDetail = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>InterestDetail {id}</Text>
    </View>
  );
};

export default InterestDetail;
