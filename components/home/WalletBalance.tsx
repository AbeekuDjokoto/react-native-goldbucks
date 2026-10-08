import { formatNaira } from "@/lib/format";
import { colors } from "@/theme/tokens";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type WalletBalanceProps = {
  wallet: WalletInfo;
};

export function WalletBalance({ wallet }: WalletBalanceProps) {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(wallet.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View className="items-center">
      <Text className="font-satoshi text-sm text-neutral-500">{wallet.label}</Text>

      <View className="mt-x-small flex-row items-center gap-x-small">
        <Text className="font-satoshi-bold text-[32px] leading-10 text-neutral-900">
          {hidden ? "••••••••" : formatNaira(wallet.balance)}
        </Text>
        <Pressable onPress={() => setHidden((v) => !v)} hitSlop={10}>
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#807F94"
          />
        </Pressable>
      </View>

      <View style={styles.ratePill}>
        <Text className="font-satoshi-medium text-xs text-brand-primary">
          {wallet.rateLabel}
        </Text>
      </View>

      <View className="mt-medium flex-row items-center gap-1">
        {Array.from({ length: wallet.slideCount }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === wallet.activeSlide ? styles.dotActive : styles.dotIdle,
            ]}
          />
        ))}
      </View>

      <Pressable onPress={handleCopy} style={styles.accountPill}>
        <Text className="font-satoshi-medium text-sm text-neutral-800">
          {wallet.accountNumber}
        </Text>
        <Ionicons
          name={copied ? "checkmark" : "copy-outline"}
          size={15}
          color="#807F94"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ratePill: {
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: colors.brand.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dot: {
    height: 4,
    borderRadius: 999,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.brand.red.main,
  },
  dotIdle: {
    width: 10,
    backgroundColor: colors.neutral[300],
  },
  accountPill: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#0B0844",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
