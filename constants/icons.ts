import account from "@/assets/icons/account.png";
import chartEvaluation from "@/assets/icons/chart-evaluation.png";
import home from "@/assets/icons/home.png";
import piggyBank from "@/assets/icons/piggy-bank.png";

export const icons = {
  home,
  piggyBank,
  chartEvaluation,
  account,
} as const;

export type IconKey = keyof typeof icons;
