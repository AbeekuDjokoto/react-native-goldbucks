import {
  HomeHeader,
  InvestmentCard,
  PromoBanner,
  QuickActions,
  SavingsPlanCard,
  SectionHeader,
  TierUpgradeBanner,
  TransactionGroupList,
  WalletBalance,
} from "@/components/home";
import {
  HOME_USER,
  INVESTMENT_PLANS,
  QUICK_ACTIONS,
  SAVINGS_PLANS,
  TIER_UPGRADE,
  TRANSACTION_GROUPS,
  WALLET,
} from "@/constants/data";
import "@/global.css";
import { colors, radius, spacing } from "@/theme/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { styled } from "nativewind";
import { useCallback } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

export default function HomeScreen() {
  const handleQuickAction = useCallback((action: QuickAction) => {
    if (action.href) {
      router.push(action.href as "/(tabs)/invest");
      return;
    }
    Alert.alert(action.label, "Coming soon.");
  }, []);

  const renderTransaction: ListRenderItem<TransactionGroup> = useCallback(
    ({ item }) => (
      <View style={styles.txBleed}>
        <TransactionGroupList group={item} />
      </View>
    ),
    [],
  );

  const listHeader = (
    <View>
      {/* Cream zone — gradient shows through */}
      <View style={styles.topZone}>
        <HomeHeader
          user={HOME_USER}
          onGiftPress={() => Alert.alert("Rewards", "Coming soon.")}
          onNotificationPress={() =>
            Alert.alert("Notifications", "Coming soon.")
          }
        />
        <TierUpgradeBanner
          banner={TIER_UPGRADE}
          onVerifyPress={() => Alert.alert("Verify", "Coming soon.")}
        />
        <WalletBalance wallet={WALLET} />
        <QuickActions
          actions={QUICK_ACTIONS}
          onActionPress={handleQuickAction}
        />
      </View>

      {/* White sheet from Savings Plans downward + soft blue radial */}
      <View style={styles.whiteSheet}>
        <View style={styles.sheetBlock}>
          <SectionHeader
            title="Savings Plans"
            onActionPress={() => router.push("/(tabs)/savings")}
          />
          <FlatList
            horizontal
            data={SAVINGS_PLANS}
            keyExtractor={(plan) => plan.id}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-small" />}
            contentContainerStyle={styles.savingsList}
            renderItem={({ item: plan }) => (
              <SavingsPlanCard
                plan={plan}
                onPress={() => router.push("/(tabs)/savings")}
              />
            )}
          />
        </View>

        <View style={styles.sheetBlock}>
          <PromoBanner />
        </View>

        <View style={styles.sheetBlock} className="gap-y-small">
          <SectionHeader
            title="Investments"
            onActionPress={() => router.push("/(tabs)/invest")}
          />
          <View className="gap-y-small">
            {INVESTMENT_PLANS.map((plan) => (
              <InvestmentCard
                key={plan.id}
                plan={plan}
                onPress={() => router.push("/(tabs)/invest")}
              />
            ))}
          </View>
        </View>

        <View style={styles.sheetBlock}>
          <SectionHeader
            title="Transaction history"
            onActionPress={() => Alert.alert("Transactions", "Coming soon.")}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-brand-primary-500">
      <LinearGradient
        colors={[colors.brand.primary[500], "#FFFFFF"]}
        locations={[0, 0.42]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView className="flex-1" edges={["top"]}>
        <FlatList
          data={TRANSACTION_GROUPS}
          keyExtractor={(group) => group.id}
          renderItem={renderTransaction}
          ListHeaderComponent={listHeader}
          ListFooterComponent={<View style={styles.listFooter} />}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.txSeparator} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "transparent",
  },
  listContent: {
    paddingBottom: spacing.xxLarge,
    paddingHorizontal: spacing.screen,
    backgroundColor: "transparent",
  },
  topZone: {
    marginHorizontal: -spacing.screen,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.medium,
    /** Cream strip below Quick Actions + room for sheet curve overlap */
    paddingBottom: spacing.sheetGap + radius.sheet,
    gap: spacing.large,
    backgroundColor: "#FBF6EE",
  },
  whiteSheet: {
    marginTop: -radius.sheet,
    marginHorizontal: -spacing.screen,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xLarge,
    gap: spacing.large,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    overflow: "hidden",
    zIndex: 1,
  },
  sheetBlock: {
    gap: spacing.small,
    zIndex: 1,
  },
  savingsList: {
    paddingBottom: 4,
    paddingRight: spacing.screen,
  },
  radialWrap: {
    position: "absolute",
    zIndex: 0,
  },
  txBleed: {
    marginHorizontal: -spacing.screen,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.background,
  },
  txSeparator: {
    height: spacing.medium,
    marginHorizontal: -spacing.screen,
    backgroundColor: colors.background,
  },
  listFooter: {
    marginHorizontal: -spacing.screen,
    minHeight: spacing.xxLarge,
    backgroundColor: colors.background,
  },
});
