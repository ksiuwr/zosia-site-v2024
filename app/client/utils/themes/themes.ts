import type { CustomTheme, Theme } from "daisyui";

// You can change these values to other themes provided by daisyUI
// Or create your own themes and use them here
export const LIGHT_THEME: Theme = "retro";
export const DARK_THEME = "leosia-dark";

export const LEOSIA_LIGHT: CustomTheme = {
  [LIGHT_THEME]: {
    "color-scheme": "light",
    "secondary-content": "blue",
    accent: "yellow",
    neutral: "oklch(58% 0.173 17.585)",
    "neutral-content": "white",
    "base-100": "oklch(96% 0.059 95.617)",
    "base-200": "oklch(90% 0.076 70.697)",
    "base-300": "oklch(85% 0.153 55.934)",
    "base-content": "oklch(45% 0.188 13.697)",
  },
};

export const LEOSIA_DARK: CustomTheme = {
  [DARK_THEME]: {
    "color-scheme": "dark",
    primary: "oklch(65.69% 0.196 275.75)",
    secondary: "oklch(74.8% 0.26 342.55)",
    accent: "oklch(74.51% 0.167 183.61)",
    neutral: "#3b2747",
    "neutral-content": "#d9d5f7",
    "base-100": "#624185",
    "base-200": "oklch(0.7 0.121 310.96)",
    "base-300": "#3b2747",
    "base-content": "oklch(0.95 0.111 316.96)",
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
export const themeInitScript = `
function setTheme(isDark) {
  document
    .querySelector("html")
    .setAttribute("data-theme", isDark ? "${DARK_THEME}" : "${LIGHT_THEME}");
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
