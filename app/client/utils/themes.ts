import type { Theme } from "daisyui";

// You can change these values to other themes provided by daisyUI
// Or create your own themes and use them here
export const LIGHT_THEME: Theme = "light";
export const DARK_THEME: Theme = "dark";

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
