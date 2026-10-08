import account from "@/assets/icons/account.png";
import bell from "@/assets/icons/bell.png";
import chartEvaluation from "@/assets/icons/chart-evaluation.png";
import headerBell from "@/assets/icons/header-bell.png";
import headerPromo from "@/assets/icons/header-promo.png";
import home from "@/assets/icons/home.png";
import notifications from "@/assets/icons/notification.png";
import piggyBank from "@/assets/icons/piggy-bank.png";

export const icons = {
  home,
  piggyBank,
  chartEvaluation,
  account,
  notifications,
  bell,
  headerPromo,
  headerBell,
} as const;

export type IconKey = keyof typeof icons;
