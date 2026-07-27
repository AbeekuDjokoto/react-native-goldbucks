import type { ImageSourcePropType } from "react-native";

declare global {
  interface AppTab {
    name: string;
    title: string;
    icon: ImageSourcePropType;
  }

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
  }

  interface HomeUser {
    name: string;
    tagline: string;
    avatarUri?: string;
    hasNotifications: boolean;
  }

  interface TierUpgradeBanner {
    title: string;
    description: string;
    ctaLabel: string;
  }

  interface WalletInfo {
    label: string;
    balance: number;
    currencySymbol: string;
    rateLabel: string;
    accountNumber: string;
    slideCount: number;
    activeSlide: number;
  }

  interface QuickAction {
    id: string;
    label: string;
    icon: "fund" | "transfer" | "invest";
    href?: string;
  }

  interface SavingsPlan {
    id: string;
    title: string;
    description: string;
    kind: "lock" | "target" | "group" | "fixed";
    rateLabel?: string;
    ctaLabel?: string;
    amount?: number;
  }

  interface TotalSavingsInfo {
    label: string;
    balance: number;
    rateLabel: string;
  }

  interface InvestmentPlan {
    id: string;
    title: string;
    description: string;
    rateLabel: string;
    kind: "frontier" | "money-market";
    ctaLabel?: string;
    amount?: number;
  }

  interface TransactionItem {
    id: string;
    title: string;
    datetime: string;
    amount: number;
    status: "successful" | "failed";
    icon: "interest" | "topup" | "transfer" | "invest";
  }

  interface TransactionGroup {
    id: string;
    dateLabel: string;
    items: TransactionItem[];
  }

  interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
  }
}

export {};
