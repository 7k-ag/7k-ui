import plugin from "tailwindcss/plugin";
import { flattenColorPalette } from "./utils";
import { Config, fromTheme, mergeConfigs, validators } from "tailwind-merge";

const coloredDropShadowPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        "colored-drop-shadow": (value) => ({
          "--tw-colored-drop-shadow-size": value,
          "@defaults filter": {},
          filter: `drop-shadow(var(--tw-colored-drop-shadow-size, "0 1px 2px") var(--tw-colored-drop-shadow-color, #000000))`,
        }),
      },
      { values: theme("dropShadowSize"), type: ["shadow"] },
    );
    matchUtilities(
      {
        "colored-drop-shadow": (value) => ({
          "--tw-colored-drop-shadow-color": value,
        }),
      },
      { values: flattenColorPalette(theme("colors")), type: ["color"] },
    );
  },
  {
    theme: {
      dropShadowSize: {
        none: "",
        xs: "0 4px 10px",
        sm: "0 4px 20px",
        md: "0 4px 30px",
        "2md": "0 8px 35px",
        lg: "0 6px 50px",
      },
    },
  },
);

export function withColoredDropShadow(
  config: Config<"colored-drop-shadow-size" | "colored-drop-shadow-color", "">,
) {
  return mergeConfigs(config, {
    extend: {
      classGroups: {
        "colored-drop-shadow-size": [
          {
            "colored-drop-shadow": [
              validators.isTshirtSize,
              fromTheme<"dropShadowSize">("dropShadowSize"),
            ],
          },
        ],
        "colored-drop-shadow-color": [
          {
            "colored-drop-shadow": [validators.isAny, fromTheme("colors")],
          },
        ],
      },
    },
  });
}

export default coloredDropShadowPlugin;
