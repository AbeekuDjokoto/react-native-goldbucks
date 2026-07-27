import {
  AuthBottomSheet,
  AuthHeader,
  AuthScreenLayout,
  Button,
  PasswordHint,
  SuccessIllustration,
  TextField,
} from "@/components/auth";
import { PASSWORD_REQUIREMENTS } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";
import { isValidPassword, passwordsMatch } from "@/lib/validation";
import { resetPassword } from "@/services/auth-api";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function ResetPasswordScreen() {
  const emailOrPhone = useAuthFlowStore((state) => state.emailOrPhone);
  const resetFlow = useAuthFlowStore((state) => state.reset);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const canSave =
    isValidPassword(password) && passwordsMatch(password, confirmPassword);

  const handleSave = async () => {
    if (!emailOrPhone) {
      Alert.alert("Session expired", "Please restart password recovery.");
      router.replace("/forgot-password");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        emailOrPhoneNumber: emailOrPhone,
        password,
      });
      setShowSuccess(true);
    } catch (error) {
      Alert.alert(
        "Unable to reset password",
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthScreenLayout
        footer={
          <Button
            label="Save password"
            variant={canSave ? "primary" : "soft"}
            disabled={!canSave || loading}
            loading={loading}
            onPress={handleSave}
          />
        }
      >
        <AuthHeader
          title="Reset your password"
          subtitle="Enter your new password"
        />

        <TextField
          label="Password"
          icon="lock"
          secureToggle
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
        />

        <PasswordHint text={PASSWORD_REQUIREMENTS} />

        <TextField
          label="Confirm password"
          icon="lock"
          secureToggle
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
        />
      </AuthScreenLayout>

      <AuthBottomSheet
        visible={showSuccess}
        actionLabel="Log in to your account"
        onActionPress={() => {
          setShowSuccess(false);
          resetFlow();
          router.replace("/sign-in");
        }}
      >
        <SuccessIllustration
          label="Password reset successfully"
          description="You have successfully reset your password"
        />
      </AuthBottomSheet>
    </>
  );
}
