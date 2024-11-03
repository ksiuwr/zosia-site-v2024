import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface CenteredContainerProps {
  adminSidebarShown?: boolean;
}

export const CenteredContainer = ({
  adminSidebarShown,
  children,
}: PropsWithChildren<CenteredContainerProps>) => {
  return (
    <div
      className={clsx(
        "mx-auto mb-8 w-11/12 2xl:container",
        adminSidebarShown && "lg:w-11/12",
        !adminSidebarShown && "lg:w-4/6",
      )}
    >
      {children}
    </div>
  );
};
