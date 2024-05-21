import plugin from "tailwindcss/plugin";
import { flattenColorPalette } from "./utils";
import { Config, fromTheme, mergeConfigs, validators } from "tailwind-merge";

// const theme = require('tailwindcss/defaultTheme');
// console.log(theme, flattenColorPalette(theme('colors'), true));
const buttonPlugin = plugin(
  function ({ matchUtilities, theme }) {
    // console.log("theme", theme, flattenColorPalette(theme('colors'), true));
    matchUtilities(
      {
        btn: (value) => ({
          "--tw-btn-theme-rgb": value,
          "--tw-btn-theme": `rgb(${value})`,
        }),
      },
      { values: flattenColorPalette(theme("colors"), true), type: ["color"] },
    );
  },
  {
    theme: {
      btnSize: {
        xs: "0 4px 10px",
        sm: "0 4px 20px",
        md: "2.5rem 1rem",
        lg: "3.25rem 1.125rem",
      },
    },
  },
);
export function withButton(
  config: Config<"shadow-size" | "shadow-color", "colors">,
) {
  return mergeConfigs(config, {
    extend: {
      classGroups: {
        "shadow-color": [
          {
            shadow: [validators.isAny, fromTheme("colors")],
          },
        ],
      },
    },
  });
}

export default buttonPlugin;
