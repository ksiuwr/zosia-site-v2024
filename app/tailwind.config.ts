import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import type { Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

import { DARK_THEME, LIGHT_THEME } from "./client/utils/themes";

export default {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [LIGHT_THEME, DARK_THEME],
  } satisfies DaisyUIConfig,
} satisfies Config;
