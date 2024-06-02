import THEME from "@/constants/theme";
import { ThemeVars } from "@mysten/dapp-kit";

const colorIris100 = THEME.colors?.iris?.["100"] || "#5D5FEF";
const colorDarkBlue100 = THEME.colors?.darkblue?.["100"] || "#343B51";

// Light theme copied from dapp-kit
export const uiKitDarkTheme: ThemeVars = {
  blurs: {
    modalOverlay: "blur(0)",
  },
  backgroundColors: {
    primaryButton: colorIris100,
    primaryButtonHover: colorIris100,
    outlineButtonHover: colorIris100,
    modalOverlay: "rgba(24 36 53 / 20%)",
    modalPrimary: colorDarkBlue100,
    modalSecondary: "#252734",
    iconButton: "transparent",
    iconButtonHover: "#252734",
    dropdownMenu: colorDarkBlue100,
    dropdownMenuSeparator: "#F3F6F8",
    walletItemSelected: colorDarkBlue100,
    walletItemHover: colorDarkBlue100,
  },
  borderColors: {
    outlineButton: "#E4E4E7",
  },
  colors: {
    primaryButton: "#FFFFFF",
    outlineButton: "#FFFFFF",
    iconButton: "#000000",
    body: "#FFFFFF",
    bodyMuted: "#A8A8C7",
    bodyDanger: "#FF794B",
  },
  radii: {
    small: "6px",
    medium: "8px",
    large: "12px",
    xlarge: "16px",
  },
  shadows: {
    primaryButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    walletItemSelected: "0px 2px 6px rgba(0, 0, 0, 0.05)",
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "600",
  },
  fontSizes: {
    small: "12px",
    medium: "14px",
    large: "18px",
    xlarge: "20px",
  },
  typography: {
    fontFamily: `Outfit,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif`,
    fontStyle: "medium",
    lineHeight: "1.3",
    letterSpacing: "1",
  },
};
