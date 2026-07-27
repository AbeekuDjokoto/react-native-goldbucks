import {
  AuthHeader,
  AuthLink,
  AuthScreenLayout,
  Button,
  ReferralField,
  TermsFooter,
  TextField,
} from "@/components/auth";
import { AUTH_USER } from "@/constants/auth";
import { ApiError } from "@/lib/api-client";
import {
  createAccountByEmail,
  createAccountByPhone,
  sendRegisterEmailOtp,
  sendRegisterPhoneOtp,
} from "@/services/auth-api";
import { useAuthFlowStore } from "@/store/auth-flow-store";
import { spacing } from "@/theme/tokens";
import { router, Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
  const [usePhone, setUsePhone] = useState(false);
  const [value, setValue] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const setRegisterFlow = useAuthFlowStore((state) => state.setRegisterFlow);

  const canSubmit = value.trim().length > 0;

  const handleVerify = async () => {
    const emailOrPhone = value.trim();
    const channel = usePhone ? "phone" : "email";
    const referral = referralCode.trim() || undefined;

    setLoading(true);

    try {
      if (usePhone) {
        await createAccountByPhone({ phoneNumber: emailOrPhone, referralCode: referral });
        await sendRegisterPhoneOtp(emailOrPhone);
      } else {
        await createAccountByEmail({ email: emailOrPhone, referralCode: referral });
        await sendRegisterEmailOtp(emailOrPhone);
      }

      setRegisterFlow({ channel, emailOrPhone, referralCode: referral });
      router.push({
        pathname: "/verify-otp",
        params: { flow: "register", channel },
      });
    } catch (error) {
      Alert.alert(
        "Unable to verify",
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
        <View>
          <Button
            label={usePhone ? "Verify phone number" : "Verify email address"}
            variant={canSubmit ? "primary" : "soft"}
            loading={loading}
            disabled={!canSubmit || loading}
            onPress={handleVerify}
          />
          <TermsFooter
            actionLabel={
              usePhone ? "Verify phone number" : "Verify email address"
            }
          />
        </View>
      }
    >
      <AuthHeader
        showBack={false}
        title="Get started! 🚀"
        subtitle="Enter your email address or phone number to get started with creating your account"
      />

      <TextField
        label={usePhone ? "Phone number" : "Email address"}
        icon={usePhone ? "phone" : "mail"}
        compact
        value={value}
        onChangeText={setValue}
        keyboardType={usePhone ? "phone-pad" : "email-address"}
        autoCapitalize="none"
        placeholder={usePhone ? AUTH_USER.phone : "monicageller@email.com"}
      />

      <AuthLink
        label={
          usePhone ? "Use my email address instead" : "Use my phone number instead"
        }
        onPress={() => {
          setUsePhone((current) => {
            setValue("");
            return !current;
          });
        }}
      />

      <ReferralField value={referralCode} onChangeText={setReferralCode} />

      <Text style={styles.signInText}>
        Already have an account?{" "}
        <Link href="/sign-in" style={styles.signInLink}>
          Sign in
        </Link>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  signInText: {
    marginTop: spacing.large,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: "#807F94",
    textAlign: "center",
  },
  signInLink: {
    fontFamily: "Satoshi-Medium",
    color: "#C4862D",
    textDecorationLine: "underline",
  },
});
