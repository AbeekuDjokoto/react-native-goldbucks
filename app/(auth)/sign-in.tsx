import {
  AuthHeader,
  AuthLink,
  AuthScreenLayout,
  Button,
  TextField,
} from "@/components/auth";
import { AUTH_USER } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";
import { signIn } from "@/services/auth";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { useAuthStore } from "@/store/auth-store";
import { spacing } from "@/theme/tokens";
import { Link, router, type Href } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

export default function SignInScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authenticate = useAuthStore((state) => state.authenticate);
  const redirect = useAuthStore((state) => state.redirect);
  const setRedirect = useAuthStore((state) => state.setRedirect);
  const setLoginOtpFlow = useAuthFlowStore((state) => state.setLoginOtpFlow);

  const canSubmit = emailOrPhone.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async () => {
    const identifier = emailOrPhone.trim();
    const channel = identifier.includes("@") ? "email" : "phone";

    setLoading(true);

    try {
      const response = await signIn({
        emailOrPhoneNumber: identifier,
        password,
      });

      if (response.requiresOtp) {
        setLoginOtpFlow({
          channel,
          emailOrPhone: identifier,
        });
        router.push({
          pathname: "/verify-otp",
          params: { flow: "login", channel },
        });
        return;
      }

      const nextRoute = redirect ?? "/(tabs)";
      setRedirect(undefined);
      authenticate({ token: response.token });
      router.replace(nextRoute as Href);
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout
      footer={
        <Button
          label="Log in"
          variant={canSubmit ? "primary" : "soft"}
          loading={loading}
          disabled={!canSubmit || loading}
          onPress={handleLogin}
        />
      }
    >
      <AuthHeader
        showBack={false}
        title="Welcome back 👋"
        subtitle="Enter your log in details to access your account"
      />

      <TextField
        label="Email address/Phone number"
        icon="mail"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={AUTH_USER.email}
      />

      <TextField
        label="Password"
        icon="lock"
        secureToggle
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
      />

      <AuthLink
        label="Forgot password?"
        align="right"
        onPress={() => router.push("/forgot-password")}
        style={styles.forgotLink}
      />

      <Text style={styles.signUpText}>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" style={styles.signUpLink}>
          Get started
        </Link>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  forgotLink: {
    marginTop: -spacing.small,
  },
  signUpText: {
    marginTop: spacing.large,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: "#807F94",
    textAlign: "center",
  },
  signUpLink: {
    fontFamily: "Satoshi-Medium",
    color: "#C4862D",
    textDecorationLine: "underline",
  },
});
