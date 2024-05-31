import React from "react";
import { PropsWithChildren } from "react";

interface SideNavLinkProps {
  to: string;
}

export const SideNavLink = ({
  to,
  children,
}: PropsWithChildren<SideNavLinkProps>) => {
  return (
    <a
      href={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </a>
  );
};
