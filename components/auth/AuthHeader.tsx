import { colors, spacing } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  showBack?: boolean;
  onBackPress?: () => void;
};

export function AuthHeader({
  title,
  subtitle,
  showBack = true,
  onBackPress,
}: AuthHeaderProps) {
  return (
    <View style={styles.wrap}>
      {showBack ? (
        <Pressable
          onPress={onBackPress ?? (() => router.back())}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.neutral[900]} />
        </Pressable>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? (
        typeof subtitle === "string" ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : (
          subtitle
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.xLarge,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: spacing.large,
  },
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: colors.brand.secondary.main,
  },
  subtitle: {
    marginTop: spacing.xSmall,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[500],
  },
});
