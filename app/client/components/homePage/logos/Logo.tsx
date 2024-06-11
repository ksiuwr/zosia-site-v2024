import React from "react";

interface LogoProps {
  name: string;
  logoPath: string | null;
  url: string;
}

export const Logo = ({ name, logoPath, url }: LogoProps) => {
  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center justify-center no-underline hover:mix-blend-luminosity"
    >
      {logoPath ? (
        <img src={logoPath} alt={`${name} logo`} className="h-24 lg:h-40" />
      ) : (
        <span className="btn-ghost rounded-lg p-5 text-center text-lg font-bold italic lg:p-10 lg:text-4xl">
          {name}
        </span>
      )}
    </a>
  );
};
