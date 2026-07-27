import { colors, radius, spacing } from "@/theme/tokens";
import type { PressableProps } from "react-native";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "soft";

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  label,
  variant = "primary",
  disabled,
  loading = false,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={[
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "soft" && styles.soft,
        isDisabled && variant !== "soft" && styles.disabled,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.label,
          variant === "soft" && styles.softLabel,
          isDisabled && variant !== "soft" && styles.disabledLabel,
          loading && styles.hiddenLabel,
        ]}
      >
        {label}
      </Text>
      {loading ? (
        <ActivityIndicator
          color={variant === "soft" ? colors.brand.secondary.main : colors.background}
          style={styles.spinner}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
  },
  primary: {
    backgroundColor: colors.brand.secondary.main,
  },
  secondary: {
    backgroundColor: colors.brand.secondary[100],
  },
  soft: {
    backgroundColor: "#BCBEE4",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: colors.background,
  },
  softLabel: {
    color: colors.background,
  },
  disabledLabel: {
    opacity: 0.6,
  },
  hiddenLabel: {
    opacity: 0,
  },
  spinner: {
    position: "absolute",
  },
});
