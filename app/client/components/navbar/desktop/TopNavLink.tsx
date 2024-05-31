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
    <li>
      <a href={to} className="btn btn-ghost h-full">
        {children}
      </a>
    </li>
  );
};
