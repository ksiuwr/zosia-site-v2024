import type { CustomTheme } from "daisyui";

// You can change these values to other themes provided by daisyUI
// Or create your own themes and use them here
export const LIGHT_THEME = "LEOSIA_LIGHT";
//export const DARK_THEME = "LEOSIA_DARK";
export const DARK_THEME = "LEOSIA_DARK";

export const LEOSIA_LIGHT: CustomTheme = {
  [LIGHT_THEME]: {
    primary: "#e86d7c",
    "primary-focus": "#e13d50",
    "primary-content": "#ffffff",

    secondary: "#a68df6",
    "secondary-focus": "#8462f3",
    "secondary-content": "#ffffff",

    accent: "#ddbe88",
    "accent-focus": "#d0a862",
    "accent-content": "#ffffff",

    neutral: "#9b5050",
    "neutral-focus": "#6a3e3e",
    "neutral-content": "#f0d6e8",

    "base-100": "#fffac2",
    "base-200": "#fee09f",
    "base-300": "#f0ce93",
    "base-content": "#342914",
  },
};

export const LEOSIA_DARK: CustomTheme = {
  [DARK_THEME]: {
    primary: "#f556a6",
    "primary-focus": "#d72d82",
    "primary-content": "#1b1c22",

    secondary: "#dfa2fb",
    "secondary-focus": "#bc64f7",
    "secondary-content": "#1b1c22",

    accent: "#ffd5b3",
    "accent-focus": "#ffc380",
    "accent-content": "#1b1c22",

    neutral: "#231a32",
    "neutral-focus": "#281c35",
    "neutral-content": "#d5ccff",

    "base-100": "#2a1c40",
    "base-200": "#26183a",
    "base-300": "#1b122b",
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
