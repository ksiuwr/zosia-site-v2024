import React, { PropsWithChildren } from "react";

interface SideNavLinkProps {
  to: string;
}

export const SideNavLink = ({
  to,
  children,
}: PropsWithChildren<SideNavLinkProps>) => {
  return (
    <a href={to} className="btn btn-ghost flex justify-start gap-5 pr-32">
      {children}
    </a>
  );
};
