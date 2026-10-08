import { colors, spacing } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, type PressableProps } from "react-native";

type AuthLinkProps = PressableProps & {
  label: string;
  align?: "left" | "right" | "center";
  inline?: boolean;
};

export function AuthLink({
  label,
  align = "left",
  inline = false,
  style,
  ...props
}: AuthLinkProps) {
  return (
    <Pressable
      style={[
        styles.base,
        inline && styles.inline,
        align === "right" && styles.right,
        align === "center" && styles.center,
        typeof style === "function" ? undefined : style,
      ]}
      {...props}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

type PasswordHintProps = {
  text: string;
};

export function PasswordHint({ text }: PasswordHintProps) {
  return (
    <View style={styles.hint}>
      <Text style={styles.hintText}>{text}</Text>
    </View>
  );
}

type ProfileSummaryProps = {
  name: string;
  email: string;
};

export function ProfileSummary({ name, email }: ProfileSummaryProps) {
  return (
    <View style={styles.profile}>
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={36} color={colors.neutral[400]} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

type OtpLoaderProps = {
  label?: string;
};

export function OtpLoader({ label = "Verifying OTP" }: OtpLoaderProps) {
  const dots: Array<{ color: string; top: number; left: number }> = [
    { color: "#0B0844", top: 4, left: 30 },
    { color: "#4F63D2", top: 22, left: 8 },
    { color: "#5B8DEF", top: 48, left: 18 },
    { color: "#F4B740", top: 44, left: 46 },
    { color: "#E67E22", top: 18, left: 52 },
  ];

  return (
    <View style={styles.loaderWrap}>
      <View style={styles.loaderDots}>
        {dots.map((dot) => (
          <View
            key={`${dot.color}-${dot.top}`}
            style={[
              styles.dot,
              {
                backgroundColor: dot.color,
                top: dot.top,
                left: dot.left,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.loaderLabel}>{label}</Text>
    </View>
  );
}

type SuccessIllustrationProps = {
  label: string;
  description: string;
  variant?: "password" | "otp";
};

export function SuccessIllustration({
  label,
  description,
  variant = "password",
}: SuccessIllustrationProps) {
  return (
    <View style={styles.successWrap}>
      {variant === "otp" ? <OtpVerifiedBadge /> : <PasswordLockBadge />}
      <Text style={styles.successTitle}>{label}</Text>
      <Text style={styles.successDescription}>{description}</Text>
    </View>
  );
}

function OtpVerifiedBadge() {
  return (
    <View style={styles.otpBadgeWrap}>
      <View style={styles.otpOuterRing}>
        <View style={styles.otpInnerRing}>
          <Text style={styles.otpCheck}>✓</Text>
        </View>
      </View>
    </View>
  );
}

function PasswordLockBadge() {
  return (
    <View style={styles.lockBody}>
      <View style={styles.lockShackle} />
      <View style={styles.lockBase}>
        <View style={styles.lockKeyhole} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    marginBottom: spacing.large,
  },
  inline: {
    alignSelf: "auto",
    marginBottom: 0,
  },
  right: {
    alignSelf: "flex-end",
  },
  center: {
    alignSelf: "center",
  },
  label: {
    fontFamily: "Satoshi-Medium",
    fontSize: 14,
    color: colors.brand.primary.main,
    textDecorationLine: "underline",
  },
  hint: {
    marginTop: -spacing.small,
    marginBottom: spacing.large,
    borderRadius: 8,
    backgroundColor: colors.neutral[50],
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  hintText: {
    fontFamily: "Satoshi-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: colors.neutral[600],
    textAlign: "center",
  },
  profile: {
    alignItems: "center",
    marginBottom: spacing.xxLarge,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.neutral[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.medium,
  },
  name: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    color: colors.neutral[900],
  },
  email: {
    marginTop: spacing.xxSmall,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: colors.neutral[500],
  },
  loaderWrap: {
    alignItems: "center",
    paddingBottom: spacing.large,
  },
  loaderDots: {
    width: 72,
    height: 72,
    position: "relative",
    marginBottom: spacing.large,
  },
  dot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  loaderLabel: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    color: colors.neutral[900],
  },
  successWrap: {
    alignItems: "center",
    width: "100%",
  },
  otpBadgeWrap: {
    marginBottom: spacing.large,
  },
  otpOuterRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#E8F8EF",
    alignItems: "center",
    justifyContent: "center",
  },
  otpInnerRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2D6A4F",
    alignItems: "center",
    justifyContent: "center",
  },
  otpCheck: {
    fontFamily: "Satoshi-Bold",
    fontSize: 28,
    color: colors.background,
  },
  lockBody: {
    alignItems: "center",
    marginBottom: spacing.large,
  },
  lockShackle: {
    width: 34,
    height: 28,
    borderWidth: 6,
    borderColor: "#F2C94C",
    borderBottomWidth: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginBottom: -4,
  },
  lockBase: {
    width: 56,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F2C94C",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E0A82B",
  },
  lockKeyhole: {
    width: 8,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.brand.red.main,
  },
  successTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    color: colors.neutral[900],
    textAlign: "center",
  },
  successDescription: {
    marginTop: spacing.xSmall,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[500],
    textAlign: "center",
  },
});
