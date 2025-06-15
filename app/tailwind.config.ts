import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import type { Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

import { LEOSIA_DARK, LEOSIA_LIGHT } from "./client/utils/themes/themes";

export default {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [LEOSIA_LIGHT, LEOSIA_DARK],
  } satisfies DaisyUIConfig,
} satisfies Config;
