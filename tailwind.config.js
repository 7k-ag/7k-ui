const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        samsungSharpSans: ["SamsungSharpSans", ...defaultTheme.fontFamily.sans],
        outfit: ["Outfit", ...defaultTheme.fontFamily.sans],
        cyberwayRiders: ["CyberwayRiders", ...defaultTheme.fontFamily.sans],
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
        },
        gray: {
          100: "#868098",
          60: "#B7B7D7",
          40: "#CCCCD5",
          20: "#F2F1F5",
          10: "#FCFBFE",
        },
        black: {
          DEFAULT: "#000",
          100: "#000",
          80: "#221533",
          70: "#2E1D45",
          60: "#615078",
        },
        red: {
          100: "#df0252",
          80: "#FF005C",
          20: "#FFF2F7",
        },
        green: {
          100: "#04B793",
          80: "#05c9a1",
          20: "#E6FAF6",
          10: "#F2FCFA",
        },
        yellow: {
          100: "#FFC01D",
        },
        iris: {
          100: "#5D5FEF",
          80: "#7879F1",
          60: "#A5A6F6",
          40: "#E6E7FF",
          25: "#EAEAFD",
          20: "#F1F1FF",
        },
        pink: {
          100: "#EF5DA8",
          80: "#F178B6",
          60: "#FFF0F7",
        },
        electricblue: "#000FFE",
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
  ],
};
