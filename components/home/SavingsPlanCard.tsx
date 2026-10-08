import { formatNaira } from "@/lib/format";
import { colors, radius } from "@/theme/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SavingsPlanCardProps = {
  plan: SavingsPlan;
  onPress?: () => void;
};

export function SavingsPlanCard({ plan, onPress }: SavingsPlanCardProps) {
  const isLock = plan.kind === "lock";

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.inner}>
        <MaterialCommunityIcons
          name={isLock ? "safe" : "target"}
          size={96}
          color={isLock ? "#BEBBF7" : "#F5C6CE"}
          style={styles.watermark}
        />

        <View style={styles.topRow}>
          <View
            className={`h-11 w-11 items-center justify-center rounded-x-small ${
              isLock ? "bg-brand-secondary-50" : "bg-brand-red-50"
            }`}
          >
            <MaterialCommunityIcons
              name={isLock ? "safe" : "target"}
              size={24}
              color={isLock ? "#5B4FCF" : "#BB0613"}
            />
          </View>

          {plan.ctaLabel ? (
            <View className="rounded-full bg-brand-secondary-50 px-small py-xx-small">
              <Text className="font-satoshi-medium text-xs text-brand-secondary">
                {plan.ctaLabel}
              </Text>
            </View>
          ) : plan.amount !== undefined ? (
            <View className="rounded-full bg-brand-red-50 px-small py-xx-small">
              <Text className="font-satoshi-medium text-xs text-brand-red">
                {formatNaira(plan.amount, 0)}
              </Text>
            </View>
          ) : null}
        </View>

        <Text className="font-satoshi-bold text-sm text-neutral-900">
          {plan.title}
        </Text>
        <Text className="font-satoshi mt-xx-small text-xs leading-4 text-neutral-500">
          {plan.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    minHeight: 148,
    borderRadius: radius.medium,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    padding: 16,
    overflow: "hidden",
    borderRadius: radius.medium,
  },
  topRow: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  watermark: {
    position: "absolute",
    right: -12,
    bottom: -16,
    opacity: 0.22,
  },
});
