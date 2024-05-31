import React from "react";
import { PropsWithChildren } from "react";

interface TopNavDropdownLinkProps {
  to: string;
}

export const TopNavDropdownLink = ({
  to,
  children,
}: PropsWithChildren<TopNavDropdownLinkProps>) => {
  return (
    <a
      href={to}
      className="block bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      {children}
    </a>
  );
};
