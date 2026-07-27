import { formatNaira } from "@/lib/format";
import { colors, radius } from "@/theme/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PlanStyle = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBg: string;
  watermarkColor: string;
  rateBg: string;
  rateText: string;
  accentText: string;
};

const PLAN_STYLES: Record<SavingsPlan["kind"], PlanStyle> = {
  target: {
    icon: "bullseye-arrow",
    iconColor: "#BB0613",
    iconBg: "#FFF0F1",
    watermarkColor: "#F5C6CE",
    rateBg: "#FFF0F1",
    rateText: "#BB0613",
    accentText: "#BB0613",
  },
  group: {
    icon: "wallet",
    iconColor: "#2D6A4F",
    iconBg: "#E8F5EE",
    watermarkColor: "#B8DDD0",
    rateBg: "#E8F5EE",
    rateText: "#2D6A4F",
    accentText: "#2D6A4F",
  },
  fixed: {
    icon: "piggy-bank",
    iconColor: "#C4862D",
    iconBg: "#FCF8F3",
    watermarkColor: "#F5EBD8",
    rateBg: "#FCF8F3",
    rateText: "#C4862D",
    accentText: "#C4862D",
  },
  lock: {
    icon: "safe",
    iconColor: "#0B0844",
    iconBg: "#F6F6FE",
    watermarkColor: "#BEBBF7",
    rateBg: "#F6F6FE",
    rateText: "#0B0844",
    accentText: "#0B0844",
  },
};

type SavingsPlanRowProps = {
  plan: SavingsPlan;
  onPress?: () => void;
};

export function SavingsPlanRow({ plan, onPress }: SavingsPlanRowProps) {
  const style = PLAN_STYLES[plan.kind];

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.inner}>
        <MaterialCommunityIcons
          name={style.icon}
          size={88}
          color={style.watermarkColor}
          style={styles.watermark}
        />

        <View style={styles.topRow}>
          <View
            style={[styles.iconWrap, { backgroundColor: style.iconBg }]}
          >
            <MaterialCommunityIcons
              name={style.icon}
              size={20}
              color={style.iconColor}
            />
          </View>

          {plan.ctaLabel ? (
            <Text
              className="font-satoshi-medium text-xs"
              style={{ color: style.accentText }}
            >
              {plan.ctaLabel}
            </Text>
          ) : plan.amount !== undefined ? (
            <Text
              className="font-satoshi-bold text-sm"
              style={{ color: style.accentText }}
            >
              {formatNaira(plan.amount)}
            </Text>
          ) : null}
        </View>

        <Text className="font-satoshi-bold text-sm text-neutral-900">
          {plan.title}
        </Text>
        <Text className="font-satoshi mt-xx-small text-xs leading-4 text-neutral-500">
          {plan.description}
        </Text>

        {plan.rateLabel ? (
          <View
            style={[styles.ratePill, { backgroundColor: style.rateBg }]}
          >
            <Text
              className="font-satoshi-medium text-xs"
              style={{ color: style.rateText }}
            >
              {plan.rateLabel}
            </Text>
          </View>
        ) : null}
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
  topRow: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  watermark: {
    position: "absolute",
    right: -4,
    bottom: -6,
    opacity: 0.9,
  },
  ratePill: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
