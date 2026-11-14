import type { CustomTheme } from "daisyui";

// Light and dark theme of every site, picked in client/utils/site.ts.
// You can use themes provided by daisyUI or create your own themes below.
// All of them have to be listed in tailwind.config.ts
export const ZOSIA_LIGHT_THEME = "light";
export const ZOSIA_DARK_THEME = "dark";

export const LEOSIA_LIGHT_THEME = "LEOSIA_LIGHT";
export const LEOSIA_DARK_THEME = "LEOSIA_DARK";

export const CUSTOM_THEMES: CustomTheme = {
  [LEOSIA_LIGHT_THEME]: {
    primary: "#f071a6",
    "primary-focus": "#e13d50",
    "primary-content": "#ffffff",

    secondary: "#a68df6",
    "secondary-focus": "#8462f3",
    "secondary-content": "#ffffff",

    accent: "#d6d2ff",
    "accent-focus": "#d0a862",
    "accent-content": "#ffffff",

    neutral: "#db3588",
    "neutral-focus": "#6a3e3e",
    "neutral-content": "#f0d6e8",

    "base-100": "#ffcfe6",
    "base-200": "#fcafd4",
    "base-300": "#ff9acc",
    "base-content": "#342914",
  },
  [LEOSIA_DARK_THEME]: {
    primary: "#e24f99",
    "primary-focus": "#d72d82",
    "primary-content": "#1b1c22",

    secondary: "#dfa2fb",
    "secondary-focus": "#bc64f7",
    "secondary-content": "#1b1c22",

    accent: "#ffd5b3",
    "accent-focus": "#ffc380",
    "accent-content": "#1b1c22",

    neutral: "#3f0d32",
    "neutral-focus": "#351c2e",
    "neutral-content": "#d5ccff",

    "base-100": "#602450",
    "base-200": "#501740",
    "base-300": "#3f0d32",
    "base-content": "#d5ccff",
  },
};

/**
 * This script handles saving/reading preferred theme from localStorage,
 * detecting system theme and setting the actual theme as a data attribute on the html element.
 * It also exposes a function to set the theme which can be called from React components.
 *
 * It needs to be injected into the head of the document,
 * so that it runs before the intial server-side rendered content is displayed,
 * in order to prevent the flash of incorrect theme.
 *
 * It's written as a string, because Helmet doesn't allow any other way to inject scripts.
 *
 * This approach is inspired by this blogpost:
 * https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
 */
export const getThemeInitScript = (lightTheme: string, darkTheme: string) => `
function setTheme(isDark) {
  document
    .querySelector("html")
    .setAttribute("data-theme", isDark ? "${darkTheme}" : "${lightTheme}");
  window.__isDark = isDark;
}

// this will be triggered by our React component
window.__setPreferredDarkTheme = function (isDark) {
  setTheme(isDark);
  try {
    localStorage.setItem("dark-theme", window.__isDark);
  } catch (err) {
    console.error(err);
  }
};

// detect system theme and monitor for changes
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
darkQuery.addEventListener("change", function (event) {
  window.__setPreferredDarkTheme(event.matches);
});

// try to get saved theme
let isDarkThemePreferred;
try {
  isDarkThemePreferred = localStorage.getItem("dark-theme");
} catch (err) {
  console.error(err);
}

// set theme
if (isDarkThemePreferred === null) {
  setTheme(darkQuery.matches);
} else {
  setTheme(isDarkThemePreferred === "true");
};
`;
