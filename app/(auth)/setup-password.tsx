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
import { setupPassword } from "@/services/auth-api";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function SetupPasswordScreen() {
  const userId = useAuthFlowStore((state) => state.userId);
  const resetFlow = useAuthFlowStore((state) => state.reset);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const canSave =
    isValidPassword(password) && passwordsMatch(password, confirmPassword);

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Session expired", "Please restart account creation.");
      router.replace("/sign-up");
      return;
    }

    setLoading(true);

    try {
      await setupPassword({ userId, password });
      setShowSuccess(true);
    } catch (error) {
      Alert.alert(
        "Unable to save password",
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
          title="Set-up your password"
          subtitle="Set up your password to safeguard your account against unauthorised access"
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
        actionLabel="Proceed to Home"
        onActionPress={() => {
          setShowSuccess(false);
          resetFlow();
          router.replace("/sign-in");
        }}
      >
        <SuccessIllustration
          label="Password set-up successfully"
          description="Your password has been successfully set up."
        />
      </AuthBottomSheet>
    </>
  );
}
