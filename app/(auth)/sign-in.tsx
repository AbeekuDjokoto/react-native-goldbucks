import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>sign-in</Text>
      <Link href="/sign-up">Sign Up</Link>
    </View>
  );
};

export default SignIn;
