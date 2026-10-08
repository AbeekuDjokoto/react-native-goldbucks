import { formatNaira } from "@/lib/format";
import { colors, radius } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TotalSavingsCardProps = {
  savings: TotalSavingsInfo;
};

export function TotalSavingsCard({ savings }: TotalSavingsCardProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <View style={styles.card}>
      <Text className="font-satoshi text-sm text-neutral-500">{savings.label}</Text>

      <View className="mt-x-small flex-row items-center gap-x-small">
        <Text className="font-satoshi-bold text-[32px] leading-10 text-brand-secondary">
          {hidden ? "••••••••" : formatNaira(savings.balance)}
        </Text>
        <Pressable onPress={() => setHidden((v) => !v)} hitSlop={10}>
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={colors.neutral[500]}
          />
        </Pressable>
      </View>

      <View style={styles.ratePill}>
        <Text className="font-satoshi-medium text-xs text-brand-primary">
          {savings.rateLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.brand.secondary[50],
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  ratePill: {
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: colors.brand.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
