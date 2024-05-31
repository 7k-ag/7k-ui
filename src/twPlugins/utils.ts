const utils = require("tailwindcss/lib/util/color");
/* Converts HEX color to RGB */
export const toRGB = (value: string) => utils.parseColor(value).color.join(" ");

type ColorPalette = { [color: string]: string | ColorPalette };
export const flattenColorPalette = (
  colors: ColorPalette,
  useRGB: boolean = false,
): { [key: string]: string } =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values === "object"
        ? Object.entries(flattenColorPalette(values as ColorPalette)).map(
            ([number, hex]) => ({
              [color + (number === "DEFAULT" ? "" : `-${number}`)]: useRGB
                ? toRGB(hex)
                : hex,
            }),
          )
        : [{ [`${color}`]: values }],
    ),
  );

export const withOpacity = (varName: string) => {
  return `rgba(var(${varName}), <alpha-value>)`;
};

export const generateColorItems = (name: string, ids: string[]) => {
  const map: Record<string, string> = {};
  ids.map((id) => {
    map[id] = withOpacity(`--color-${name}-${id}`);
  });
  return map;
};
