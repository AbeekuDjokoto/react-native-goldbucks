import { icons } from "@/constants/icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type SavingsScreenHeaderProps = {
  hasNotifications?: boolean;
  onNotificationPress?: () => void;
};

export function SavingsScreenHeader({
  hasNotifications = true,
  onNotificationPress,
}: SavingsScreenHeaderProps) {
  return (
    <View style={styles.root}>
      <Text className="font-satoshi-bold text-xl text-neutral-900">Savings</Text>

      <Pressable onPress={onNotificationPress} hitSlop={8} style={styles.iconButton}>
        <Image source={icons.headerBell} style={styles.icon} resizeMode="contain" />
        {hasNotifications ? <View style={styles.badge} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});
