import { colors, spacing } from "@/theme/tokens";
import { StyleSheet, Text, View } from "react-native";

type TermsFooterProps = {
  actionLabel?: string;
};

export function TermsFooter({
  actionLabel = "Verify email address",
}: TermsFooterProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>
        By tapping on the &apos;{actionLabel}&apos; button, you agree to our{" "}
        <Text style={styles.link}>Terms and conditions</Text> and{" "}
        <Text style={styles.link}>Privacy policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.medium,
  },
  text: {
    fontFamily: "Satoshi-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: colors.neutral[500],
    textAlign: "center",
  },
  link: {
    fontFamily: "Satoshi-Medium",
    color: colors.brand.primary.main,
  },
});
