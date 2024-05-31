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
    <a href={to} className="btn btn-ghost btn-block justify-start gap-5">
      {children}
    </a>
  );
};
