import { Pressable, Text, View } from "react-native";

export function SectionHeader({
  title,
  actionLabel = "View all →",
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-satoshi-bold text-base text-neutral-900">
        {title}
      </Text>
      {onActionPress ? (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text className="font-satoshi-medium text-sm text-brand-primary">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
