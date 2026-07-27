import {
  ComplianceFooter,
  SavingsPlanRow,
  SavingsScreenHeader,
  TotalSavingsCard,
} from "@/components/savings";
import { SectionHeader } from "@/components/home";
import {
  HOME_USER,
  SAVINGS_SCREEN_PLANS,
  TOTAL_SAVINGS,
} from "@/constants/data";
import "@/global.css";
import { spacing } from "@/theme/tokens";
import { router } from "expo-router";
import { useCallback } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavingsScreen() {
  const handlePlanPress = useCallback((plan: SavingsPlan) => {
    router.push(`/(tabs)/savings/${plan.id}`);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SavingsScreenHeader
          hasNotifications={HOME_USER.hasNotifications}
          onNotificationPress={() => Alert.alert("Notifications", "Coming soon.")}
        />

        <TotalSavingsCard savings={TOTAL_SAVINGS} />

        <View style={styles.plansSection}>
          <SectionHeader title="Savings Plans" />
          <View className="gap-y-small">
            {SAVINGS_SCREEN_PLANS.map((plan) => (
              <SavingsPlanRow
                key={plan.id}
                plan={plan}
                onPress={() => handlePlanPress(plan)}
              />
            ))}
          </View>
        </View>

        <ComplianceFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.medium,
    paddingBottom: spacing.xxLarge,
    gap: spacing.large,
  },
  plansSection: {
    gap: spacing.small,
  },
});
