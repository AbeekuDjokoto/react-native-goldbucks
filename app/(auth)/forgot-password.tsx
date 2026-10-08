import {
  AuthHeader,
  AuthLink,
  AuthScreenLayout,
  Button,
  TextField,
} from "@/components/auth";
import { AUTH_USER } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";
import { sendEmailOtp, sendPhoneOtp } from "@/services/auth-api";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function ForgotPasswordScreen() {
  const [usePhone, setUsePhone] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const setForgotPasswordFlow = useAuthFlowStore(
    (state) => state.setForgotPasswordFlow,
  );

  const handleGetOtp = async () => {
    const emailOrPhone = value.trim();
    const channel = usePhone ? "phone" : "email";

    setLoading(true);

    try {
      if (usePhone) {
        await sendPhoneOtp({
          phoneNumber: emailOrPhone,
          purpose: "forgot_password",
        });
      } else {
        await sendEmailOtp({
          email: emailOrPhone,
          purpose: "forgot_password",
        });
      }

      setForgotPasswordFlow({ channel, emailOrPhone });
      router.push({
        pathname: "/verify-otp",
        params: { flow: "forgot_password", channel },
      });
    } catch (error) {
      Alert.alert(
        "Unable to send OTP",
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
          label="Get OTP"
          variant={value.trim() ? "primary" : "soft"}
          disabled={!value.trim() || loading}
          loading={loading}
          onPress={handleGetOtp}
        />
      }
    >
      <AuthHeader
        title="Forgot password"
        subtitle="Enter your registered email address or phone number to reset your password"
      />

      <TextField
        label={usePhone ? "Phone number" : "Email address"}
        icon={usePhone ? "phone" : "mail"}
        value={value}
        onChangeText={setValue}
        keyboardType={usePhone ? "phone-pad" : "email-address"}
        autoCapitalize="none"
        placeholder={usePhone ? AUTH_USER.phone : AUTH_USER.email}
      />

      <AuthLink
        label={usePhone ? "Use email address instead" : "Use phone number instead"}
        onPress={() => {
          setUsePhone((current) => !current);
          setValue("");
        }}
      />
    </AuthScreenLayout>
  );
}
