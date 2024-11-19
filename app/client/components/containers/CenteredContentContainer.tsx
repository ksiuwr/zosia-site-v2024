import React, { PropsWithChildren } from "react";
import { CenteredContainer } from "./CenteredContainer";

interface CenteredContentContainerProps {
  adminSidebarShown?: boolean;
}

export const CenteredContentContainer = ({
  adminSidebarShown,
  children,
}: PropsWithChildren<CenteredContentContainerProps>) => {
  return (
    <CenteredContainer adminSidebarShown={adminSidebarShown}>
      <div className="mx-auto w-full lg:w-10/12 xl:w-9/12 2xl:w-8/12">
        {children}
      </div>
    </CenteredContainer>
  );
};
