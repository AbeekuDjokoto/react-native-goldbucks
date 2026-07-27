import { icons } from "./icons";

export const tabs: AppTab[] = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "savings", title: "Savings", icon: icons.piggyBank },
  { name: "invest", title: "Invest", icon: icons.chartEvaluation },
  { name: "account", title: "Account", icon: icons.account },
];

export const HOME_USER: HomeUser = {
  name: "Monica",
  tagline: "Get closer your financial goals.",
  avatarUri: "https://i.pravatar.cc/150?img=47",
  hasNotifications: true,
};

export const TIER_UPGRADE: TierUpgradeBanner = {
  title: "Upgrade Account Tier",
  description: "Verify your home address to upgrade your account to Tier 3.",
  ctaLabel: "Verify",
};

export const WALLET: WalletInfo = {
  label: "Wallet Balance",
  balance: 50000.9,
  currencySymbol: "₦",
  rateLabel: "15% per annum",
  accountNumber: "234569034",
  slideCount: 3,
  activeSlide: 0,
};

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "fund", label: "Fund Wallet", icon: "fund" },
  { id: "transfer", label: "Transfer", icon: "transfer" },
  { id: "invest", label: "Invest", icon: "invest", href: "/(tabs)/invest" },
];

export const TOTAL_SAVINGS: TotalSavingsInfo = {
  label: "Total Savings",
  balance: 50000.9,
  rateLabel: "Up to 18% per annum",
};

export const SAVINGS_PLANS: SavingsPlan[] = [
  {
    id: "lock-funds",
    title: "Lock Funds",
    description: "Lock your funds to prevent unnecessary spending",
    kind: "lock",
    ctaLabel: "Get started",
  },
  {
    id: "target-savings",
    title: "Target Savings",
    description: "Save towards a target for specific purposes",
    kind: "target",
    amount: 50000,
  },
];

export const SAVINGS_SCREEN_PLANS: SavingsPlan[] = [
  {
    id: "target-savings",
    title: "Target Savings",
    description: "Save towards a goal for specific purposes",
    kind: "target",
    rateLabel: "Up to 15% per annum",
    ctaLabel: "Get started",
  },
  {
    id: "group-savings",
    title: "Group Savings",
    description: "Join a savings plan with other focused individuals",
    kind: "group",
    rateLabel: "Up to 15% per annum",
    amount: 350000.9,
  },
  {
    id: "fixed-savings",
    title: "Fixed Savings",
    description:
      "Continuous daily, weekly or monthly savings with notice periods",
    kind: "fixed",
    rateLabel: "Up to 15% per annum",
    ctaLabel: "Get started",
  },
  {
    id: "lock-funds",
    title: "Lock Funds",
    description: "Lock your funds to prevent unnecessary spending",
    kind: "lock",
    rateLabel: "Up to 15% per annum",
    amount: 120000.95,
  },
];

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: "frontier-note",
    title: "Bucksfield Frontier Note",
    description: "High returns, fixed duration, diversified.",
    rateLabel: "Up to 18% per annum",
    kind: "frontier",
    ctaLabel: "Start Investing",
  },
  {
    id: "money-market",
    title: "Bucksfield Money Market Plan",
    description: "Stable returns, easy access. Grow your short-term funds.",
    rateLabel: "Up to 18% per annum",
    kind: "money-market",
    amount: 50000,
  },
];


export const TRANSACTION_GROUPS: TransactionGroup[] = [
  {
    id: "today",
    dateLabel: "Today",
    items: [
      {
        id: "tx-1",
        title: "Interest payment",
        datetime: "21 January, 2024 | 09:15 AM",
        amount: 100000,
        status: "successful",
        icon: "interest",
      },
      {
        id: "tx-2",
        title: "Wallet top-up",
        datetime: "21 January, 2024 | 09:15 AM",
        amount: 100000,
        status: "failed",
        icon: "topup",
      },
      {
        id: "tx-3",
        title: "Wallet top-up",
        datetime: "21 January, 2024 | 09:15 AM",
        amount: 100000,
        status: "successful",
        icon: "topup",
      },
    ],
  },
  {
    id: "feb-2",
    dateLabel: "February 2, 2025",
    items: [
      {
        id: "tx-4",
        title: "Interest payment",
        datetime: "2 February, 2025 | 11:00 AM",
        amount: 100000,
        status: "successful",
        icon: "interest",
      },
      {
        id: "tx-5",
        title: "Wallet top-up",
        datetime: "2 February, 2025 | 11:00 AM",
        amount: 100000,
        status: "successful",
        icon: "topup",
      },
    ],
  },
  {
    id: "jan-29",
    dateLabel: "January 29, 2025",
    items: [
      {
        id: "tx-6",
        title: "Interest payment",
        datetime: "29 January, 2025 | 11:00 AM",
        amount: 100000,
        status: "successful",
        icon: "interest",
      },
    ],
  },
];
