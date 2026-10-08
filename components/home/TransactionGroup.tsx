import { formatNaira } from "@/lib/format";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type TransactionRowProps = {
  item: TransactionItem;
};

const TX_ICONS: Record<
  TransactionItem["icon"],
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  interest: "leaf",
  topup: "wallet-outline",
  transfer: "swap-horizontal",
  invest: "chart-line",
};

export function TransactionRow({ item }: TransactionRowProps) {
  const isSuccess = item.status === "successful";

  return (
    <View className="flex-row items-center gap-x-small py-small">
      <View className="relative">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
          <MaterialCommunityIcons
            name={TX_ICONS[item.icon]}
            size={20}
            color="#383843"
          />
        </View>
        <View
          className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 items-center justify-center rounded-full ${
            isSuccess ? "bg-semantic-green" : "bg-semantic-red"
          }`}
        >
          <Ionicons
            name={isSuccess ? "checkmark" : "close"}
            size={10}
            color="#FFFFFF"
          />
        </View>
      </View>

      <View className="flex-1">
        <Text className="font-satoshi-medium text-sm text-neutral-900">
          {item.title}
        </Text>
        <Text className="font-satoshi mt-0.5 text-xs text-neutral-500">
          {item.datetime}
        </Text>
      </View>

      <View className="items-end">
        <Text className="font-satoshi-bold text-sm text-neutral-900">
          {formatNaira(item.amount, 0)}
        </Text>
        <Text
          className={`font-satoshi-medium mt-0.5 text-xs ${
            isSuccess ? "text-semantic-green" : "text-semantic-red"
          }`}
        >
          {isSuccess ? "Successful" : "Failed"}
        </Text>
      </View>
    </View>
  );
}

type TransactionGroupProps = {
  group: TransactionGroup;
};

export function TransactionGroupList({ group }: TransactionGroupProps) {
  return (
    <View>
      <Text className="font-satoshi-medium mb-x-small text-xs text-brand-primary">
        {group.dateLabel}
      </Text>
      <View>
        {group.items.map((item) => (
          <TransactionRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
