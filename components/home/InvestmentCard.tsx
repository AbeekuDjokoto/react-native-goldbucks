import { formatNaira } from "@/lib/format";
import { colors, radius } from "@/theme/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type InvestmentCardProps = {
  plan: InvestmentPlan;
  onPress?: () => void;
};

export function InvestmentCard({ plan, onPress }: InvestmentCardProps) {
  const isFrontier = plan.kind === "frontier";
  const iconName = isFrontier ? "chart-bar" : "sprout";
  const iconColor = isFrontier ? "#5B4FCF" : "#C4862D";
  const iconBg = isFrontier ? "bg-brand-secondary-50" : "bg-brand-primary-50";
  const rateBg = isFrontier ? "bg-brand-primary-50" : "bg-brand-secondary-50";
  const rateText = isFrontier ? "text-brand-primary" : "text-brand-secondary";

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.inner}>
        <MaterialCommunityIcons
          name={iconName}
          size={88}
          color={isFrontier ? "#E8E7F8" : "#F5EBD8"}
          style={styles.watermark}
        />

        <View className="mb-small flex-row items-start justify-between">
          <View
            className={`h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={iconColor}
            />
          </View>

          {plan.ctaLabel ? (
            <Text className="font-satoshi-medium text-xs text-brand-primary">
              {plan.ctaLabel}
            </Text>
          ) : plan.amount !== undefined ? (
            <Text className="font-satoshi-bold text-sm text-neutral-900">
              {formatNaira(plan.amount, 0)}
            </Text>
          ) : null}
        </View>

        <Text className="font-satoshi-bold text-sm text-neutral-900">
          {plan.title}
        </Text>
        <Text className="font-satoshi mt-xx-small text-xs leading-4 text-neutral-500">
          {plan.description}
        </Text>

        <View
          className={`mt-small self-start rounded-full px-small py-xx-small ${rateBg}`}
        >
          <Text className={`font-satoshi-medium text-xs ${rateText}`}>
            {plan.rateLabel}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.medium,
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: "#0B0844",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inner: {
    padding: 16,
    overflow: "hidden",
    borderRadius: radius.medium,
  },
  watermark: {
    position: "absolute",
    right: -4,
    bottom: -6,
    opacity: 0.9,
  },
});