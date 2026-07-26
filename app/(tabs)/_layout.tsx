import { tabs } from "@/constants/data";
import { colors } from "@/theme/tokens";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE_COLOR = colors.brand.primary.main;
const INACTIVE_COLOR = colors.neutral.muted;

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Image
                source={tab.icon}
                resizeMode="contain"
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
      ))}
      <Tabs.Screen name="invest/[id]" options={{ href: null }} />
      <Tabs.Screen name="savings/[id]" options={{ href: null }} />
    </Tabs>
  );
};

export default TabsLayout;
