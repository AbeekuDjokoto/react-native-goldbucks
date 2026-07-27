import { colors, radius, spacing } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

type TextFieldIcon = "mail" | "lock" | "phone";

type TextFieldProps = TextInputProps & {
  label: string;
  icon?: TextFieldIcon;
  secureToggle?: boolean;
  compact?: boolean;
};

export function TextField({
  label,
  icon,
  secureToggle,
  secureTextEntry,
  compact = false,
  style,
  ...props
}: TextFieldProps) {
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));

  const leadingIcon =
    icon === "mail"
      ? "mail-outline"
      : icon === "lock"
        ? "lock-closed-outline"
        : icon === "phone"
          ? "call-outline"
          : null;

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        {leadingIcon ? (
          <Ionicons
            name={leadingIcon}
            size={18}
            color={colors.neutral[400]}
            style={styles.leadingIcon}
          />
        ) : null}
        <TextInput
          placeholderTextColor={colors.neutral[400]}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          style={[styles.input, style]}
          {...props}
        />
        {secureToggle ? (
          <Pressable
            onPress={() => setHidden((value) => !value)}
            hitSlop={8}
            style={styles.trailingIcon}
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.neutral[400]}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.large,
  },
  wrapCompact: {
    marginBottom: spacing.xSmall,
  },
  label: {
    marginBottom: spacing.xSmall,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: colors.neutral[600],
  },
  field: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: radius.xSmall,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.medium,
  },
  leadingIcon: {
    marginRight: spacing.xSmall,
  },
  input: {
    flex: 1,
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    color: colors.neutral[900],
    paddingVertical: spacing.small,
  },
  trailingIcon: {
    marginLeft: spacing.xSmall,
  },
});
