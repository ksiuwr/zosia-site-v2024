import React, { forwardRef } from "react";
import { PropsWithChildren } from "react";

interface TopNavDropdownLinkProps {
  to: string;
}

type Props = TopNavDropdownLinkProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;

export const TopNavDropdownLink = forwardRef<HTMLAnchorElement, Props>(
  ({ to, children, ...props }: PropsWithChildren<Props>, ref) => {
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
