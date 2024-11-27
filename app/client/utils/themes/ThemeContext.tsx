import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

declare global {
  interface Window {
    // __isDark and __setPreferredDarkTheme are defined in a script injected by Helmet.
    // Source code is app/client/utils/themes/themes.ts
    __isDark: boolean;
    __setPreferredDarkTheme: (isDark: boolean) => void;
  }
}

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(window.__isDark);
  }, []);

  const toggleTheme = () => {
    window.__setPreferredDarkTheme(!window.__isDark);
    setIsDark(window.__isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
