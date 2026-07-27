import {
  AuthBottomSheet,
  AuthHeader,
  AuthScreenLayout,
  Button,
  OtpInput,
  OtpLoader,
  SuccessIllustration,
} from "@/components/auth";
import { OTP_LENGTH, OTP_RESEND_SECONDS } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";
import { maskEmail, maskPhone } from "@/lib/mask";
import {
  resendFlowOtp,
  resendRegisterOtp,
  verifyFlowOtp,
} from "@/services/auth-api";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { useAuthStore } from "@/store/auth-store";
import type { AuthFlowPurpose } from "@/types/auth";
import { colors, spacing } from "@/theme/tokens";
import { router, useLocalSearchParams, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

type VerifyOtpParams = {
  flow?: AuthFlowPurpose;
  channel?: "email" | "phone";
};

export default function VerifyOtpScreen() {
  const params = useLocalSearchParams<VerifyOtpParams>();
  const flow = useAuthFlowStore((state) => state.purpose);
  const channel = useAuthFlowStore((state) => state.channel);
  const emailOrPhone = useAuthFlowStore((state) => state.emailOrPhone);
  const setUserId = useAuthFlowStore((state) => state.setUserId);
  const authenticate = useAuthStore((state) => state.authenticate);

  const activeFlow = (params.flow as AuthFlowPurpose | undefined) ?? flow;
  const activeChannel = params.channel ?? channel;

  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);

  const maskedDestination = useMemo(() => {
    if (!emailOrPhone) return "";
    return activeChannel === "phone"
      ? maskPhone(emailOrPhone)
      : maskEmail(emailOrPhone);
  }, [activeChannel, emailOrPhone]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((value) => value - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = async () => {
    if (otp.length !== OTP_LENGTH) return;

    setVerifying(true);

    try {
      const response = await verifyFlowOtp({
        flow: activeFlow,
        channel: activeChannel,
        emailOrPhone,
        otp,
      });

      if (activeFlow === "register") {
        const userId = (response as { id?: string }).id;
        if (!userId) {
          throw new Error("Missing user id from verification response.");
        }
        setUserId(userId);
        setVerified(true);
        return;
      }

      if (activeFlow === "login") {
        const token = (response as { token?: string }).token;
        if (!token) {
          throw new Error("Missing token from verification response.");
        }
        authenticate({ token });
        router.replace("/(tabs)");
        return;
      }

      router.push("/reset-password");
    } catch (error) {
      Alert.alert(
        "Verification failed",
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Please try again.",
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);

    try {
      if (activeFlow === "register") {
        await resendRegisterOtp(activeChannel, emailOrPhone);
      } else {
        await resendFlowOtp(
          activeChannel,
          emailOrPhone,
          activeFlow === "login" ? "login" : "forgot_password",
        );
      }
      setSecondsLeft(OTP_RESEND_SECONDS);
    } catch (error) {
      Alert.alert(
        "Unable to resend code",
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Please try again.",
      );
    } finally {
      setResending(false);
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <>
      <AuthScreenLayout
        footer={
          <Button
            label="Verify OTP"
            variant={otp.length === OTP_LENGTH ? "primary" : "soft"}
            disabled={otp.length !== OTP_LENGTH || verifying}
            loading={verifying}
            onPress={handleVerify}
          />
        }
      >
        <AuthHeader
          title="OTP verification"
          subtitle={`Enter the 6 digit one time verification code sent to ${maskedDestination}`}
        />

        <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} />

        <Text style={styles.resendText}>
          Didn&apos;t get a code?{" "}
          {secondsLeft > 0 ? (
            <Text style={styles.resendTimer}>
              Resend in {minutes}:{seconds}
            </Text>
          ) : (
            <Text
              style={styles.resendLink}
              onPress={resending ? undefined : handleResend}
            >
              {resending ? "Sending..." : "Resend code"}
            </Text>
          )}
        </Text>
      </AuthScreenLayout>

      <AuthBottomSheet visible={verifying && !verified}>
        <OtpLoader />
      </AuthBottomSheet>

      <AuthBottomSheet
        visible={verified}
        actionLabel="Set-up your password"
        onActionPress={() => {
          setVerified(false);
          router.push("/setup-password" as Href);
        }}
      >
        <SuccessIllustration
          variant="otp"
          label="OTP verified!"
          description="Your OTP has been successfully verified."
        />
      </AuthBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  resendText: {
    marginTop: spacing.xLarge,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[500],
  },
  resendTimer: {
    fontFamily: "Satoshi-Medium",
    color: colors.neutral[700],
  },
  resendLink: {
    fontFamily: "Satoshi-Medium",
    color: colors.brand.primary.main,
    textDecorationLine: "underline",
  },
});
