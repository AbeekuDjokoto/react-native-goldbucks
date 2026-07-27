import { colors, radius } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TierUpgradeBannerProps = {
  banner: TierUpgradeBanner;
  onVerifyPress?: () => void;
};

export function TierUpgradeBanner({
  banner,
  onVerifyPress,
}: TierUpgradeBannerProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconRing}>
        <View style={styles.iconFill}>
          <Ionicons name="person" size={20} color="#C4862D" />
        </View>
      </View>

      <View style={styles.copy}>
        <Text className="font-satoshi-bold text-sm text-neutral-900">
          {banner.title}
        </Text>
        <Text className="font-satoshi mt-0.5 text-xs leading-4 text-neutral-500">
          {banner.description}
        </Text>
      </View>

      <Pressable onPress={onVerifyPress} style={styles.button}>
        <Text className="font-satoshi-medium text-xs text-white">
          {banner.ctaLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: radius.small,
    backgroundColor: colors.brand.secondary[50],
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  iconRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: colors.brand.primary.main,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  iconFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#D7E3F0",
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    paddingRight: 8,
  },
  button: {
    backgroundColor: colors.brand.secondary.main,
    borderRadius: radius.xSmall,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
