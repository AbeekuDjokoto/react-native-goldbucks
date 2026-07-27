/**
 * GoldBucks design tokens from Figma
 * https://www.figma.com/design/7nnQ084zQukMOEmCFIbm4E/GoldBucks
 *
 * Prefer NativeWind utilities from global.css `@theme` (e.g. `bg-brand-primary`,
 * `p-x-small`). Use this module for StyleSheet / non-className access.
 */

export const colors = {
  brand: {
    primary: {
      main: "#c4862d",
      50: "#fcf8f3",
      300: "#e0b476",
      400: "#d69e4d",
      /** Warm cream used at top of Home gradient */
      500: "#fbf6ee",
    },
    secondary: {
      main: "#0b0844",
      50: "#f6f6fe",
      100: "#bebbf7",
      500: "#0b0844",
    },
    red: {
      main: "#bb0613",
      50: "#fff0f1",
    },
    ink: "#2f3541",
  },
  neutral: {
    50: "#f7f7f8",
    100: "#eeeef1",
    200: "#d3d2da",
    300: "#b7b7c3",
    400: "#9c9bab",
    500: "#807f94",
    600: "#67667a",
    700: "#504f5e",
    800: "#383843",
    900: "#212027",
    muted: "#868a90",
  },
  border: "#eeeef1",
  /** Cool light grey used on secondary surfaces; Home sheet is white. */
  page: "#f9f9f9",
  background: "#ffffff",
  foreground: "#000000",
  dark: "#141b34",
  semantic: {
    red: "#dc2626",
    green: "#2d6a4f",
  },
} as const;

/** Named spacing from Figma (XX-Small / X-Small / Small) plus layout scale. */
export const spacing = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  /** Gap from Quick Actions to Savings Plans header on Home */
  sheetGap: 28,
  /** Horizontal page padding used across screens (`px-[20px]`). */
  screen: 20,
} as const;

export const radius = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  /** Home white sheet top corners */
  sheet: 32,
} as const;

export const theme = {
  colors,
  spacing,
  radius,
} as const;

export default theme;
