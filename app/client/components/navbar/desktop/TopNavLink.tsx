import React from "react";
import { PropsWithChildren } from "react";

interface TopNavLinkProps {
  to: string;
}

export const TopNavLink = ({
  to,
  children,
}: PropsWithChildren<TopNavLinkProps>) => {
  return (
    <a href={to} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
      {children}
    </a>
  );
};
