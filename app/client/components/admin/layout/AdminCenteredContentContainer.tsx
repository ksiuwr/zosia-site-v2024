import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import React, { PropsWithChildren } from "react";

export const AdminCenteredContentContainer = ({
  children,
}: PropsWithChildren) => {
  return (
    <CenteredContentContainer adminSidebarShown>
      {children}
    </CenteredContentContainer>
  );
};
