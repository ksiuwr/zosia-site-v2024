import { ThemeContext } from "@client/utils/themes/ThemeContext";
import React, { useContext } from "react";

export const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-ghost"
      aria-label="Light or dark mode toggle"
      onClick={toggleTheme}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        className="size-8"
      >
        <line x1="16" y1="3" x2="16" y2="29" />
        <path d="M16,23c-3.87,0-7-3.13-7-7s3.13-7,7-7" />
        <line x1="6.81" y1="6.81" x2="8.93" y2="8.93" />
        <line x1="3" y1="16" x2="6" y2="16" />
        <line x1="6.81" y1="25.19" x2="8.93" y2="23.07" />
        <path
          d="M16,12.55C17.2,10.43,19.48,9,22.09,9c0.16,0,0.31,0.01,0.47,0.02c-1.67,0.88-2.8,2.63-2.8,4.64
	c0,2.9,2.35,5.25,5.25,5.25c1.6,0,3.03-0.72,3.99-1.85C28.48,20.43,25.59,23,22.09,23c-2.61,0-4.89-1.43-6.09-3.55"
        />
      </svg>
    </button>
  );
};
