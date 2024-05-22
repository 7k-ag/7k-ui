import { withOpacity, generateColorItems } from "./src/twPlugins/utils";
const defaultTheme = require("tailwindcss/defaultTheme");

const colorCssVars = {
  red: generateColorItems("red", [100, 80]),
  green: generateColorItems("green", [100, 80, 20, 10]),
  yellow: generateColorItems("yellow", [100, 80, 10]),
  iris: generateColorItems("iris", [100, 80, 60]),
  pink: generateColorItems("pink", [100, 80, 60]),
  gray: generateColorItems("gray", [100, 60, 40, 20, 10]),
  theme: generateColorItems("skin", [
    "000",
    "001",
    "002",
    "003",
    "004",
    100,
    101,
    102,
    200,
    201,
    202,
    203,
    204,
    300,
    301,
    302,
  ]),
};
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "3xl": "1920px",
        ...defaultTheme.screens,
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        7.5: "1.875rem",
        11.5: "2.875rem",
        13: "3.25rem",
      },
      zIndex: {
        modal: 40,
        toast: 50,
      },
      fontSize: {
        "3xs": "0.5rem",
        "2xs": "0.625rem",
        "m-2xs": "0.5625rem",
        "m-xs": "0.6875rem",
        "m-sm": "0.8125rem",
        "m-base": "0.9375rem",
        "m-lg": "1.0625rem",
        "m-2xl": "1.3125rem",
      },
      fontFamily: {
        samsung: ["SamsungSharpSans", ...defaultTheme.fontFamily.sans],
        outfit: ["Outfit"],
      },
      colors: {
        blueviolet: "#9747ff",
        "blue-bg": {
          80: "#F8F8FF",
        },
        white: {
          DEFAULT: "#fff",
          100: "#fff",
          80: "#FDFDFF",
          inverted: {
            DEFAULT: "#28273D",
          },
        },
        gray: {
          20: "#F2F1F5",
          inverted: {
            20: "#35344A",
          },
        },
        black: {
          DEFAULT: "#000",
          100: "#000",
          80: "#221533",
          70: "#2E1D45",
          60: "#615078",
          inverted: {
            100: "#FCFBFE",
            80: "#FDFDFF",
            70: "#464567",
          },
        },
        red: {
          20: "#FF005C",
          80: "#FF005C",
          inverted: {
            80: "#FF2882",
          },
        },
        green: {
          80: "#05C9A1",
          inverted: {
            80: "#9BFF99",
          },
        },
        yellow: {
          100: "#EBAA2A",
        },
        iris: {
          40: "#E6E7FF",
          25: "#EAEAFD",
          20: "#F1F1FF",
          inverted: {
            20: "#191824",
          },
        },
        pink: {},
        electricblue: "#000FFE",
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          alt: withOpacity("--color-text-alt"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
        ...colorCssVars,
      },
      backgroundColor: {
        skin: {
          base: withOpacity("--color-bg-base"),
          alt: withOpacity("--color-bg-alt"),
          card: withOpacity("--color-bg-card"),
          muted: withOpacity("--color-bg-muted"),
          "base-inverted": withOpacity("--color-bg-base-inverted"),
          "card-inverted": withOpacity("--color-bg-card-inverted"),
          success: withOpacity("--color-bg-success"),
          hotkey: withOpacity("--color-bg-hotkey"),
          countdown: withOpacity("--color-bg-countdown"),
          100: withOpacity("--color-skin-100"),
          204: withOpacity("--color-skin-204"),
        },
        ...colorCssVars,
      },
      boxShadowColor: {
        skin: {
          base: withOpacity("--color-shadow-base"),
          alt: withOpacity("--color-shadow-alt"),
        },
        ...colorCssVars,
      },
      borderColor: {
        skin: {
          base: withOpacity("--color-border-base"),
          alt: withOpacity("--color-border-alt"),
          card: withOpacity("--color-bg-card"),
          100: withOpacity("--color-skin-100"),
          "001": withOpacity("--color-skin-001"),
        },
        ...colorCssVars,
      },
      caretColor: {
        ...colorCssVars,
      },
      fill: {
        ...colorCssVars,
      },
      boxShadow: {
        soft: "0px 8px 25px",
        "soft-2": "0px 4px 25px 0px",
        "soft-3": "0px 4px 50px 0px",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      keyframes: {
        rdxAccordionExpand: {
          "0%": { height: 0, opacity: 0 },
          "100%": {
            height: "var(--radix-accordion-content-height)",
            opacity: 100,
          },
        },
        rdxAccordionCollapsed: {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: 100,
          },
          "100%": { height: 0, opacity: 0 },
        },
      },
      animation: {
        rdxAccordionExpand: "rdxAccordionExpand 300ms ease-out",
        rdxAccordionCollapsed: "rdxAccordionCollapsed 300ms ease-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("./src/twPlugins/button"),
    require("./src/twPlugins/colored-drop-shadow"),
  ],
};
