import { colors, radius, spacing } from "@/theme/tokens";
import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

type ReferralFieldProps = TextInputProps;

export function ReferralField({ style, ...props }: ReferralFieldProps) {
  return (
    <View style={styles.wrap}>
      <TextInput
        placeholder="Have a referral/promo code? Enter code here"
        placeholderTextColor={colors.neutral[300]}
        autoCapitalize="characters"
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.xSmall,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.neutral[200],
    borderRadius: radius.xSmall,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    color: colors.neutral[900],
  },
});
