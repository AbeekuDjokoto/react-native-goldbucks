import { colors, radius } from "@/theme/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuickActionsProps = {
  actions: QuickAction[];
  onActionPress?: (action: QuickAction) => void;
};

const ACTION_ICONS: Record<
  QuickAction["icon"],
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  fund: "wallet-plus-outline",
  transfer: "tray-arrow-down",
  invest: "piggy-bank-outline",
};

export function QuickActions({ actions, onActionPress }: QuickActionsProps) {
  return (
    <View style={styles.card}>
      {actions.map((action) => (
        <Pressable
          key={action.id}
          onPress={() => onActionPress?.(action)}
          style={styles.item}
        >
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={ACTION_ICONS[action.icon]}
              size={24}
              color="#383843"
            />
            {action.icon === "invest" ? (
              <View style={styles.bolt}>
                <MaterialCommunityIcons name="flash" size={10} color="#383843" />
              </View>
            ) : null}
          </View>
          <Text className="font-satoshi-medium text-xs text-neutral-800">
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.background,
    borderRadius: radius.small,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#0B0844",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral[50],
    alignItems: "center",
    justifyContent: "center",
  },
  bolt: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
