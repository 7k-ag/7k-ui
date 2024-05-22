import resolveConfig from "tailwindcss/resolveConfig";
const tailwindConfig = require("../../tailwind.config.js");

const { theme: THEME } = resolveConfig(tailwindConfig);

export default THEME as any;
