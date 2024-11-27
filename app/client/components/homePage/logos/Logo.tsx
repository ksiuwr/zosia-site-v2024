import { ThemeContext } from "@client/utils/themes/ThemeContext";
import React, { useContext } from "react";

interface LogoProps {
  name: string;
  logoPath: string | null;
  logoPathDarkMode?: string | null;
  url: string;
  urlDarkMode?: string;
}

export const Logo = ({ name, logoPath, logoPathDarkMode, url }: LogoProps) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center justify-center no-underline hover:mix-blend-luminosity"
      rel="noreferrer"
    >
      {logoPath ? (
        <picture>
          <source
            srcSet={logoPathDarkMode || undefined}
            media={isDark ? "all" : "none"}
            className="h-20 lg:h-28"
          />
          <img src={logoPath} alt={`${name} logo`} className="h-20 lg:h-28" />
        </picture>
      ) : (
        <span className="btn-ghost rounded-lg p-5 text-center text-lg font-bold italic lg:p-10 lg:text-4xl">
          {name}
        </span>
      )}
    </a>
  );
};
