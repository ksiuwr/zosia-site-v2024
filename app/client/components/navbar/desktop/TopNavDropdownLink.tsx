import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { PropsWithChildren } from "react";

interface TopNavDropdownLinkProps {
  to: string;
}

type Props = TopNavDropdownLinkProps & ComponentPropsWithoutRef<"a">;

export const TopNavDropdownLink = forwardRef<HTMLAnchorElement, Props>(
  function TopNavDropdownLink(
    { to, children, ...props }: PropsWithChildren<Props>,
    ref,
  ) {
    return (
      <li>
        <a
          href={to}
          ref={ref}
          {...props}
          className="btn-ghost data-[focus]:btn-active"
        >
          {children}
        </a>
      </li>
    );
  },
);
