import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import type { Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

import { LEOSIA_DARK, LIGHT_THEME } from "./client/utils/themes/themes";

export default {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [LIGHT_THEME, LEOSIA_DARK],
  } satisfies DaisyUIConfig,
} satisfies Config;
