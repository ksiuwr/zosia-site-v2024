import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import type { Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

import {
  CUSTOM_THEMES,
  ZOSIA_DARK_THEME,
  ZOSIA_LIGHT_THEME,
} from "./client/utils/themes/themes";

export default {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [ZOSIA_LIGHT_THEME, ZOSIA_DARK_THEME, CUSTOM_THEMES],
  } satisfies DaisyUIConfig,
} satisfies Config;
